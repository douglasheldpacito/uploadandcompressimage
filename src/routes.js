const routes = require('express').Router();
const multer = require('multer');

// configuracao do multer
const multerConfig = require('./config/multerConfig');
// controller do perfil
const ProfileController = require('./controller/ProfileController');

/*
    POST: /
    Midleware: salvar arquivo passado por parametro
    Controller: chamado a funcao do ProfileController, acao apos midleware esteja ok
*/
routes.post("/", multer(multerConfig).single('file'), ProfileController.upload);

// Objetivo: tratar o erro "MulterError: File too large"
routes.use(function (err, req, res, next) {
    // Erro HTTP 413 Request entity too large (Solicitação da entidade muito extensa)
    res.status(413).json({ err: err.message });
})

module.exports = routes;