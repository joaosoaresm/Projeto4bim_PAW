from flask import Flask, jsonify, request
from control.booksControl import BookController  # Ajuste conforme a localização do arquivo da classe BookController
from model.books import BookController  # Ajuste conforme a localização do arquivo da classe Book

# Cria a aplicação Flask
app = Flask("rest_api")

# Função auxiliar para lidar com erros de validação
def handle_validation_error(e):
    return jsonify({"erro": str(e)}), 400

# Função responsável por obter todos os livros
# Endpoint: GET /books/
@app.route('/books/', methods=['GET'])
def read_all_books():
    try:
        # Instancia o controlador de Book
        book_controller = BookController()
        # Chama o método para buscar todos os livros e retorna o resultado
        return book_controller.read_all()
    except ValueError as e:
        return handle_validation_error(e)

# Função responsável por obter um livro específico pelo ID
# Endpoint: GET /books/<int:id>
@app.route('/books/<int:id>', methods=['GET'])
def read_book_by_id(id):
    try:
        # Instancia o controlador de Book
        book_controller = BookController()
        # Define o ID do livro no objeto BookController
        book_controller.book.id = id
        # Chama o método para buscar o livro pelo ID e retorna o resultado
        return book_controller.read_by_id()
    except ValueError as e:
        return handle_validation_error(e)

# Função responsável por criar um novo livro
# Endpoint: POST /books/
@app.route('/books/', methods=['POST'])
def create_book():
    try:
        # Obtém o corpo da requisição em formato JSON
        body = request.get_json()
        # Instancia o controlador de Book
        book_controller = BookController()
        # Define as propriedades do livro com base nos dados recebidos
        book_controller.book.title = body['book']['title']
        book_controller.book.author = body['book']['author']
        book_controller.book.available = body['book']['available']
        # Chama o método para criar o livro e retorna o resultado
        return book_controller.create_control()
    except ValueError as e:
        return handle_validation_error(e)

# Função responsável por atualizar um livro existente
# Endpoint: PUT /books/<int:id>
@app.route('/books/<int:id>', methods=['PUT'])
def update_book(id):
    try:
        # Obtém o corpo da requisição em formato JSON
        body = request.get_json()
        # Instancia o controlador de Book
        book_controller = BookController()
        # Define as propriedades do livro e o ID com base nos dados recebidos
        book_controller.book.title = body['book']['title']
        book_controller.book.author = body['book']['author']
        book_controller.book.available = body['book']['available']
        book_controller.book.id = id
        # Chama o método para atualizar o livro e retorna o resultado
        return book_controller.update()
    except ValueError as e:
        return handle_validation_error(e)

# Função responsável por deletar um livro pelo ID
# Endpoint: DELETE /books/<int:id>
@app.route('/books/<int:id>', methods=['DELETE'])
def delete_book(id):
    try:
        # Instancia o controlador de Book
        book_controller = BookController()
        # Define o ID do livro a ser deletado
        book_controller.book.id = id
        # Chama o método para deletar o livro e verifica o resultado
        books_deleted = book_controller.delete()
        if books_deleted:
            # Se o livro foi excluído com sucesso, retorna uma mensagem de sucesso
            return jsonify({"message": "Livro deletado com sucesso"}), 200
        else:
            # Se o livro não foi encontrado, retorna uma mensagem de erro
            return jsonify({"message": "Livro não encontrado"}), 404
    except ValueError as e:
        return handle_validation_error(e)

# Inicia o servidor Flask na porta 8080
app.run(host='0.0.0.0', port=8080)