const db = require('../config/database');
const bcrypt = require('bcrypt');

// Função para criar um novo usuário
const createUser = async (userData, callback) => {
    const { email, password, name } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const query = `INSERT INTO User (email, password, name) VALUES (?, ?, ?)`;
    db.query(query, [email, hashedPassword, name], (err, result) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

// Função para buscar um usuário pelo email
const findUserByEmail = (email, callback) => {
    const query = `SELECT * FROM User WHERE email = ?`;
    db.query(query, [email], (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results[0]); // Retorna o primeiro usuário encontrado
        }
    });
};

module.exports = { createUser, findUserByEmail };