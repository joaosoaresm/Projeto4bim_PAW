const Banco = require('./database');

class Book {
    constructor() {
        this._id = null;
        this._title = null;
        this._author = null;
        this._available = null;
    }

    async create() {
        const conexao = Banco.getConexao();
        const SQL = 'INSERT INTO book (title, author, available) VALUES (?, ?, 1);';

        try {
            const [result] = await conexao.promise().execute(SQL, [this._title, this._author]);
            this._id = result.insertId;
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao criar o livro:', error);
            return false;
        }
    }

    async delete(id) {
        const conexao = Banco.getConexao();
        const SQL = 'DELETE FROM book WHERE id = ?;';

        try {
            const [result] = await conexao.promise().execute(SQL, [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao excluir o livro:', error);
            return false;
        }
    }

    async update() {
        const conexao = Banco.getConexao();
        const SQL = 'UPDATE book SET title = ?, author = ? WHERE id = ?;';

        try {
            const [result] = await conexao.promise().execute(SQL, [this._title, this._author, this._id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar o livro:', error);
            return false;
        }
    }

    async updateAvailable() {
        const conexao = Banco.getConexao();
        const SQL = 'UPDATE book SET available = ? WHERE id = ?;';

        try {
            const [result] = await conexao.promise().execute(SQL, [this._available, this._id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar o livro:', error);
            return false;
        }
    }

    async isBookByTitle(title) {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT COUNT(*) AS qtd FROM book WHERE title = ?;';

        try {
            const [rows] = await conexao.promise().execute(SQL, [title]);
            return rows[0].qtd > 0;
        } catch (error) {
            console.error('Erro ao verificar o livro:', error);
            return false;
        }
    }

    async isBookById(id) {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT COUNT(*) AS qtd FROM book WHERE id = ?;';

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
        const SQL = 'SELECT * FROM book ORDER BY title;';

        try {
            const [rows] = await conexao.promise().execute(SQL);
            return rows;
        } catch (error) {
            console.error('Erro ao ler livros:', error);
            return [];
        }
    }

    async readById(id) {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM book WHERE id = ?;';

        try {
            const [rows] = await conexao.promise().execute(SQL, [id]);
            if(rows.length > 0) {
                return rows[0];
            }
            throw new Error('Livro não encontrado');
        } catch (error) {
            console.error('Erro ao buscar livro:', error);
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

module.exports = Book;
