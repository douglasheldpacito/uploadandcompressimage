const express = require('express');
// app
const app = express();
// ativa requisicoes com JSON
app.use(express.json());
// ativa complemento de requisicoes com JSON em URL
app.use(express.urlencoded({ extended: true }));
// adicionando as rotas criadas
app.use(require('./routes'));
// servidor escutando na porta 3012
app.listen(3012);