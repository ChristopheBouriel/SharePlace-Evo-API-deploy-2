module.exports = (req, res, next) => {
    const regex1 = RegExp(/^[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F '-]{2,30}$/);
    
    try {  
        if (!req.body.userName) {
            next()
        } else {
            const userName = req.body.userName;
            let test1 = regex1.test(userName);
            if (test1===true) {
            next();
            } else {
                res.status(401).send({ message:'Le champ \'Nom d\'utilisateur\' contient au moins un caractère non autorisé'});
            }
        } 
        } catch {
          res.status(400).send({ message:'Une erreur s\'est produite'});
        }
      };