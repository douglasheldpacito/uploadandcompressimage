const compressConfig = require('../config/compressConfig');
const MyError = require('./../erros/MyError');

module.exports = {
    async upload(req, res) {
        try {
            if (req.file) {
                const image = await compressConfig.compressImage(req.file, 100, 'perfil');

                if(image)
                    return res.json({path: image, mensagem: 'Salvo com sucesso'});
            }
        } catch (err) {
            return res.status(500).json({ err });
        }
    }
}