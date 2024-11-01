const Loan = require('../models/loan');
const User = require('../models/user'); // Supondo que você tenha um modelso User para verificar a existência do usuário
const books = require('../models/books'); // Supondo que você tenha um modelso books para verificar a existência do livro

module.exports = class LoanMiddleware {
    async validarLoanData(request, response, next) {
        const { loanLeft, loanReturn, userId, booksId } = request.body.loan;

        if (!loanLeft || !loanReturn || !userId || !booksId) {
            return response.status(400).json({
                status: false,
                msg: "Todos os campos (loanLeft, loanReturn, userId, booksId) são obrigatórios."
            });
        }

        next();
    }

    async isUserExists(request, response, next) {
        const userId = request.body.loan.userId;
        const user = new User();
        
        const userExists = await user.isUserById(userId); // Presumindo que você tenha um método para verificar a existência do usuário
        if (!userExists) {
            return response.status(400).json({
                status: false,
                msg: "Usuário não encontrado."
            });
        }

        next();
    }

    async isbooksExists(request, response, next) {
        const booksId = request.body.loan.booksId;
        const books = new books();
        
        const booksExists = await books.isbooksById(booksId); // Presumindo que você tenha um método para verificar a existência do livro
        if (!booksExists) {
            return response.status(400).json({
                status: false,
                msg: "Livro não encontrado."
            });
        }

        next();
    }

    async isUniqueLoan(request, response, next) {
        const userId = request.body.loan.userId;
        const booksId = request.body.loan.booksId;
        const loan = new Loan();
        
        // Presumindo que você tenha um método para verificar se o empréstimo já existe para o mesmo usuário e livro
        const loanExists = await loan.isLoanExists(userId, booksId); 
        if (loanExists) {
            return response.status(400).json({
                status: false,
                msg: "Este livro já está emprestado para este usuário."
            });
        }

        next();
    }
};
