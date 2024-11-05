const Loan = require('../models/loan');
const User = require('../models/user'); // Supondo que você tenha um modelso User para verificar a existência do usuário
const Book = require('../models/book'); // Supondo que você tenha um modelso book para verificar a existência do livro

module.exports = class LoanMiddleware {
    async validarLoanData(request, response, next) {
        const { loanLeft, loanReturn, userId, bookId } = request.body;

        if (!loanLeft || !loanReturn || !userId || !bookId) {
            return response.status(400).json({
                status: false,
                msg: "Todos os campos (loanLeft, loanReturn, userId, bookId) são obrigatórios."
            });
        }

        next();
    }

    async isUserExists(request, response, next) {
        const userId = request.body.userId;
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

    async isBookAvailable(request, response, next) {
        const bookId = request.body.bookId;
        const book = new Book();
        
        const bookExists = await book.readById(bookId);
        if (!bookExists) {
            return response.status(400).json({
                status: false,
                msg: "Livro não encontrado."
            });
        }
        if (bookExists.available === 0) {
            return response.status(400).json({
                status: false,
                msg: "Livro não está disponível para empréstimo."
            });
        }

        next();
    }
};
