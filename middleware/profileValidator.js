module.exports = (req, res, next) => {
    const regex1 = RegExp(/^[A-Z\u00C0-\u00D6\u00D8-\u00DF]{1}[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F '-]{2,40}$/);
    const regex2 = RegExp(/^[A-Z\u00C0-\u00D6\u00D8-\u00DF]{1}[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F '-]{2,40}$/);
    const regex3 = RegExp(/^[A-Z\u00C0-\u00D6\u00D8-\u00DF]{1}[a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F '-]{1,30}$/);
    const regex4 = RegExp(/^((\p{Emoji_Presentation}|\p{ExtPict})|[0-9a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F\n \x22!?(),\.'-])*$/gu);

    try {  
        const profileModif = { ...req.body};
        
        let test1 = regex1.test(profileModif.firstname);
        let test2 = regex2.test(profileModif.lastname);
        let test3 = regex3.test(profileModif.serviceName);
        let test4 = regex4.test(profileModif.aboutMe);

          if (test1===true && test2===true && test3===true && test4===true) {
            next();
          } else {
            if (test1 === false) {
              res.status(401).send({ message:'Le champ \'Prénom\' comporte au moins une erreur'});
            } else if (test2 === false) {
              res.status(401).send({ message:'Le champ \'Nom\' comporte au moins une erreur'});
            } else if (test3 === false) {
              res.status(401).send({ message:'Le champ \'Service\' comporte au moins une erreur'});
            } else if (test4 === false) {
              res.status(401).send({ message:'Le champ \'A propos de moi\' comporte au moins une erreur'});
            }            
            }          
        } catch {
          res.status(500).send({ message:'Une erreur s\'est produite'});
        }
      };