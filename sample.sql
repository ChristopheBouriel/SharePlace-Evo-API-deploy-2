CREATE DATABASE shareplacevolution CHARACTER SET utf8 COLLATE utf8_general_ci;


CREATE TABLE IF NOT EXISTS shareplacevolution.users ( 
    id INT UNSIGNED NOT NULL AUTO_INCREMENT, 
    userId VARCHAR(60) NOT NULL, 
    userName VARCHAR(40) NOT NULL, 
    userPassword CHAR(60) NOT NULL, 
    firstname VARCHAR(40) NOT NULL, 
    lastname VARCHAR(40) NOT NULL, 
    serviceName VARCHAR(30) NOT NULL, 
    email VARCHAR(40),
    imageUrl VARCHAR(255) DEFAULT 'http://localhost:3000/images/default.png', 
    aboutMe TEXT, 
    isMod BOOLEAN DEFAULT 0, 
    date_logout DATETIME, 
    PRIMARY KEY (id) 
)
ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS shareplacevolution.publications ( 
    id INT UNSIGNED NOT NULL AUTO_INCREMENT, 
    userId VARCHAR(60) NOT NULL, 
    date_publication DATETIME NOT NULL, 
    title VARCHAR(60) NOT NULL, 
    content TEXT NOT NULL, 
    numberComments INT DEFAULT 0, 
    likes INT DEFAULT 0, 
    userName VARCHAR(40) NOT NULL, 
    modified BOOLEAN DEFAULT 0, 
    date_modif DATETIME, 
    moderated BOOLEAN DEFAULT 0, 
    viewed BOOLEAN DEFAULT 1, 
    PRIMARY KEY (id) 
)
ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS shareplacevolution.comments ( 
    id INT UNSIGNED NOT NULL AUTO_INCREMENT, 
    userId VARCHAR(60) NOT NULL, 
    postId INT NOT NULL, 
    date_comment DATETIME NOT NULL, 
    content TEXT NOT NULL, 
    userName VARCHAR(40) NOT NULL, 
    modified BOOLEAN DEFAULT 0, 
    date_modif DATETIME, 
    moderated BOOLEAN DEFAULT 0, 
    PRIMARY KEY (id) 
)ENGINE=INNODB DEFAULT CHARSET=utf8;

INSERT INTO `shareplacevolution`.`users` (`id`, `userId`, `userName`, `userPassword`, `firstname`, `lastname`, `serviceName`, `email`, `aboutMe`, `isMod`) VALUES ("1", "8a56jhr2-a2d1-4052-9e51-c456gh3e6785", "Mr Malok", "$2b$10$FIrRIAzwqpREWdo7a2AR1.2IrAypp2Kx4y/zQ6N7YQad9hFxRyqPO", "Jean", "Martin", "comptabilité", "j.martin@gmail.com", "Et voilà du texte", "0");
INSERT INTO `shareplacevolution`.`users` (`id`, `userId`, `userName`, `userPassword`, `firstname`, `lastname`, `serviceName`, `email`, `aboutMe`, `isMod`) VALUES ("2", "8a56jhr2-a2d1-4052-9e51-c17bsug8r3hi", "Daphidoo", "$2b$10$0cXdu.5nSbZRUdHyf.FEE.blxYhkd3pv9oaUNvhari9usLS.h9Wny", "Daphné", "Scoubi", "RH", "mystery.machine@gmail.com", "", "0");
INSERT INTO `shareplacevolution`.`users` (`id`, `userId`, `userName`, `userPassword`, `firstname`, `lastname`, `serviceName`, `email`, `aboutMe`, `isMod`, `date_logout`) VALUES ("3", "8a56jhr2-a2d1-4052-9e51-c1hfur3e6719", "Snuggle", "$2b$10$mL/Gx0pZ0R2avn2JysrJuumYyEzHSr3ztbF5ZhRO9w5/peTr6DsNK", "Damien", "Remplin", "RH", "damrem@gmail.com", "Ride free", "0", "2020-10-20 10:16:14");
INSERT INTO `shareplacevolution`.`users` (`id`, `userId`, `userName`, `userPassword`, `firstname`, `lastname`, `serviceName`, `email`, `aboutMe`, `isMod`, `date_logout`) VALUES ("22", "8a56jhr2-a2d1-4052-9e51-c1hdue8e6785", "Bourreau de la mode", "$2b$10$Z7Y7O2y8uqm3YzlXDEWbbeiOEkruRbrpd6zFg4jNEQjRp.WwrbvTq", "Carla", "Garfield", "Recherche et Développement", "carla.garfield@gmail.com", "Blabla blablabla bla...", "0", "2020-12-15 15:35:20");
INSERT INTO `shareplacevolution`.`users` (`id`, `userId`, `userName`, `userPassword`, `firstname`, `lastname`, `serviceName`, `email`, `aboutMe`, `isMod`) VALUES ("24", "8a56jhr2-a2d1-4052-9e51-c17b413e6785", "Majou", "$2b$10$cZEoATMzcYhj2w/ERyMuUeNSLLdAGd5OG88J5rsyemSRtvzzLu7x6", "Marie", "Jourdain", "Informatique", "marie.jourdain@gmail.com", "Rien pour le moment...", "0");
INSERT INTO `shareplacevolution`.`users` (`id`, `userId`, `userName`, `userPassword`, `firstname`, `lastname`, `serviceName`, `email`, `aboutMe`, `isMod`, `date_logout`) VALUES ("39", "4bf488fc-fbb1-40c6-ae8e-3983e7432a82", "Kurty", "$2b$10$iJ5pCKqh87PVmdNBZJq7OeJUrIPx0H5ZwfyBXk2ayjLjicRDsH51e", "Kurt", "Cobain", "Export", "kc@gmail.com", "Searching for Nirvana", "0", "2020-10-22 15:01:11");
INSERT INTO `shareplacevolution`.`users` (`id`, `userId`, `userName`, `userPassword`, `firstname`, `lastname`, `serviceName`, `email`, `aboutMe`, `isMod`, `date_logout`) VALUES ("41", "13c46d3e-7eec-4d5c-b94b-272505f7ce5f", "Tof", "$2b$10$7z66KcLTl158AlWyNcIsnOt95gQS2CR3Qp8FafMbxLEmkY/gM2USS", "Christophe", "Bouriel", "Informatique", "c.bouriel@gmail.com", "J'aime coder, mais ce projet était énorme en termes de charge de travail !", "0", "2021-02-11 18:07:20");
INSERT INTO `shareplacevolution`.`users` (`id`, `userId`, `userName`, `userPassword`, `firstname`, `lastname`, `serviceName`, `email`, `aboutMe`, `isMod`) VALUES ("43", "6614a641-df5f-4a9c-bfa9-a3921263434a", "Duggy", "$2b$10$th3iJu7WlV.QmIQEUOYz9Oouy9ds62DjOzeKJh5KukFl9C94skIKe", "Cédric", "Le Bescont", "Ressources Humaines", "c.duggy@gmail.com", "Jamais je ne cesserai de surfer... même à 70 ans", "0");
INSERT INTO `shareplacevolution`.`users` (`id`, `userId`, `userName`, `userPassword`, `firstname`, `lastname`, `serviceName`, `email`, `aboutMe`, `isMod`) VALUES ("53", "181a26d2-32e9-4f0a-8ac0-e6c2d58fe7f9", "Altaïr", "$2b$10$45vigeBr5xHs/8tS2Xw./OSSIRHyMlHyiKKkNJz8MNfI3y7LXBA3a", "Agnès", "Gendre", "Informatique", "ag@gmail.com", "", "0");
INSERT INTO `shareplacevolution`.`users` (`id`, `userId`, `userName`, `userPassword`, `firstname`, `lastname`, `serviceName`, `email`, `aboutMe`, `isMod`, `date_logout`) VALUES ("54", "48f54b2a-e1bb-45f1-882f-a2aeb9df3f99", "Mag", "$2b$10$g5DRQIFS8yKltES9wM.5Jeg7p2yWsRqhXu7nVSm2iwKf7DhfNphtC", "Magali", "Morgen", "Achats", "mag.morg@gmail.com", "Passion fruit lover", "0", "2020-10-20 22:27:36");
INSERT INTO `shareplacevolution`.`users` (`id`, `userId`, `userName`, `userPassword`, `firstname`, `lastname`, `serviceName`, `email`, `aboutMe`, `isMod`, `date_logout`) VALUES ("57", "79f77917-8259-4e55-97e0-5324ed57d1bd", "Pier", "$2b$10$hKUZEYAVbdPTe66PuJx7/eizJEpAD3ApbullB53Z0QXBiJu79xa.q", "Pierre", "Duguigné", "Informatique", "", "", "0", "2020-10-22 14:42:05");
INSERT INTO `shareplacevolution`.`users` (`id`, `userId`, `userName`, `userPassword`, `firstname`, `lastname`, `serviceName`, `email`, `aboutMe`, `isMod`, `date_logout`) VALUES ("62", "c49dd606-fd15-439f-bca0-c633c9bbd66b", "Rens", "$2b$10$jISoeOWHs9FrWSUonMtKZ.XCG2IRrjZJuiEg3HfRoApFkBL7l1Bau", "René", "Cobain", "Production", "see.next@gmail.com", "", "0", "2020-10-30 13:58:41");
INSERT INTO `shareplacevolution`.`users` (`id`, `userId`, `userName`, `userPassword`, `firstname`, `lastname`, `serviceName`, `email`, `aboutMe`, `isMod`, `date_logout`) VALUES ("4", "13c46d3e-7eec-4d5c-b94b-272505f8df6g", "Moderator", "$2b$10$IVu0OWdfml4Se9LIVZTRWORqns8qh72YEcUVNcCMnJcrxtxW9xv8u", "Marc", "Lespubly", "Communication", "marc.lespubly@groupomania.fr", "En cas d'interventionde ma part, les publications ou commentaires modérés ne seront pas effacés mais ne seront plus accessibles, sauf pour vous. Vous pourrez les supprimer vous-même ou les modifier avant de m'en informer : nous verrons alors si la modération peut être levée.", "1", "2021-02-11 18:07:20");
INSERT INTO `shareplacevolution`.`users` (`id`, `userId`, `userName`, `userPassword`, `firstname`, `lastname`, `serviceName`, `email`, `aboutMe`, `isMod`, `date_logout`) VALUES ("63", "13c46d3e-7eec-4d5c-b94b-272505f8ddrg", "Userix", "$2b$10$F88TB8HL0vEVMr6ucNSm3ugc9mN1TvM.aTw.2TcXmpW07wDIfszu2", "John", "Doe", "Qualité", "john.doe@groupomania.fr", "Rien, mais vous pouvez changer cela en guise de test pour la modification du profil !", "0", "2021-02-11 18:07:20");


INSERT INTO `shareplacevolution`.`publications` (`id`, `userId`, `date_publication`, `title`, `content`, `numberComments`, `likes`, `userName`, `modified`, `moderated`, `viewed`) VALUES ("1", "8a56jhr2-a2d1-4052-9e51-c456gh3e6785", "2020-09-15 00:00:00", "La fausse première", "Si ça pouvait marcher...", "1", "0", "Mr Malok", "0", "0", "0");
INSERT INTO `shareplacevolution`.`publications` (`id`, `userId`, `date_publication`, `title`, `content`, `numberComments`, `likes`, `userName`, `modified`, `moderated`, `viewed`) VALUES ("2", "8a56jhr2-a2d1-4052-9e51-c17bsug8r3hi", "2020-09-16 00:00:00", "La deuxième fausse", "Si ça a marché une fois...", "1", "0", "Daphidoo", "0", "0", "0");
INSERT INTO `shareplacevolution`.`publications` (`id`, `userId`, `date_publication`, `title`, `content`, `numberComments`, `likes`, `userName`, `modified`, `moderated`, `viewed`) VALUES ("3", "8a56jhr2-a2d1-4052-9e51-c1hfur3e6719", "2020-09-18 00:00:00", "Pour voir...", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "6", "1", "Snuggle", "0", "0", "0");
INSERT INTO `shareplacevolution`.`publications` (`id`, `userId`, `date_publication`, `title`, `content`, `numberComments`, `likes`, `userName`, `modified`, `moderated`, `viewed`) VALUES ("4", "8a56jhr2-a2d1-4052-9e51-c1hdue8e6785", "2020-09-20 00:00:00", "La plaie", "Pourquoi, mais pourquoi ai-je des neveux ? Ouin", "4", "1", "Bourreau de la mode", "0", "1", "1");
INSERT INTO `shareplacevolution`.`publications` (`id`, `userId`, `date_publication`, `title`, `content`, `numberComments`, `likes`, `userName`, `modified`, `date_modif`, `moderated`, `viewed`) VALUES ("5", "8a56jhr2-a2d1-4052-9e51-c1hdue8e6785", "2020-10-08 00:00:00", "La paix", "En fait je n'ai rien à dire mais Christophe a besoin d'une deuxième publication de moi... \nAlors voilà", "0", "8", "Bourreau de la mode", "1", "2020-10-15 10:44:47", "0", "1");
INSERT INTO `shareplacevolution`.`publications` (`id`, `userId`, `date_publication`, `title`, `content`, `numberComments`, `likes`, `userName`, `modified`, `date_modif`, `moderated`, `viewed`) VALUES ("7", "13c46d3e-7eec-4d5c-b94b-272505f7ce5f", "2020-10-14 00:00:00", "Commme ça...", "Juste pour en faire une première depuis le front-end\nAvec retour à la ligne, 'guillemets' et &µapostrophes&µ ", "8", "1", "Tof", "1", "2020-10-22 19:10:48", "0", "1");
INSERT INTO `shareplacevolution`.`publications` (`id`, `userId`, `date_publication`, `title`, `content`, `numberComments`, `likes`, `userName`, `modified`, `moderated`, `viewed`) VALUES ("22", "48f54b2a-e1bb-45f1-882f-a2aeb9df3f99", "2020-10-19 21:42:46", "L'espoir", "A mon tour de mettre un commentaire pour t'aider Christophe", "5", "0", "Mag", "0", "0", "0");
INSERT INTO `shareplacevolution`.`publications` (`id`, `userId`, `date_publication`, `title`, `content`, `numberComments`, `likes`, `userName`, `modified`, `date_modif`, `moderated`, `viewed`) VALUES ("27", "48f54b2a-e1bb-45f1-882f-a2aeb9df3f99", "2020-10-20 22:26:03", "Trop de remous", "Je voulais juste... Te connaitre un peu mieux\nC'est le but de cet endroit... Non ?", "1", "0", "Mag", "1", "2020-10-20 22:27:12", "0", "0");

INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `date_modif`, `moderated`) VALUES ("240", "8a56jhr2-a2d1-4052-9e51-c17bsug8r3hi", "4", "2020-09-26 20:00:49", "Voilà la modification", "Daphidoo", "1", "2020-09-27 08:08:08", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `date_modif`, `moderated`) VALUES ("247", "8a56jhr2-a2d1-4052-9e51-c1hfur3e6719", "4", "2020-09-27 20:54:50", "Quelle modification ???", "Snuggle", "1", "2020-10-05 16:51:55", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `date_modif`, `moderated`) VALUES ("251", "8a56jhr2-a2d1-4052-9e51-c456gh3e6785", "3", "2020-09-27 21:05:19", "Voilà !", "Mr Malok", "1", "2020-09-28 17:17:44", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `date_modif`, `moderated`) VALUES ("254", "8a56jhr2-a2d1-4052-9e51-c1hfur3e6719", "3", "2020-09-28 17:10:39", "Quoi ?", "Snuggle", "1", "2020-10-01 11:07:25", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `moderated`) VALUES ("263", "8a56jhr2-a2d1-4052-9e51-c1hdue8e6785", "4", "2020-10-06 11:04:34", "Euh, oui, laquelle ?", "Bourreau de la mode", "0", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `moderated`) VALUES ("265", "8a56jhr2-a2d1-4052-9e51-c1hdue8e6785", "3", "2020-10-08 16:28:51", "Oui, quoi ?", "Bourreau de la mode", "0", "1");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `moderated`) VALUES ("268", "8aef0982-a2d1-4052-9e51-c17b413e6582", "5", "2020-10-13 11:37:29", "Juste comme ça", "utilisateur désinscrit", "0", "1");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `moderated`) VALUES ("269", "78d397e9-64fc-48a4-ab1b-a899170262ec", "3", "2020-10-13 14:26:04", "Pas compris...", "utilisateur désinscrit", "0", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `moderated`) VALUES ("276", "6614a641-df5f-4a9c-bfa9-a3921263434a", "5", "2020-10-14 10:46:58", "Popopop !!!", "Duggy", "0", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `date_modif`, `moderated`) VALUES ("298", "13c46d3e-7eec-4d5c-b94b-272505f7ce5f", "5", "2020-10-16 15:03:02", "Eh bien, merci\nC'est vrai que c'était gentil", "Tof", "1", "2020-10-16 16:57:31", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `date_modif`, `moderated`) VALUES ("299", "13c46d3e-7eec-4d5c-b94b-272505f7ce5f", "7", "2020-10-16 16:55:49", "Je crois que cette fois on y est :D\nEnfin presque...", "Tof", "1", "2020-10-17 17:03:57", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `moderated`) VALUES ("305", "8a56jhr2-a2d1-4052-9e51-c17bsug8r3hi", "3", "2020-10-17 13:17:04", "C'est du latin !?", "Daphidoo", "0", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `moderated`) VALUES ("315", "48f54b2a-e1bb-45f1-882f-a2aeb9df3f99", "7", "2020-10-18 16:19:37", "Et là ?", "Mag", "0", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `moderated`) VALUES ("319", "13c46d3e-7eec-4d5c-b94b-272505f7ce5f", "5", "2020-10-18 19:23:21", "On va boire un verre Carla ?", "Tof", "0", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `moderated`) VALUES ("320", "8a56jhr2-a2d1-4052-9e51-c1hdue8e6785", "5", "2020-10-18 20:34:45", "Si tu veux, ça me ferait plaisir :D", "Bourreau de la mode", "0", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `moderated`) VALUES ("321", "13c46d3e-7eec-4d5c-b94b-272505f7ce5f", "5", "2020-10-19 10:35:54", "Quand ?", "Tof", "0", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `moderated`) VALUES ("322", "48f54b2a-e1bb-45f1-882f-a2aeb9df3f99", "5", "2020-10-19 13:45:43", "Ben ça va vous deux, vous n'avez pas besoin de Tinder ", "Mag", "0", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `moderated`) VALUES ("347", "13c46d3e-7eec-4d5c-b94b-272505f7ce5f", "4", "2020-10-19 19:15:36", "Désolé, c'était trop méchant...", "Tof", "0", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `moderated`) VALUES ("348", "13c46d3e-7eec-4d5c-b94b-272505f7ce5f", "5", "2020-10-19 20:23:47", "Jalouse ?", "Tof", "0", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `date_modif`, `moderated`) VALUES ("349", "13c46d3e-7eec-4d5c-b94b-272505f7ce5f", "7", "2020-10-19 20:24:35", "Oui, bientôt... Bientôt", "Tof", "1", "2020-10-20 12:17:21", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `moderated`) VALUES ("350", "48f54b2a-e1bb-45f1-882f-a2aeb9df3f99", "7", "2020-10-19 21:39:09", "Enfin !", "Mag", "0", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `moderated`) VALUES ("352", "8a56jhr2-a2d1-4052-9e51-c1hdue8e6785", "22", "2020-10-19 21:55:02", "C'est vrai que t'es jalouse ? : )", "Bourreau de la mode", "0", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `moderated`) VALUES ("353", "8a56jhr2-a2d1-4052-9e51-c1hfur3e6719", "22", "2020-10-20 10:16:05", "Oui, je crois", "Snuggle", "0", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `moderated`) VALUES ("355", "4bf488fc-fbb1-40c6-ae8e-3983e7432a82", "2", "2020-10-20 10:36:04", "On dirait qu'il y a un problème d'heure pour les notifications Admin...", "Kurty", "0", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `moderated`) VALUES ("356", "4bf488fc-fbb1-40c6-ae8e-3983e7432a82", "1", "2020-10-20 10:37:00", "On peut faire encore plein de choses mais c'est déjà pas mal.", "Kurty", "0", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `moderated`) VALUES ("357", "48f54b2a-e1bb-45f1-882f-a2aeb9df3f99", "22", "2020-10-20 10:37:48", "N'importe quoi, vous rêvez !", "Mag", "0", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `moderated`) VALUES ("360", "8a56jhr2-a2d1-4052-9e51-c1hdue8e6785", "22", "2020-10-20 12:18:55", ":D", "Bourreau de la mode", "0", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `moderated`) VALUES ("361", "8a56jhr2-a2d1-4052-9e51-c1hdue8e6785", "7", "2020-10-20 12:19:20", "Bien contente !", "Bourreau de la mode", "0", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `date_modif`, `moderated`) VALUES ("367", "7ff449f1-f3d0-4c9d-9ce4-9b47c4d9b419", "34", "2020-10-22 17:48:16", "azerty", "utilisateur désinscrit", "1", "2020-10-22 17:48:22", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `moderated`) VALUES ("368", "13c46d3e-7eec-4d5c-b94b-272505f7ce5f", "34", "2020-10-22 17:49:56", "qwerty !", "Tof", "0", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `date_modif`, `moderated`) VALUES ("370", "7847c6fb-8a51-4542-8e29-f325f12826f7", "27", "2020-10-23 09:54:59", "Ne les écoute pas", "utilisateur désinscrit", "1", "2020-10-23 09:55:17", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `moderated`) VALUES ("371", "13c46d3e-7eec-4d5c-b94b-272505f7ce5f", "7", "2020-10-23 09:58:44", "Là", "Tof", "0", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `date_modif`, `moderated`) VALUES ("374", "d4e7e541-b262-4ba0-a0ea-2839b198485f", "7", "2020-10-23 12:20:29", "Là !", "utilisateur désinscrit", "1", "2020-10-23 12:20:39", "0");
INSERT INTO `shareplacevolution`.`comments` (`id`, `userId`, `postId`, `date_comment`, `content`, `userName`, `modified`, `date_modif`, `moderated`) VALUES ("375", "13c46d3e-7eec-4d5c-b94b-272505f7ce5f", "22", "2020-10-30 14:01:13", "Popopop", "Tof", "1", "2020-10-30 14:01:22", "0");
