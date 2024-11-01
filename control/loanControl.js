const express = require('express');
const Loan = require('../modelss/loan');

module.exports = class LoanControl {
    async create(request, response) {
        var loan = new Loan();
        loan.loanLeft = request.body.loan.loanLeft;
        loan.loanReturn = request.body.loan.loanReturn;
        loan.userId = request.body.loan.userId;
        loan.booksId = request.body.loan.booksId;

        const isCreated = await loan.create();
        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Empréstimo criado com sucesso' : 'Erro ao criar o empréstimo'
        };
        response.status(200).send(objResposta);
    }

    async delete(request, response) {
        var loan = new Loan();
        loan.id = request.params.id;

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
        loan.id = request.params.id;
        loan.loanLeft = request.body.loan.loanLeft;
        loan.loanReturn = request.body.loan.loanReturn;
        loan.userId = request.body.loan.userId;
        loan.booksId = request.body.loan.booksId;

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
        loan.id = request.params.id;

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
