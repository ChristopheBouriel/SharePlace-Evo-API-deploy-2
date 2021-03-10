module.exports = (req, res, next) => {
    const regex = RegExp(/^((\p{Emoji_Presentation}|\p{ExtPict})|[0-9a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F\n \x22!?:(),\.'-]){1,4000}$/gu);

    try {  
            const content = req.body.content;
            let test = regex.test(content);
            if (test===true) {
            next();
            } else {
                res.status(401).send({ message:'Le contenu envoyé contient au moins un caractère non autorisé'});
            }
        
        } catch {
          res.status(500).send({ message:'Une erreur s\'est produite'});
        }
      };