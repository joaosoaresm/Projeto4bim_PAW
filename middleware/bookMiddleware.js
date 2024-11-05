const Book = require('../models/book.js');

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
        const available = request.body.available;

        console.log(request.body);

        if (available !== 0 && available !== 1) {
            return response.status(400).json({
                status: false,
                msg: "A disponibilidade deve ser 0 (indisponível) ou 1 (disponível)."
            });
        }

        next();
    }

    async isUniquebook(request, response, next) {
        const nomeLivro = request.body.title;
        const book = new Book();

        const bookExists = await book.isBookByTitle(nomeLivro);

        if (bookExists) {
            return response.status(400).json({
                status: false,
                msg: "Já existe um livro cadastrado com esse título."
            });
        }

        next();
    }
};
