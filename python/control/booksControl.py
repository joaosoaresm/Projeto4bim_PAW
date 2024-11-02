from flask import Flask, request, jsonify
from python.model import books  

app = Flask(__name__)

class BooksControl:

    @app.route('/books', methods=['POST'])
    async def create(self):
        book_data = request.json.get('books', {})
        book = books()
        book.title = book_data.get('title')
        book.author = book_data.get('author')
        book.available = book_data.get('available')

        is_created = await book.create()
        obj_response = {
            'cod': 1,
            'status': is_created,
            'msg': 'Livro criado com sucesso' if is_created else 'Erro ao criar o livro'
        }
        return jsonify(obj_response), 200

    @app.route('/books/<int:id>', methods=['DELETE'])
    async def delete(self, id):
        book = books()
        book.id = id

        is_deleted = await book.delete()
        obj_response = {
            'cod': 1,
            'status': is_deleted,
            'msg': 'Livro excluído com sucesso' if is_deleted else 'Erro ao excluir o livro'
        }
        return jsonify(obj_response), 200

    @app.route('/books/<int:id>', methods=['PUT'])
    async def update(self, id):
        book_data = request.json.get('books', {})
        book = books()
        book.id = id
        book.title = book_data.get('title')
        book.author = book_data.get('author')
        book.available = book_data.get('available')

        is_updated = await book.update()
        obj_response = {
            'cod': 1,
            'status': is_updated,
            'msg': 'Livro atualizado com sucesso' if is_updated else 'Erro ao atualizar o livro'
        }
        return jsonify(obj_response), 200

    @app.route('/books', methods=['GET'])
    async def read_all(self):
        book = books()
        result = await book.read_all()
        obj_response = {
            'cod': 1,
            'status': True,
            'msg': 'Executado com sucesso',
            'books': result
        }
        return jsonify(obj_response), 200

    @app.route('/books/<int:id>', methods=['GET'])
    async def read_by_id(self, id):
        book = books()
        book.id = id

        result = await book.isbooks_by_id(book.id)
        obj_response = {
            'cod': 1,
            'status': True,
            'msg': 'Livro encontrado' if result else 'Livro não encontrado',
            'books': result and await book.read_by_id() or None
        }
        return jsonify(obj_response), 200

# Instantiate and run your application
if __name__ == '__main__':
    app.run(debug=True)
