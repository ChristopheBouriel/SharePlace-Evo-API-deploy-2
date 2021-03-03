const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connexion = require('../dataBaseAccess');
const { v4: uuidv4} = require('uuid');
const xssFilters = require('xss-filters');
require('dotenv').config();

exports.signup = (req, res, next) => {
    const userId = uuidv4();
    let user;
    
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        user = {
            userId: userId,
            userName: xssFilters.inHTMLData(req.body.userName),
            userPassword: hash,
            firstname : xssFilters.inHTMLData(req.body.firstname),
            lastname: xssFilters.inHTMLData(req.body.lastname),
            service: xssFilters.inHTMLData(req.body.serviceName),
            email: req.body.email,
            aboutMe: xssFilters.inHTMLData(req.body.aboutMe)
        }; 
        
        connexion.query(
            `INSERT INTO users (userId, userName, userPassword, firstname, lastname, serviceName, email, aboutMe) VALUES(
                ?,?,?,?,?,?,?,?)`, [ user.userId, user.userName, user.userPassword, user.firstname, user.lastname, user.service, user.email, user.aboutMe],
                (error, result) => {
                  if(error) {
                    res.status(500).send(error.sqlMessage)
                  } else {
                    res.status(201).send({message:"Création réussie"})
                  }
                }
        )
         }).catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    connexion.query(
        `SELECT * FROM users WHERE userName = ?`, [req.body.userName],
        (error, user) => {
        if (!user[0]) {
          return res.status(400).send({ error: 'Utilisateur non trouvé !' });
        };
        bcrypt.compare(req.body.userPassword, user[0]['userPassword'])
          .then(valid => {
            if (!valid) {
              return res.status(400).send({ error: 'Mot de passe incorrect !' });
            }
            let tokAdmin;
            if (user[0].isMod === 1) {
                tokAdmin = "moderator";                
              } else { tokAdmin = "none" }
            res.status(200).json({
              lastLogout: user[0].date_logout,
              admin: user[0].isMod,
              userName: user[0].userName,
              token: jwt.sign(
                { userId: user[0].userId, tokAdmin: tokAdmin}, 
                process.env.DB_TOK,
                { expiresIn: '4h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
        }  
    )   
};

exports.getAllUsers = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.DB_TOK);
  const checkUserId = decodedToken.userId;
  if (checkUserId) {
    connexion.query(`SELECT userName, firstname, lastname, serviceName, imageUrl FROM users ORDER BY userName`, (error, result) => {
    if(error) {res.status(500).send(error.sqlMessage)}
    else {res.status(200).send(result);                                  
    }
    })
  } else {
    res.status(200).send({message:"Problème d'identification"});
  }  
};

exports.modifyPassword = (req, res, next) => {
  let password 
  bcrypt.hash(req.body.userPassword, 10)
  .then(hash => {
    password = hash
    const userName = req.body.userName;
  connexion.query(`UPDATE users SET userPassword="${password}" 
    WHERE userName="${userName}"`, (error, result) => {
        if(error) {res.status(500).send(error.sqlMessage)}
        else {res.status(200).send({message:"Update done"})                                    
        }
    })  
    }
    )  
};

exports.modifyUserName = (req, res, next) => {
  const newUserName = xssFilters.inHTMLData(req.body.newUserName);  
  connexion.query(`SELECT userId FROM users WHERE userName = ?`, [req.body.userName], (error, result) => {
    if(error) {res.status(500).send(error.sqlMessage)}
    else {
      const userId = result[0];
      connexion.query(`UPDATE users SET userName="${newUserName}" 
        WHERE userId="${userId.userId}"`, (error, result) => {
          if(error) {res.status(500).send(error.sqlMessage)}
          else {
            connexion.query(`UPDATE publications SET userName="${newUserName}" 
              WHERE userId="${userId.userId}"`, (error, result) => {
            if(error) {res.status(500).send(error.sqlMessage)}
            else {
              connexion.query(`UPDATE comments SET userName="${newUserName}" 
              WHERE userId="${userId.userId}"`, (error, result) => {
                if (error) {res.status(500).send(error);}
                else {res.status(200).send({message:"Update done"});}
              })
            }
            })
          }
        })
    }
  })  
};

exports.deleteUserAccount = (req, res, next) => {
  connexion.query(`SELECT userId FROM users WHERE userName = ?`, [req.body.userName], (error, result) => {
    if(error) {res.status(500).send(error.sqlMessage)}
    else {      
      const userId = result[0];
      connexion.query(`DELETE FROM users WHERE userId=?`,[userId.userId], (error, result) => {
        if(error) {res.status(500).send(error.sqlMessage)}
        else {
          connexion.query(`DELETE FROM publications WHERE userId=?`,[userId.userId], (error, result) => {
          if(error) {res.status(500).send(error.sqlMessage)}
          else {
            connexion.query(`UPDATE comments 
                SET userName = 'utilisateur désinscrit'
                WHERE userId = ?`, [userId.userId], (error, result) => {
                  if (result) {res.status(200).send({message:"User deleted"});}
                  if (error) {res.status(500).send(error);}
            })
          }
          })
        }
      })
    }
  })
};

exports.testU = (req, res, next) => {
  let checkIfExists =[];
  let userName;
  if (!req.body.newUserName) {userName = xssFilters.inHTMLData(req.body.userName);}
  else {userName = xssFilters.inHTMLData(req.body.newUserName)};  
  connexion.query(`SELECT userName FROM users`, (error, result) => {
    for (i of result) {
      checkIfExists.push(i.userName)
    }
    const ooo = checkIfExists.includes(userName);    
    if (ooo === false) {

      if (!req.body.password) {
        this.modifyUserName(req, res);
      } else {
        this.signup(req, res);
      }
    } else {
      res.status(400).send({message:"Le nom d'utilisateur est déjà pris"})
      }
  })
};

exports.logoutDate = (req, res, next) => {
  const dateLogout = req.body.dateLogout;
  const userName = req.body.userName;
  connexion.query(`UPDATE users SET date_logout="${dateLogout}" 
    WHERE userName="${userName}"`, (error, result) => {
        if(error) {res.status(500).send(error.sqlMessage)}
        else {res.status(200).send({message:"Last connexion written"})                                    
        }
    })  
}