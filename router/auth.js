const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByEmail } = require('../models/user');

const router = express.Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    findUserByEmail(email, async (err, user) => {
        if (err) return res.status(500).json({ message: 'Erro no servidor', err });
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Senha incorreta' });

        const token = jwt.sign({ id: user.id, email: user.email }, 'seu_segredo_jwt', { expiresIn: '1h' });
        res.json({ token });
    });
});

module.exports = router;