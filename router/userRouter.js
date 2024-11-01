const express = require('express');
const UserControl = require('../control/userControl');
const UserMiddleware = require('../middleware/userMiddleware');
const JWTMiddleware = require('../middleware/JWTMiddleware');

module.exports = class UserRouter {
    constructor() {
        this._router = express.Router();
        this._jwtMiddleware = new JWTMiddleware();
        this._userControl = new UserControl();
        this._userMiddleware = new UserMiddleware();
    }

    createRoutes() {
        const multer = require('multer');
        const upload = multer({ dest: 'uploads/' });

        this.router.post('/csv',
            this.jwtMiddleware.validate,
            upload.single('userFile'),
            this.userControl.createByCSV
        );

        this.router.get('/',
            this.jwtMiddleware.validate,
            this.userControl.readAll
        );

        this.router.get('/:idUser',
            this.jwtMiddleware.validate,
            this.userControl.readById
        );

        this.router.post('/',
            this.jwtMiddleware.validate,
            this.userMiddleware.validarNomeUsuario,
            this.userMiddleware.validarSenha,
            this.userMiddleware.validarEmail,
            this.userMiddleware.isUserByEmail,
            this.userControl.create
        );

        this.router.delete('/:idUser',
            this.jwtMiddleware.validate,
            this.userControl.delete
        );

        this.router.put('/:idUser',
            this.jwtMiddleware.validate,
            this.userMiddleware.validarNomeUsuario,
            this.userMiddleware.validarSenha,
            this.userMiddleware.validarEmail,
            this.userControl.update
        );

        return this.router;
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

    get userControl() {
        return this._userControl;
    }

    set userControl(newUserControl) {
        this._userControl = newUserControl;
    }

    get userMiddleware() {
        return this._userMiddleware;
    }

    set userMiddleware(newUserMiddleware) {
        this._userMiddleware = newUserMiddleware;
    }
}
