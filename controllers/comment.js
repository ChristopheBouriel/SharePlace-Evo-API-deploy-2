const connexion = require('../dataBaseAccess');
const xssFilters = require('xss-filters');


exports.getAllComments = (req, res, next) => {
    connexion.query(`SELECT comments.id, comments.postId, comments.userName, comments.date_comment, comments.date_modif, comments.content, comments.modified, comments.moderated, users.imageUrl FROM comments INNER JOIN users ON comments.userName = users.userName WHERE comments.postId = ? ORDER BY comments.date_comment`, [req.body.publicationId], (error, result) => {
        if(error) {            
            res.status(500).send(error.code)
        }
        console.log(result)
        res.status(200).send(result);
    })
  }; 


exports.addComment = (req, res, next) => {
    const a = {...req.body};
    console.log(req.body)
    connexion.query(`SELECT userId FROM users WHERE userName = ?`, [req.body.userName], (error, result) => {
        if(error) {res.status(500).send(error.sqlMessage)}
        else {
          const userId = result[0].userId;
          const postId = xssFilters.inHTMLData(req.body.postId);
          const userName = xssFilters.inHTMLData(req.body.userName);
          const content = xssFilters.inHTMLData(req.body.content);
          const date_comment = xssFilters.inHTMLData(req.body.date_comment);
          connexion.query(`INSERT INTO comments (userId, postId, userName, content, date_comment) VALUES (?,?,?,?,?)`, 
            [userId, postId, userName, content, date_comment], (error, result)=>{
                if(error) {res.status(500).send(error.sqlMessage)}
                else {
                    connexion.query(`UPDATE publications 
                        SET numberComments = numberComments + 1
                        WHERE id = ?`, [req.body.postId],(error, result)=>{
                            if(error) {res.status(500).send(error.sqlMessage)}
                            else{res.status(201).send({message:"Comment added"})}
                    })
                } 
            })
        }
      })
};

exports.deleteComment = (req, res, next) => {
    connexion.query(`SELECT userName FROM comments WHERE id = ?`, [req.body.id], (error, result) => {
        if(error) {res.status(500).send(error.sqlMessage)}
        else if ( result.length !== 0 && result[0].userName === req.body.userName) {            
          connexion.query(`DELETE FROM comments WHERE id=?`,[req.body.id], (error, result) => {
                if(error) {res.status(500).send(error.sqlMessage)}
                else {
                    connexion.query(`UPDATE publications 
                        SET numberComments = numberComments - 1
                        WHERE id = ?`, [req.body.postId], (error, result) => {
                            if (result) {res.status(200).send({message:"Comment deleted"});
                                }
                            if (error) {res.status(500).send(error);}
                    })
                }
            })  
        } else {res.status(401).send({message:"You're not the author !"})}
      }
      )    
};

exports.modifyComment = (req, res, next) => {      
    connexion.query(`SELECT userName FROM comments WHERE id = ?`, [req.body.commentId], (error, result) => {        
        if(error) {res.status(500).send(error.sqlMessage)}
        else if (result.length !== 0 && result[0].userName === req.body.userName) {    
            const content = xssFilters.inHTMLData(req.body.content.replace(/\"/gi,'&µ'));
            const modified = xssFilters.inHTMLData(req.body.modified);
            const date_modif = xssFilters.inHTMLData(req.body.date_modif);
            const id = xssFilters.inHTMLData(req.body.commentId);
            connexion.query(`UPDATE comments SET content="${content}", modified="${modified}", date_modif="${date_modif}" WHERE id="${id}"`, (error, result) => {
                if(error) {res.status(500).send(error.sqlMessage)}
                else {res.status(200).send({message:"Update done"})                                 
                }
            })    
        } else {res.status(401).send({message:"Attention"})}
      }      
      )      
};
