const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const db = require('./config/database');

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/api', userRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});