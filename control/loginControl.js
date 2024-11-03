const express = require('express');
const User = require('../models/user');
const TokenJWT = require('../models/MeuTokenJWT');
const bcrypt = require('bcrypt');

module.exports = class LoginControl {
    async login(request, response) {
        const user = new User();
        user.email = request.body.user.email;
        user.password = request.body.user.password;

        const loggedIn = await user.readByEmail();

        console.log("Resultado da consulta:", loggedIn);

        if (loggedIn && loggedIn.length > 0) {
            const senhaCorreta = await bcrypt.compare(user.password, loggedIn[0].password);
            console.log("Senha correta:", senhaCorreta);

            if (senhaCorreta) {
                // Código para login bem-sucedido
            } else {
                console.log("A senha está incorreta.");
            }
        } else {
            console.log("Usuário não encontrado.");
        }

        if (loggedIn && loggedIn.length > 0 && await bcrypt.compare(user.password, loggedIn[0].password)) {
            const payloadToken = {
                id: loggedIn[0].id, // Assumindo que o ID do usuário está em loggedIn[0].id
                email: loggedIn[0].email,
                name: loggedIn[0].name
            };

            const jwt = new TokenJWT();
            const tokenString = jwt.gerarToken(payloadToken);

            const objResponse = {
                status: true,
                cod: 1,
                msg: 'Logado com sucesso',
                user: {
                    id: loggedIn[0].id,
                    name: loggedIn[0].name,
                    email: loggedIn[0].email
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
