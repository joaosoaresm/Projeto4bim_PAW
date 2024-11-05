const express = require('express');
const Loan = require('../models/loan');
const Book = require('../models/book');

module.exports = class LoanControl {
    async create(request, response) {
        var loan = new Loan();
        var book = new Book();
        loan.loanLeft = request.body.loanLeft;
        loan.loanReturn = request.body.loanReturn;
        loan.userId = request.body.userId;
        loan.bookId = request.body.bookId;

        

        const isCreated = await loan.create();
        if (isCreated) {
            book.available = 0;
            book.id = loan.bookId;
            await book.updateAvailable();
        }
        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Empréstimo criado com sucesso' : 'Erro ao criar o empréstimo'
        };
        response.status(200).send(objResposta);
    }

    async delete(request, response) {
        var loan = new Loan();
        loan.id = request.params.idLoan;

        const isDeleted = await loan.delete();
        const objResposta = {
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Empréstimo excluído com sucesso' : 'Erro ao excluir o empréstimo'
        };
        response.status(200).send(objResposta);
    }

    async update(request, response) {
        var loan = new Loan();
        loan.id = request.params.idLoan;
        loan.loanLeft = request.body.loanLeft;
        loan.loanReturn = request.body.loanReturn;

        const isUpdated = await loan.update();
        const objResposta = {
            cod: 1,
            status: isUpdated,
            msg: isUpdated ? 'Empréstimo atualizado com sucesso' : 'Erro ao atualizar o empréstimo'
        };
        response.status(200).send(objResposta);
    }

    async readAll(request, response) {
        var loan = new Loan();
        const resultado = await loan.readAll();
        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Executado com sucesso',
            loans: resultado
        };
        response.status(200).send(objResposta);
    }

    async readById(request, response) {
        var loan = new Loan();
        loan.id = request.params.idLoan;

        const resultado = await loan.isLoanById(loan.id);
        const objResposta = {
            cod: 1,
            status: true,
            msg: resultado ? 'Empréstimo encontrado' : 'Empréstimo não encontrado',
            loan: resultado ? await loan.readById(loan.id) : null
        };
        response.status(200).send(objResposta);
    }
};
