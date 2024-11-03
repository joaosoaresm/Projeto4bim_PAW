const User = require('../models/user');

module.exports = class UserMiddleware {
    async validarNomeUsuario(request, response, next) {
        const nomeUsuario = request.body.name;

        if (nomeUsuario.length < 3) {
            const objResposta = {
                status: false,
                msg: "O nome deve ter mais do que 3 letras."
            };
            return response.status(400).send(objResposta);
        }

        next();
    }

    async validarSenha(request, response, next) {
        const senhaUsuario = request.body.password;

        const regexCaracteresEspeciais = /[!@#$%^&*(),.?":{}|<>]/;

        let temLetra = false;

        if (senhaUsuario.length < 6) {
            const objResposta = {
                status: false,
                msg: "A senha deve ter pelo menos 6 caracteres."
            };
            return response.status(400).send(objResposta);
        }

        if (!regexCaracteresEspeciais.test(senhaUsuario)) {
            const objResposta = {
                status: false,
                msg: "A senha deve conter pelo menos um caractere especial."
            };
            return response.status(400).send(objResposta);
        }
        
        for (let i = 0; i < senhaUsuario.length; i++) {
            if (isNaN(senhaUsuario[i])) {  // isNaN verifica se o caractere não é um número
                temLetra = true;
                break;
            }
        }

        if (!temLetra) {
            return response.status(400).send({
                status: false,
                msg: "A senha deve conter pelo menos uma letra."
            });
        }

        next();
    }

    async validarEmail(request, response, next) {
        const emailUsuario = request.body.email;

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(emailUsuario)) {
            const objResposta = {
                status: false,
                msg: "Email inválido."
            };
            return response.status(400).send(objResposta);
        }

        next();
    }

    async isNotEmailCadastrado(request, response, next) {
        const email = request.body.email;
        const user = new User();
        const is = await user.isUserByEmail(email);

        if (is == false) {
            next();
        } else {
            const objResposta = {
                status: false,
                msg: "Já existe um usuário cadastrado com este e-mail"
            }

            response.status(400).send(objResposta);
        }
    }

};
