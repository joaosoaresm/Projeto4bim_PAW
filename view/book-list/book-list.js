window.onload = async function() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Por favor, faça login para acessar esta página.');
        window.location.href = '/login';
        return;
    }

    try {
        const response = await fetch('/book', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Passando o token no cabeçalho
            }
        });

        const data = await response.json();

        if (data.status) {
            const booksBody = document.getElementById('booksBody');
            data.book.forEach(book => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${book.id}</td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.available}</td>
                    <td id="update-${book.id}" class="link">update</td>
                    <td id="delete-${book.id}" class="link">delete</td>
                `;
                booksBody.appendChild(row);
                
                document.getElementById(`delete-${book.id}`).addEventListener('click', () => {
                    if (confirm(`Are you sure you want to delete the book "${book.title}"?`)) {
                        // Realiza a requisição DELETE
                        fetch(`/book/${book.id}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}` // Inclua o token de autenticação se necessário
                            }
                        })
                        .then(response => {
                            if (response.ok) {
                                alert("Book deleted successfully!");
                                row.remove();
                            } else {
                                alert("Failed to delete book.");
                            }
                        })
                        .catch(error => {
                            console.error("Error deleting book:", error);
                        });
                    }
                });

            });
        } else {
            alert(data.msg || 'Erro ao buscar livros.');
        }
    } catch (error) {
        console.error('Erro na requisição de listagem de livros:', error);
        alert('Erro ao buscar livros. Tente novamente mais tarde.');
    }
};

document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = '/home';
});

