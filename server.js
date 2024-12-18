const express = require('express');
const BookRouter = require('./router/bookRouter');
const path = require('path');
const UserRouter = require('./router/userRouter');
const LoanRouter = require('./router/loanRouter');
const LoginRouter = require('./router/loginRouter');

const app = express();

const portaServico = 8080;

const bookRouter = new BookRouter();
const userRouter = new UserRouter();
const loanRouter = new LoanRouter();
const loginRouter = new LoginRouter();

module.exports = class Server {
    constructor() {    
        app.use(express.json());

        app.post('/register', async (req, res) => {
            const { email, password, name } = req.body; // Dados recebidos na requisição
        
            user._email = email;
            user._password = password;
            user._name = name;
        
            const success = await user.create();
        
            if (success) {
                res.status(201).send({ message: 'Usuário cadastrado com sucesso!' });
            } else {
                res.status(500).send({ message: 'Erro ao cadastrar usuário.' });
            }
        });



        //front
        app.use(express.static(path.join(__dirname, '/view/login'))); // Configura a pasta 'view' como estática
        
        app.use('/user-list',
            express.static(path.join(__dirname, '/view/user-list'))
        );

        app.use('/home',
            express.static(path.join(__dirname, '/view/home'))
        );

        app.use('/add-book',
            express.static(path.join(__dirname, '/view/add-book'))
        );

        app.use('/book-list',
            express.static(path.join(__dirname, '/view/book-list'))
        );

        app.use('/add-loan',
            express.static(path.join(__dirname, '/view/add-loan'))
        );

        app.use('/loan-list',
            express.static(path.join(__dirname, '/view/loan-list'))
        );        
        
        //back
        app.use('/login',
            loginRouter.createRoutes()
        );
    
        app.use('/book',
            bookRouter.createRoutes()
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