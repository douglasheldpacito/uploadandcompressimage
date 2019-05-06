const routes = require('express').Router();
const multer = require('multer');

const multerConfig = require('./config/multerConfig');
const ProfileController = require('./controller/ProfileController');

routes.post("/", multer(multerConfig).single('file'), ProfileController.upload);

routes.use(function (err, req, res, next) {
    res.status(413).json({ err: err.message });
})

module.exports = routes;