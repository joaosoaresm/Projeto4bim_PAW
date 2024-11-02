const MeuTokenJWT = require('../models/MeuTokenJWT');

module.exports = class JwtMiddleware {

    validate(request, response, next) {
        const authHeader = request.headers['authorization'];

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];

            const objMeuTokenJWT = new MeuTokenJWT();
            if (objMeuTokenJWT.validarToken(token) == true) {
                next();
            } else {
                response.status(401).json({ status: false, msg: 'Token não fornecido ou inválido' });
            }
        } else {
            response.status(401).json({ status: false, msg: 'Token não fornecido ou inválido' });
        }
    }

}
