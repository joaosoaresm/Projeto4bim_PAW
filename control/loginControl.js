const express = require('express');
const User = require('../modelss/user');
const TokenJWT = require('../modelss/MeuTokenJWT');
const bcrypt = require('bcrypt');

module.exports = class LoginControl {
    async login(request, response) {
        const user = new User();
        user.email = request.body.user.email;
        user.password = request.body.user.password;

        const loggedIn = await user.readByEmail();

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
