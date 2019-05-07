const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// configuracoes necessarias para salvar a imagem
module.exports = {
    // configuracao de armazenamento
    storage: multer.diskStorage({
        // pasta onde sera armazenado o arquivo
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', 'public', 'images'));
        },

        // nome do arquivo que sera salvo
        filename: (req, file, cb) => {
            // gera o hash para o nome do arquivo
            crypto.randomBytes(16, (err, hash) => {
                // caso ocorra um erro, retorna o erro para o callback
                if(err) cb(err);

                // gera nome do arquivo
                const filename = `${hash.toString('hex')}-${file.originalname}`;
                // caso nao ocorra erro, retorna o nome do arquivo
                cb(null, filename)
            })
        }
    }),

    // configuracao do limite do arquivo
    limits: {
        fileSize: 2 * 1024 * 1024
    },

    // configuracao do tipo de arquivo
    fileFilter: (req, file, cb) => {
        // tipos de arquivos aceitos
        const allowedMimes = [
            'image/jpeg',
            'image/jpg',
            'image/png'
        ];
        // verifica se o arquivo esta permitido
        if(allowedMimes.includes(file.mimetype)){
            // caso permitido
            cb(null, true);
        }else{
            // retorna um erro
            cb(new Error('O tipo do arquivo não é válido.'))
        }
    }
}