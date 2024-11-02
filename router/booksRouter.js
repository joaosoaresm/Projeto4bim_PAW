const express = require('express');
const booksControl = require('../control/booksControl');
const booksMiddleware = require('../middleware/booksMiddleware');
const JWTMiddleware = require('../middleware/JWTMiddleware');

module.exports = class BooksRouter {
    constructor() {
        this._router = express.Router();
        this._jwtMiddleware = new JWTMiddleware();
        this._booksControl = new booksControl();
        this._booksMiddleware = new booksMiddleware();
    }

    createRoutes() {
        this.router.get('/',
            this.jwtMiddleware.validate,
            this.booksControl.readAll
        );

        this.router.get('/:idbooks',
            this.jwtMiddleware.validate,
            this.booksControl.readById
        );

        this.router.post('/',
            this.jwtMiddleware.validate,
            this.booksMiddleware.validarNomeLivro,   // Validação do nome do livro
            this.booksMiddleware.validarAutor,       // Validação do autor
            this.booksMiddleware.validarDisponibilidade, // Validação da disponibilidade
            this.booksMiddleware.isUniquebooks,       // Validação da unicidade do livro
            this.booksControl.create
        );

        this.router.delete('/:idbooks',
            this.jwtMiddleware.validate,
            this.booksControl.delete
        );

        this.router.put('/:idbooks',
            this.jwtMiddleware.validate,
            this.booksMiddleware.validarNomeLivro,   // Validação do nome do livro (opcional, se você quiser aplicar)
            this.booksMiddleware.validarAutor,       // Validação do autor (opcional, se você quiser aplicar)
            this.booksMiddleware.validarDisponibilidade, // Validação da disponibilidade (opcional, se você quiser aplicar)
            this.booksControl.update
        );

        return this._router;
    }

    get router() {
        return this._router;
    }

    set router(newRouter) {
        this._router = newRouter;
    }

    get jwtMiddleware() {
        return this._jwtMiddleware;
    }

    set jwtMiddleware(newJwtMiddleware) {
        this._jwtMiddleware = newJwtMiddleware;
    }

    get booksControl() {
        return this._booksControl;
    }

    set booksControl(newbooksControl) {
        this._booksControl = newbooksControl;
    }

    get booksMiddleware() {
        return this._booksMiddleware;
    }

    set booksMiddleware(newbooksMiddleware) {
        this._booksMiddleware = newbooksMiddleware;
    }
}
