const connexion = require('../dataBaseAccess');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.moderatePublication = (req, res, next) => {
    const id = req.body.postId;
    const moderate = req.body.moderated;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOK);
    const tokAdmin = decodedToken.tokAdmin;
    if (tokAdmin === 'moderator') {
        connexion.query(`UPDATE publications SET moderated="${moderate}" WHERE id="${id}"`, (error, result) => {
        if(error) {res.status(500).send(error.sqlMessage)}
        else {res.status(200).send({message:"Publication modérée"})                                 
        }
        });
    } else {
        res.status(401).send({message:"Vous n'êtes pas modérateur !"})
    }    
};

exports.moderateComment = (req, res, next) => {
    const id = req.body.commentId;
    const moderate = req.body.moderated;
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOK);
    const tokAdmin = decodedToken.tokAdmin;
    if (tokAdmin === 'moderator') {
        connexion.query(`UPDATE comments SET moderated="${moderate}" WHERE id="${id}"`, (error, result) => {
        if(error) {res.status(500).send(error.sqlMessage)}
        else {res.status(200).send({message:"Commentaire modéré"})                                 
        }
        });
    } else {
        res.status(401).send({message:"Vous n'êtes pas modérateur !"})
    }    
};

exports.getNewParticipations = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.DB_TOK);
    const tokAdmin = decodedToken.tokAdmin;
    if (tokAdmin === 'moderator') {
        const lastLogout = req.body.lastLogout;
        connexion.query(`SELECT id, title, moderated, viewed, userName FROM publications WHERE date_publication > "${lastLogout}"  ORDER BY id DESC`, (error, result) => {
        if(error) {res.status(500).send(error.sqlMessage)}
        else {
            const postInfos = result;
            connexion.query(`SELECT comments.id, comments.postId, publications.title, comments.moderated, comments.userName 
            FROM comments INNER JOIN publications ON comments.postId = publications.id WHERE date_comment > "${lastLogout}" 
            ORDER BY comments.postId DESC`, (error, result) => {
            if(error) {res.status(500).send(error.sqlMessage)}
                else{
                    const commentInfos = result;
                    const response = {postInfos, commentInfos};
                    res.status(200).send(response)};                                            
            })
            }
        })
    } else {
        res.status(401).send({message:"Vous n'êtes pas modérateur !"})
    }    
  }
