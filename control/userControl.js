const express = require('express');
const User = require('../modelss/user');

module.exports = class UserControl {
    async create(request, response) {
        var user = new User();
        user.email = request.body.user.email;
        user.password = request.body.user.password;
        user.name = request.body.user.name;

        const isCreated = await user.create();
        const objResposta = {
            cod: 1,
            status: isCreated,
            msg: isCreated ? 'Usuário criado com sucesso' : 'Erro ao criar o usuário'
        };
        response.status(200).send(objResposta);
    }

    async delete(request, response) {
        var user = new User();
        user.id = request.params.id;

        const isDeleted = await user.delete();
        const objResposta = {
            cod: 1,
            status: isDeleted,
            msg: isDeleted ? 'Usuário excluído com sucesso' : 'Erro ao excluir o usuário'
        };
        response.status(200).send(objResposta);
    }

    async update(request, response) {
        var user = new User();
        user.id = request.params.id;
        user.name = request.body.user.name;

        const isUpdated = await user.update();
        const objResposta = {
            cod: 1,
            status: isUpdated,
            msg: isUpdated ? 'Usuário atualizado com sucesso' : 'Erro ao atualizar o usuário'
        };
        response.status(200).send(objResposta);
    }

    async readAll(request, response) {
        var user = new User();
        const resultado = await user.readAll();
        const objResposta = {
            cod: 1,
            status: true,
            msg: 'Executado com sucesso',
            users: resultado
        };
        response.status(200).send(objResposta);
    }

    async readById(request, response) {
        var user = new User();
        user.id = request.params.id;

        const resultado = await user.isUserById(user.id);
        const objResposta = {
            cod: 1,
            status: true,
            msg: resultado ? 'Usuário encontrado' : 'Usuário não encontrado',
            user: resultado ? await user.readByEmail() : null
        };
        response.status(200).send(objResposta);
    }
};