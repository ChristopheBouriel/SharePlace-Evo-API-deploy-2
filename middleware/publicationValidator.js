module.exports = (req, res, next) => {
    const regex1 = RegExp(/^[A-Z\u00C0-\u00D6\u00D8-\u00DF]{1}[0-9a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F !?:"(),\.'-]{0,59}$/);
    const regex2 = RegExp(/^[A-Z\u00C0-\u00D6\u00D8-\u00DF]{1}[0-9a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F\n !?:"(),\.'-]{0,4000}$/);

      try {  
        let test1 = regex1.test(req.body.title);
        let test2 = regex2.test(req.body.content);
        

          if (test1===true && test2===true) {
            next();
          } else {
            if (test1 === false) {
              res.status(401).send({ message:'Le champ \'Titre\' comporte au moins un caractère non autorisé'});
            } else if (test2 === false) {
              res.status(401).send({ message:'Le contenu comporte au moins un caractère non autorisé'});
            }          
            }          
        } catch {
          res.status(500).send({ message:'Une erreur s\'est produite'});
        }
      };