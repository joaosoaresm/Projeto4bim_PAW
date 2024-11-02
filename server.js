const express = require('express');
const BooksRouter = require('./router/booksRouter');
const path = require('path');
const UserRouter = require('./router/userRouter');
const LoanRouter = require('./router/loanRouter');
const LoginRouter = require('./router/loginRouter');

const app = express();

const portaServico = 8080;

const booksRouter = new BooksRouter();
const userRouter = new UserRouter();
const loanRouter = new LoanRouter();
const loginRouter = new LoginRouter();

module.exports = class Server {
    constructor() {    
        app.use(express.json());
    
        app.use(express.static(path.join(__dirname, 'view'))); // Configura a pasta 'view' como estática
        app.use('/login',
            loginRouter.createRoutes()
        );
    
        app.use('/books',
            booksRouter.createRoutes()
        );
    
        app.use('/user',
            userRouter.createRoutes()
        );
    
        app.use('/loan',
            loanRouter.createRoutes()
        );
    }
    iniciar = () => {
        app.listen(portaServico, () => {
            console.log(`API rodando no endereço: http://localhost:${portaServico}/`);
        }); 
    }
}


