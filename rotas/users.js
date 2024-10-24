const express = require('express');
const { createUser } = require('../models/user');

const router = express.Router();

router.post('/users', (req, res) => {
    const { email, password, name } = req.body;

    createUser({ email, password, name }, (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao criar usuário', err });
        }
        res.status(201).json({ message: 'Usuário criado com sucesso', userId: result.insertId });
    });
});

module.exports = router;