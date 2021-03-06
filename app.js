const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const path = require('path');
//const cors = require('cors');

const multer = require('./middleware/multer-config');


const userRoutes = require('./routes/user');
const publicationsRoutes = require('./routes/publication');
const commentsRoutes = require('./routes/comment');
const profilesRoutes = require('./routes/profile');
const moderateRoutes = require('./routes/moderate');
const app = express();

app.use(helmet());
//app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
  });


app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/publications', publicationsRoutes);
app.use('/api/comments', commentsRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/profiles', profilesRoutes);
app.use('/api/moderate', moderateRoutes);

module.exports = app;