const Banco = require('./database');
const bcrypt = require('bcrypt');

class User {
    constructor() {
        this._id = null;
        this._email = null;
        this._password = null;
        this._name = null;
    }

    async create() {
        const conexao = Banco.getConexao();
        const SQL = 'INSERT INTO user (email, password, name) VALUES (?, ?, ?);';

        try {
            const hashedPassword = await bcrypt.hash(this._password, 10);
            const [result] = await conexao.promise().execute(SQL, [this._email, hashedPassword, this._name]);
            this._id = result.insertId;
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao criar o usuário:', error);
            return false;
        }
    }

    async delete() {
        const conexao = Banco.getConexao();
        const SQL = 'DELETE FROM user WHERE id = ?;';

        try {
            const [result] = await conexao.promise().execute(SQL, [this._id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao excluir o usuario:', error);
            return false;
        }
    }

    async update() {
        const conexao = Banco.getConexao();
        const SQL = 'UPDATE user SET name = ? WHERE id = ?;';

        try {
            const [result] = await conexao.promise().execute(SQL, [this._name, this._id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar o user:', error);
            return false;
        }
    }

    async isUserByname() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT COUNT(*) AS qtd FROM user WHERE name = ?;';

        try {
            const [rows] = await conexao.promise().execute(SQL, [this._name]);
            return rows[0].qtd > 0;
        } catch (error) {
            console.error('Erro ao verificar o user:', error);
            return false;
        }
    }

    async isUserById(id) {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT COUNT(*) AS qtd FROM user WHERE id = ?;';
        
        try {
            const [rows] = await conexao.promise().execute(SQL, [id]);
            return rows[0].qtd > 0;
        } catch (error) {
            console.error('Erro ao verificar o user:', error);
            return false;
        }
    }

    async readAll() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM user ORDER BY name;';

        try {
            const [rows] = await conexao.promise().execute(SQL);
            return rows;
        } catch (error) {
            console.error('Erro ao ler users:', error);
            return [];
        }
    }

    async readByEmail() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM user WHERE email = ?;';

        try {
            const [rows] = await conexao.promise().execute(SQL, [this._email]);
            return rows;
        } catch (error) {
            console.error('Erro ao ler user pelo email:', error);
            return null;
        }
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
        return this;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
        return this;
    }

    get email() {
        return this._email;
    }

    set email(email) {
        this._email = email;
        return this;
    }

    get password() {
        return this._password;
    }

    set password(password) {
        this._password = password;
        return this;
    }
}

module.exports = User;
