const fs = require('fs');
const sharp = require('sharp');

const MyError = require('./../erros/MyError');

/*
    compressImage
        file: arquivo que sera modificado
        size: tamanho do arquivo
        filename: nome que sera atribuido ao novo arquivo comprimido
*/
exports.compressImage = async (file, size, filename) => {
    // local e nome do arquivo que sera gerado a imagem comprimida
    const newPath = `${file.destination}\\${filename}` + '.webp';

    return await sharp(file.path) // origem do arquivo
        // tamanho do arquivo 
        .resize(size) 
        // forcar formato
        .toFormat('webp')
        // configuracao do formato
        .webp({
            // qualidade que ira ser gerado o arquivo
            quality: 80
        })
        // escreve a saida para um buffer
        .toBuffer()
        // caso ocorra tudo certo
        .then(data => {
            // verifica se o arquivo existe
            fs.access(file.path, (err) => {
                // se o arquivo nao existe retorna um erro
                if (!err) {
                    // apaga o arquivo
                    fs.unlink(file.path, err => {
                        // caso nao consiga apagar retorna um erro
                        if (err) throw new MyError(err);
                    })
                }
            });
            // escrever arquivo no novo caminho criado
            fs.writeFile(newPath, data, err => {
                // verifica se existe erro
                if (err) {
                    // caso haja um erro ao salvar o novo arquivo sera gerado um erro
                    throw new MyError(err);
                }
            });
            // retorna o caminho caso tenha ocorrido tudo OK
            return newPath;
        })
        // caso haja uma excecao
        .catch(err => {
            // gera outros tipos de excecoes
            throw new MyError(err.message);
        })
}