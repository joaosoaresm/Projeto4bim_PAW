from model.Banco import Banco
from mysql.connector import Error
import logging

class Book:
    def _init_(self):
        self._id = None
        self._title = None
        self._author = None
        self._available = True

    def create(self):
        conexao = Banco.getConexao()
        if conexao:
            try:
                cursor = conexao.cursor()
                sql = "INSERT INTO book (title, author, available) VALUES (%s, %s, %s)"
                cursor.execute(sql, (self.title, self.author, self.available))
                conexao.commit()
                self.id = cursor.lastrowid  # Atualiza o id após criação
                return self.id
            except Error as e:
                logging.error(f"Erro ao criar livro: {e}")
                raise ValueError("Ocorreu um erro ao cadastrar o livro")
            finally:
                cursor.close()

    def read_all(self):
        conexao = Banco.getConexao()
        if conexao:
            try:
                cursor = conexao.cursor(dictionary=True)
                sql = "SELECT * FROM book ORDER BY title ASC"
                cursor.execute(sql)
                return cursor.fetchall()
            except Error as e:
                logging.error(f"Erro ao obter livros: {e}")
                raise ValueError("Ocorreu um erro ao selecionar todos os livros")
            finally:
                cursor.close()

    def read_by_id(self):
        conexao = Banco.getConexao()
        if conexao:
            try:
                cursor = conexao.cursor(dictionary=True)
                sql = "SELECT * FROM book WHERE id = %s"
                cursor.execute(sql, (self.id,))
                linhaRespostaSQL = cursor.fetchone()
                if linhaRespostaSQL:
                    self.id = linhaRespostaSQL['id']
                    self.title = linhaRespostaSQL['title']
                    self.author = linhaRespostaSQL['author']
                    self.available = linhaRespostaSQL['available']
                return linhaRespostaSQL
            except Error as e:
                logging.error(f"Erro ao obter livro por ID: {e}")
                return None
            finally:
                cursor.close()

    def update(self):
        conexao = Banco.getConexao()
        if conexao:
            try:
                cursor = conexao.cursor()
                sql = "UPDATE book SET title = %s, author = %s, available = %s WHERE id = %s"
                cursor.execute(sql, (self.title, self.author, self.available, self.id))
                conexao.commit()
                return cursor.rowcount
            except Error as e:
                logging.error(f"Erro ao atualizar livro: {e}")
                raise ValueError("Erro ao atualizar o livro.")
            finally:
                cursor.close()

    def delete(self):
        conexao = Banco.getConexao()
        if conexao:
            try:
                cursor = conexao.cursor()
                sql = "DELETE FROM book WHERE id = %s"
                cursor.execute(sql, (self.id,))
                conexao.commit()
                qtdExcluidos = cursor.rowcount
                return qtdExcluidos
            except Error as e:
                logging.error(f"Erro ao deletar livro: {e}")
                return None
            finally:
                cursor.close()

    # Getters e Setters
    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, value):
        self._id = value

    @property
    def title(self):
        return self._title

    @title.setter
    def title(self, value):
        self._title = value

    @property
    def author(self):
        return self._author

    @author.setter
    def author(self, value):
        self._author = value

    @property
    def available(self):
        return self._available

    @available.setter
    def available(self, value):
        self._available = value