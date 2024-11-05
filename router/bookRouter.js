const express = require('express');
const bookControl = require('../control/bookControl');
const bookMiddleware = require('../middleware/bookMiddleware');
const JWTMiddleware = require('../middleware/JWTMiddleware');

module.exports = class BooksRouter {
    constructor() {
        this._router = express.Router();
        this._jwtMiddleware = new JWTMiddleware();
        this._bookControl = new bookControl();
        this._bookMiddleware = new bookMiddleware();
    }

    createRoutes() {
        this.router.get('/',
            this.jwtMiddleware.validate,
            this.bookControl.readAll
        );

        this.router.get('/:idBook',
            this.jwtMiddleware.validate,
            this.bookControl.readById
        );

        this.router.post('/',
            this.jwtMiddleware.validate,
            this.bookMiddleware.validarNomeLivro,
            this.bookMiddleware.validarAutor,
            this.bookMiddleware.isUniquebook,
            this.bookControl.create
        );

        this.router.delete('/:idBook',
            this.jwtMiddleware.validate,
            this.bookControl.delete
        );

        this.router.put('/:idBook',
            this.jwtMiddleware.validate,
            this.bookMiddleware.validarNomeLivro,
            this.bookMiddleware.validarAutor,
            this.bookControl.update
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

    get bookControl() {
        return this._bookControl;
    }

    set bookControl(newbooksControl) {
        this._bookControl = newbooksControl;
    }

    get bookMiddleware() {
        return this._bookMiddleware;
    }

    set bookMiddleware(newbooksMiddleware) {
        this._bookMiddleware = newbooksMiddleware;
    }
}
