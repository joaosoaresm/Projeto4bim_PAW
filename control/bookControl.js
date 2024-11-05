const express = require('express');
const Book = require('../models/book');

module.exports = class BookControl {
    async create(request, response) {
        var book = new Book();
        book.title = request.body.title;
        book.author = request.body.author;

        const isCreated = await book.create();
        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Livro criado com sucesso' : 'Erro ao criar o livro'
        };
        response.status(200).send(objResposta);
    }

    async delete(request, response) {
        var book = new Book();
        const id = request.params.idBook;

        console.log(request);

        const isDeleted = await book.delete(id);
        const objResposta = {
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Livro excluído com sucesso' : 'Erro ao excluir o livro'
        };
        response.status(200).send(objResposta);
    }

    async update(request, response) {
        var book = new Book();
        book.id = request.params.idBook;
        book.title = request.body.title;
        book.author = request.body.author;
        book.available = request.body.available;

        const isUpdated = await book.update();
        const objResposta = {
            cod: 1,
            status: isUpdated,
            msg: isUpdated ? 'Livro atualizado com sucesso' : 'Erro ao atualizar o livro'
        };
        response.status(200).send(objResposta);
    }

    async readAll(request, response) {
        var book = new Book();
        const resultado = await book.readAll();
        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Executado com sucesso',
            book: resultado
        };
        response.status(200).send(objResposta);
    }

    async readById(request, response) {
        var book = new Book();
        const id = request.params.idBook;

        const resultado = await book.readById(id);
        const objResposta = {
            cod: 1,
            status: true,
            msg: resultado ? 'Livro encontrado' : 'Livro não encontrado',
            book: resultado ? await book.readById(id) : null
        };
        response.status(200).send(objResposta);
    }
};
