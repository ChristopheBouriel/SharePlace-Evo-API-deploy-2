module.exports = (req, res, next) => {
    const regex1 = RegExp(/^[A-Z\u00C0-\u00D6\u00D8-\u00DF]{1}[0-9a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F \x22!?:(),\.'-]{0,99}$/);
    const regex2 = RegExp(/^((\p{Emoji_Presentation}|\p{ExtPict})|[0-9a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F\n \x22!?:(),\.'-]){1,4000}$/gu);

      try {  
        let test1 = regex1.test(req.body.title);
        let test2 = regex2.test(req.body.content);
        

          if (test1===true && test2===true) {
            next();
          } else {
            if (test1 === false) {
              res.status(401).send({ message:'Le champ \'Titre\' comporte au moins une erreur'});
            } else if (test2 === false) {
              res.status(401).send({ message:'Le contenu comporte au moins une erreur'});
            }          
            }          
        } catch {
          res.status(500).send({ message:'Une erreur s\'est produite'});
        }
      };