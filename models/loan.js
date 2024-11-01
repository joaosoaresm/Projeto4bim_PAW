const Banco = require('./database');

class Loan {
    constructor() {
        this._id = null;
        this._loanLeft = null;
        this._loanReturn = null;
        this._userId = null;
        this._booksId = null;
    }

    async create() {
        const conexao = Banco.getConexao();
        const SQL = 'INSERT INTO loan (loan_left, loan_return, user_id, bookss_id) VALUES (?, ?, ?, ?);';

        try {
            const [result] = await conexao.promise().execute(SQL, [this._loanLeft, this._loanReturn, this._userId, this._booksId]);
            this._id = result.insertId;
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao criar o empréstimo:', error);
            return false;
        }
    }

    async delete() {
        const conexao = Banco.getConexao();
        const SQL = 'DELETE FROM loan WHERE id = ?;';

        try {
            const [result] = await conexao.promise().execute(SQL, [this._id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao excluir o empréstimo:', error);
            return false;
        }
    }

    async update() {
        const conexao = Banco.getConexao();
        const SQL = 'UPDATE loan SET loan_left = ?, loan_return = ?, user_id = ?, bookss_id = ? WHERE id = ?;';

        try {
            const [result] = await conexao.promise().execute(SQL, [this._loanLeft, this._loanReturn, this._userId, this._booksId, this._id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error('Erro ao atualizar o empréstimo:', error);
            return false;
        }
    }

    async isLoanById(id) {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT COUNT(*) AS qtd FROM loan WHERE id = ?;';

        try {
            const [rows] = await conexao.promise().execute(SQL, [id]);
            return rows[0].qtd > 0;
        } catch (error) {
            console.error('Erro ao verificar o empréstimo:', error);
            return false;
        }
    }

    async readAll() {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM loan ORDER BY loan_left;';

        try {
            const [rows] = await conexao.promise().execute(SQL);
            return rows;
        } catch (error) {
            console.error('Erro ao ler empréstimos:', error);
            return [];
        }
    }

    async readById(id) {
        const conexao = Banco.getConexao();
        const SQL = 'SELECT * FROM loan WHERE id = ?;';

        try {
            const [rows] = await conexao.promise().execute(SQL, [id]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error('Erro ao ler empréstimo pelo ID:', error);
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

    get loanLeft() {
        return this._loanLeft;
    }

    set loanLeft(loanLeft) {
        this._loanLeft = loanLeft;
        return this;
    }

    get loanReturn() {
        return this._loanReturn;
    }

    set loanReturn(loanReturn) {
        this._loanReturn = loanReturn;
        return this;
    }

    get userId() {
        return this._userId;
    }

    set userId(userId) {
        this._userId = userId;
        return this;
    }

    get booksId() {
        return this._booksId;
    }

    set booksId(booksId) {
        this._booksId = booksId;
        return this;
    }
}

module.exports = Loan;
