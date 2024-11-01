const Banco = require('./database');

class books {
    constructor() {
        this._id = null;
        this._title = null;
        this._author = null;
        this._available = null;
    }

    async create() {
        const conexao = Banco.getConexao();
        const SQL = 'INSERT INTO bookss (title, author) VALUES (?, ?);';

        try {
            const [result] = await conexao.promise().execute(SQL, [this._title, this._author]);
            this._id = result.insertId;
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao criar o livro:', error);
            return false;
        }
    }

    async delete() {
        const conexao = Banco.getConexao();
        const SQL = 'DELETE FROM bookss WHERE id = ?;';

        try {
            const [result] = await conexao.promise().execute(SQL, [this._id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao excluir o livro:', error);
            return false;
        }
    }

    async update() {
        const conexao = Banco.getConexao();
        const SQL = 'UPDATE bookss SET title = ?, author = ?, available = ? WHERE id = ?;';

        try {
            const [result] = await conexao.promise().execute(SQL, [this._title, this._author, this._available, this._id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar o livro:', error);
            return false;
        }
    }

    async isbooksByTitle() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT COUNT(*) AS qtd FROM bookss WHERE title = ?;';

        try {
            const [rows] = await conexao.promise().execute(SQL, [this._title]);
            return rows[0].qtd > 0;
        } catch (error) {
            console.error('Erro ao verificar o livro:', error);
            return false;
        }
    }

    async isbooksById(id) {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT COUNT(*) AS qtd FROM bookss WHERE id = ?;';

        try {
            const [rows] = await conexao.promise().execute(SQL, [id]);
            return rows[0].qtd > 0;
        } catch (error) {
            console.error('Erro ao verificar o livro:', error);
            return false;
        }
    }

    async readAll() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM bookss ORDER BY title;';

        try {
            const [rows] = await conexao.promise().execute(SQL);
            return rows;
        } catch (error) {
            console.error('Erro ao ler livros:', error);
            return [];
        }
    }

    async readByTitle() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM bookss WHERE title = ?;';

        try {
            const [rows] = await conexao.promise().execute(SQL, [this._title]);
            return rows;
        } catch (error) {
            console.error('Erro ao ler livro pelo título:', error);
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

    get title() {
        return this._title;
    }

    set title(title) {
        this._title = title;
        return this;
    }

    get author() {
        return this._author;
    }

    set author(author) {
        this._author = author;
        return this;
    }

    get available() {
        return this._available;
    }

    set available(available) {
        this._available = available;
        return this;
    }
}

module.exports = books;
