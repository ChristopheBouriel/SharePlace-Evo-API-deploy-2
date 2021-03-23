const connexion = require('../dataBaseAccess');
const xssFilters = require('xss-filters');
const jwt = require('jsonwebtoken');
const fs = require('fs');


const cloudinary = require("../middleware/cloudinary");
const multer = require("../middleware/multer-config");
const auth = require('../middleware/auth');


exports.seeProfile = (req, res, next) => {
  connexion.query(`SELECT userName, firstname, lastname, serviceName, imageUrl, email, aboutMe FROM users WHERE userName = ?`, [req.params.userName], (error, result)=>{
    if(error) {res.status(500).send(error.sqlMessage)}
    else {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.DB_TOK);
      const checkUserId = decodedToken.userId;
      if (checkUserId) {
        const userInfos = result;
        connexion.query(`SELECT id, date_publication, title, content, likeUsernames, numberComments, userName, modified, date_modif, moderated FROM publications WHERE userName = ?`, [req.params.userName], (error, result)=>{
            if(error) {res.status(500).send(error.sqlMessage)}
            else{
              const response = {userInfos, result}; 
              res.send(response)};
              })
      } else {
        res.status(200).send({message:"Problème d'identification"});
      };
    } 
  })
}

exports.modifyProfile = (req, res, next) => {
    const firstname = xssFilters.inHTMLData(req.body.firstname);
    const lastname = xssFilters.inHTMLData(req.body.lastname);
    const userName = xssFilters.inHTMLData(req.body.userName);
    const service = xssFilters.inHTMLData(req.body.serviceName);
    const email = xssFilters.inHTMLData(req.body.email);
    const aboutMe = xssFilters.inHTMLData(req.body.aboutMe);
    connexion.query(`UPDATE users SET firstname="${firstname}", lastname="${lastname}", 
    userName="${userName}", serviceName="${service}", email="${email}", aboutMe="${aboutMe}" 
    WHERE userName="${userName}"`, (error, result) => {
        if(error) {res.status(500).send(error.sqlMessage)}
        else {res.status(200).send({message:"Update done"})                                    
        }
    })  
}

exports.getNotifications = (req, res, next) => {
  const userName =  req.params.userName;
  connexion.query(`SELECT id, title, moderated, viewed, userName, moderated FROM publications WHERE (userName = "${userName}" AND viewed = 0) OR (userName="${userName}" AND moderated = 1)  ORDER BY date_publication DESC`, (error, result) => {
    if(error) {res.status(500).send(error.sqlMessage)}
    else {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.DB_TOK);
      const checkUserId = decodedToken.userId;
      if (checkUserId) {
      const postInfos = result;
      connexion.query(`SELECT comments.id, comments.postId, publications.title, comments.moderated, comments.userName FROM comments INNER JOIN publications ON comments.postId = publications.id WHERE comments.userName = ? AND comments.moderated = 1  ORDER BY date_comment DESC`, [req.params.userName], (error, result) => {
        if(error) {res.status(500).send(error.sqlMessage)}
            else{
              const commentInfos = result;
              const response = {postInfos, commentInfos};
              res.status(200).send(response)};                                            
      })} else {
        res.status(200).send({message:"Problème d'identification"});
      };
      }
  })  
}

exports.loadPicture = (req, res, next) => {  
  multer.single("image") (req, res, () => {
    auth (req, res, async () => {
    console.log(req.body.datas)
    picObject = { ...JSON.parse(req.body.datas) };
    const userName =  picObject.userName;
    
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {folder:"SharePlace-Evo", width: 400, height: 400, crop: "fill"});
      /*background: "black", crop: "pad"*/
      
      let imageUrl = result.secure_url;
      connexion.query(`SELECT imageUrl FROM users WHERE userName="${userName}"`, (error, result) => {
        if(error) {res.status(500).send(error.sqlMessage)}
        else {
          if (result[0].imageUrl !== null) {
          idCloud = 'SharePlace-Evo/' + result[0].imageUrl.split('/SharePlace-Evo/')[1].split('.')[0];
          }
          connexion.query(`UPDATE users SET imageUrl="${imageUrl}" WHERE userName="${userName}"`, (error, result) => {
                if(error) {res.status(500).send(error.sqlMessage);}
                else {
                  if (idCloud !== 'SharePlace-Evo/default') {
                    cloudinary.uploader.destroy(idCloud);
                  }
                  res.status(200).send({message:"Update done"});
                }
              });
        }
      });
    } 
    catch (error) {console.log(error);}
  })
  })
}

exports.deletePicture = (req, res, next) => {
  const userName =  req.body.userName;
  const imageUrl = "https://res.cloudinary.com/cbpicstore/image/upload/v1615060643/SharePlace-Evo/default.png";
  
  connexion.query(`SELECT imageUrl FROM users WHERE userName="${userName}"`, (error, result) => {
        if(error) {res.status(500).send(error.sqlMessage)}
        else {
          if (result[0].imageUrl !== null) {
            idCloud = 'SharePlace-Evo/' + result[0].imageUrl.split('/SharePlace-Evo/')[1].split('.')[0];

          }
          connexion.query(`UPDATE users SET imageUrl="${imageUrl}" WHERE userName="${userName}"`, (error, result) => {
                if(error) {res.status(500).send(error.sqlMessage);}
                else {
                  if (idCloud !== 'default.png') {
                    cloudinary.uploader.destroy(idCloud);
                  }
                  res.status(200).send({message:"Update done"});
                }
              });
        }
      });  
}