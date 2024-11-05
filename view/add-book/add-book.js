window.onload = async function() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Por favor, faça login para acessar esta página.');
        window.location.href = '/login';
        return;
    }    
};

// Logout function
document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = '/home';
});

// Enviar dados do formulário para o backend
document.getElementById("addBookForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obtém os valores dos campos
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;

    fetch(`/book/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title, author })
    })
    .then(response => {
        if (response.ok) {
            alert("Book created successfully!");
            document.getElementById("title").value = "";
            document.getElementById("author").value = "";
            
        } else {
            alert("Failed to create book.");
        }
    })
    .catch(error => {
        console.error("Error creating book:", error);
    });
});