const express = require('express');
const User = require('../models/user');
const TokenJWT = require('../models/MeuTokenJWT');
const bcrypt = require('bcrypt');

module.exports = class LoginControl {
    async login(request, response) {
        const user = new User();
        user.email = request.body.email;
        user.password = request.body.password;

        const loggedIn = await user.login();

        console.log("Resultado da consulta:", loggedIn);

        if (loggedIn) {
            const payloadToken = {
                id: loggedIn.id, // Assumindo que o ID do usuário está em loggedIn[0].id
                email: loggedIn.email,
                name: loggedIn.name
            };

            const jwt = new TokenJWT();
            const tokenString = jwt.gerarToken(payloadToken);

            const objResponse = {
                status: true,
                cod: 1,
                msg: 'Logado com sucesso',
                user: {
                    id: loggedIn.id,
                    name: loggedIn.name,
                    email: loggedIn.email
                },
                token: tokenString
            };
            return response.status(200).send(objResponse);
        } else {
            const objResponse = {
                status: false,
                msg: 'Usuário ou senha inválidos'
            };
            return response.status(401).send(objResponse);
        }
    }
};
