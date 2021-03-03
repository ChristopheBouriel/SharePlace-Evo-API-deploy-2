const connexion = require('../dataBaseAccess');
const xssFilters = require('xss-filters');require('dotenv').config();
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.getAllPublications = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.DB_TOK);
  const checkUserId = decodedToken.userId;
  if (checkUserId) {    
    connexion.query(`SELECT publications.id, publications.date_publication, publications.title, publications.content, publications.likes, publications.numberComments, publications.userName, publications.modified, publications.date_modif, publications.moderated, users.imageUrl FROM publications INNER JOIN users ON publications.userName = users.userName ORDER BY date_publication DESC`, (error, result) => {
      if(error) {res.status(500).send(error.sqlMessage)}
      else {
        res.status(200).send(result);                                        
      }
    })
  } else {
        res.status(200).send({message:"Problème d'identification"});
      }  
};

exports.getOnePublication = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, process.env.DB_TOK);
  const checkUserId = decodedToken.userId;
  if (checkUserId) {
    connexion.query(`SELECT publications.id, publications.date_publication, publications.title, publications.content, publications.likes, publications.numberComments, publications.userName, publications.modified, publications.date_modif, publications.moderated, publications.viewed, users.imageUrl FROM publications INNER JOIN users ON publications.userName = users.userName WHERE publications.id = ?`, [req.params.id], (error, result) => {
      if(error) {res.status(500).send(error.sqlMessage)}
      else {
        res.status(200).send(result);                                  
      }
    })
  } else {
        res.status(200).send({message:"Problème d'identification"});
      }      
  };

exports.markAsRead = (req, res, next) => {
  const viewed = req.body.viewed;
  const id  = req.body.postId;
  connexion.query(`UPDATE publications SET viewed="${viewed}" WHERE id="${id}"`, (error, result) => {
    if(error) {res.status(500).send(error.sqlMessage)}
    else {res.status(200).send({message:"Update done"})                                 
    }
}) 
}

exports.addPublication = (req, res, next) => {
    connexion.query(`SELECT userId FROM users WHERE userName = ?`, [req.body.userName], (error, result) => {
        if(error) {res.status(500).send(error.sqlMessage)}
          else {
          const userId = result[0].userId;
          const title = xssFilters.inHTMLData(req.body.title.replace(/\"/gi,'&µ'));
          const userName = xssFilters.inHTMLData(req.body.userName);
          const content = xssFilters.inHTMLData(req.body.content.replace(/\"/gi,'&µ'));
          const date_publication = xssFilters.inHTMLData(req.body.date_publication);

          connexion.query(`INSERT INTO publications (userId, title, userName, content, date_publication) VALUES (?,?,?,?,?)`, 
            [userId, title, userName, content, date_publication], (error, result)=>{
                if(error) {res.status(500).send(error.sqlMessage)}
                else {res.status(201).send({message:"Publication added"})}          
          })
          }
    })
};

exports.modifyPost = (req, res, next) => {
  const checkUserName = req.body.UserName;
  connexion.query(`SELECT userName FROM publications WHERE id = ?`, [req.body.postId], (error, result) => {
    if(error) {res.status(500).send(error.sqlMessage)}
    else if (result.length !== 0 && result[0].userName === req.body.userName) {
      const content = xssFilters.inHTMLData(req.body.content.replace(/\"/gi,'&µ'));
      const modified = xssFilters.inHTMLData(req.body.modified);
      const date_modif = xssFilters.inHTMLData(req.body.date_modif);
      const id = xssFilters.inHTMLData(req.body.postId);
      const title = xssFilters.inHTMLData(req.body.title.replace(/\"/gi,'&µ'));
      connexion.query(`UPDATE publications SET title="${title}", content="${content}", modified="${modified}", date_modif="${date_modif}" WHERE id="${id}"`, (error, result) => {
          if(error) {res.status(500).send(error.sqlMessage)}
          else {res.status(200).send({message:"Update done"})                                 
          }
      })  
    } else {res.status(401).send({message:"Attention"})}
  }  
  )  
};

exports.deletePost = (req, res, next) => {
  connexion.query(`SELECT userName FROM publications WHERE id = ?`, [req.body.postId], (error, result) => {
    if(error) {res.status(500).send(error.sqlMessage)}
    else if (result.length !== 0 && result[0].userName === req.body.userName) {
        connexion.query(`DELETE FROM publications WHERE id=?`,[req.body.postId], (error, result) => {
        if(error) {res.status(500).send(error.sqlMessage)}
        else {
            connexion.query(`DELETE FROM comments WHERE postId = ?`, [req.body.postId], (error, result) => {
                if (result) {res.status(200).send({message:"Publication deleted"});}
                if (error) {res.status(500).send(error);}
              })                                           
        }
        })  
    } else {res.status(401).send({message:"Attention"})}
  })  
};


