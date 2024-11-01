const express = require('express');

const LoanControl = require('../control/loanControl');
const LoanMiddleware = require('../middleware/loanMiddleware'); // Corrigido para 'LoanMiddleware'
const JWTMiddleware = require('../middleware/JWTMiddleware');

module.exports = class LoanRouter {

    constructor() {
        this._router = express.Router();
        this._jwtMiddleware = new JWTMiddleware();
        this._loanControl = new LoanControl();
        this._loanMiddleware = new LoanMiddleware();
    }

    createRoutes() {
        const multer = require('multer');
        const upload = multer({ dest: 'uploads/' });

        this.router.post('/csv',
            this.jwtMiddleware.validate,
            upload.single('loanFile'),  // nome da variável para o upload do arquivo CSV
            this.loanControl.createByCSV
        );

        this.router.get('/',
            this.jwtMiddleware.validate,
            this.loanControl.readAll
        );

        this.router.get('/:idLoan',
            this.jwtMiddleware.validate,
            this.loanControl.readById
        );

        this.router.post('/',
            this.jwtMiddleware.validate,
            this.loanMiddleware.validarLoanData,  // Corrigido para 'validarLoanData'
            this.loanMiddleware.isUserExists,
            this.loanMiddleware.isbooksExists,  // Corrigido para 'isBooksExists'
            this.loanMiddleware.isUniqueLoan,
            this.loanControl.create
        );

        this.router.delete('/:idLoan',
            this.jwtMiddleware.validate,
            this.loanControl.delete
        );

        this.router.put('/:idLoan',
            this.jwtMiddleware.validate,
            this.loanControl.update
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

    get loanControl() {
        return this._loanControl;
    }

    set loanControl(newLoanControl) {
        this._loanControl = newLoanControl;
    }

    get loanMiddleware() {
        return this._loanMiddleware;
    }

    set loanMiddleware(newLoanMiddleware) {
        this._loanMiddleware = newLoanMiddleware;
    }
}