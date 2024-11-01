const jwt = require('jsonwebtoken');

class TokenJWT {
    constructor() {
        this._key = "x9S4q0v+V0IjvHkG20uAxaHx1ijj+q1HWjHKv+ohxp/oK+77qyXkVj/l4QYHHTF3";
        this._alg = 'HS256';
        this._type = 'JWT'; 
        this._iss = 'http://localhost';
        this._aud = 'http://localhost';
        this._sub = "acesso_sistema";
        this._duracaoToken = 3600 * 24 * 30;
    }

    gerarToken(claims) {
        const headers = {
            alg: this._alg,
            typ: this._type
        };

        const payload = {
            iss: this._iss,
            aud: this._aud,
            sub: this._sub,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + this._duracaoToken,
            nbf: Math.floor(Date.now() / 1000),
            jti: require('crypto').randomBytes(16).toString('hex'),
            userId: claims.id,
            email: claims.email,
            name: claims.name
        };

        const token = jwt.sign(payload, this._key, { algorithm: this._alg, header: headers });
        return token;
    }

    validarToken(tokenString) {
        if (!tokenString || tokenString.trim() === "") {
            return false;
        }
        
        const token = tokenString.replace("Bearer ", "").trim();
        
        try {
            const decoded = jwt.verify(token, this._key, { algorithms: [this._alg] });
            this.payload = decoded;
            return true;
        } catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                console.error("Token expirado");
            } else if (err instanceof jwt.JsonWebTokenError) {
                console.error("Token inválido");
            } else {
                console.error("Erro geral", err);
            }
            return false;
        }
    }

    getPayload() {
        return this.payload;
    }
    
    setPayload(payload) {
        this.payload = payload;
    }
    
    getAlg() {
        return this._alg;
    }
    
    setAlg(alg) {
        this._alg = alg;
    }
}

module.exports = TokenJWT;

