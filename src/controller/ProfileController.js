const compressConfig = require('../config/compressConfig');
const MyError = require('./../erros/MyError');

module.exports = {
    async upload(req, res) {
        try {
            // verifica se o arquivo existe depois de passar pelo middleware
            if (req.file) {
                // comprime a imagem
                const image = await compressConfig.compressImage(req.file, 150, 'perfil');
                // verifica se ocorreu tudo certo a compressao
                if(image) return res.json({path: image, mensagem: 'Salvo com sucesso'});
                // gera uma excecao caso erro no compress
                throw new MyError(`Não foi possível comprimir a imagem.`);
            }
            // gera excecao caso tenha problema ao salvar o arquivo
            throw new MyError(`Ocorreu um erro ao salvar o arquivo.`);
        } catch (err) {
            // retorna a excecao
            return res.status(500).json({ err });
        }
    }
}