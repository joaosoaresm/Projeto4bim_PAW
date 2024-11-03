const books = require('../models/books');

module.exports = class booksMiddleware {
    async validarNomeLivro(request, response, next) {
        const nomeLivro = request.body.title;

        if (nomeLivro.length < 3) {
            return response.status(400).json({
                status: false,
                msg: "O título do livro deve ter mais do que 3 letras."
            });
        }

        next();
    }

    async validarAutor(request, response, next) {
        const autorLivro = request.body.author;

        if (!autorLivro || autorLivro.length < 3) {
            const objResposta = {
                status: false,
                msg: "O nome do autor deve ter mais de 3 caracteres."
            };
            return response.status(400).send(objResposta);
        }

        next();
    }

    async validarDisponibilidade(request, response, next) {
        const disponibilidade = request.body.availability;

        if (disponibilidade !== 0 && disponibilidade !== 1) {
            return response.status(400).json({
                status: false,
                msg: "A disponibilidade deve ser 0 (indisponível) ou 1 (disponível)."
            });
        }

        next();
    }

    async isUniquebooks(request, response, next) {
        const nomeLivro = request.body.title;
        const books = new books();
        books.title = nomeLivro;

        const booksExists = await books.isbooksByTitle();

        if (booksExists) {
            return response.status(400).json({
                status: false,
                msg: "Já existe um livro cadastrado com esse título."
            });
        }

        next();
    }
};
