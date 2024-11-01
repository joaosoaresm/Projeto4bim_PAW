const User = require('../models/user');

module.exports = class UserMiddleware {
    async validarNomeUsuario(request, response, next) {
        const nomeUsuario = request.body.user.name;

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
        const senhaUsuario = request.body.user.password;

        const regexCaracteresEspeciais = /[!@#$%^&*(),.?":{}|<>]/;

        let temLetra = false;

        if (senhaUsuario.length < 8) {
            const objResposta = {
                status: false,
                msg: "A senha deve ter pelo menos 8 caracteres."
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
        
        for (let i = 0; i < senha.length; i++) {
            if (isNaN(senha[i])) {  // isNaN verifica se o caractere não é um número
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
        const emailUsuario = request.body.user.email;

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

    async isUserByEmail(request, response, next) {
        const emailUsuario = request.body.user.email;
        const user = new User();
        user.email = emailUsuario;

        const userExists = await user.readByEmail();

        if (userExists) {
            const objResposta = {
                status: false,
                msg: "Já existe um usuário cadastrado com esse email."
            };
            return response.status(400).send(objResposta);
        }

        next();
    }

};
