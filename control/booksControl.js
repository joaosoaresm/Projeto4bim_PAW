const express = require('express');
const books = require('../models/books');

module.exports = class booksControl {
    async create(request, response) {
        var books = new books();
        books.title = request.body.title;
        books.author = request.body.author;
        books.available = request.body.available;

        const isCreated = await books.create();
        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Livro criado com sucesso' : 'Erro ao criar o livro'
        };
        response.status(200).send(objResposta);
    }

    async delete(request, response) {
        var books = new books();
        books.id = request.params.id;

        const isDeleted = await books.delete();
        const objResposta = {
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Livro excluído com sucesso' : 'Erro ao excluir o livro'
        };
        response.status(200).send(objResposta);
    }

    async update(request, response) {
        var books = new books();
        books.id = request.params.id;
        books.title = request.body.title;
        books.author = request.body.author;
        books.available = request.body.available;

        const isUpdated = await books.update();
        const objResposta = {
            cod: 1,
            status: isUpdated,
            msg: isUpdated ? 'Livro atualizado com sucesso' : 'Erro ao atualizar o livro'
        };
        response.status(200).send(objResposta);
    }

    async readAll(request, response) {
        var books = new books();
        const resultado = await books.readAll();
        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Executado com sucesso',
            bookss: resultado
        };
        response.status(200).send(objResposta);
    }

    async readById(request, response) {
        var books = new books();
        books.id = request.params.id;

        const resultado = await books.isbooksById(books.id);
        const objResposta = {
            cod: 1,
            status: true,
            msg: resultado ? 'Livro encontrado' : 'Livro não encontrado',
            books: resultado ? await books.readById() : null
        };
        response.status(200).send(objResposta);
    }
};
