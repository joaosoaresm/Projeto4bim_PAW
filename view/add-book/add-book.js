window.onload = async function() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Por favor, faça login para acessar esta página.');
        window.location.href = '/';
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

// Enviar arquivo JSON para o backend
document.getElementById("uploadBookForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const fileInput = document.getElementById("bookFile");
    const file = fileInput.files[0];

    if (file && file.type === "application/json") {
        const reader = new FileReader();

        reader.onload = function(event) {
            try {
                const data = JSON.parse(event.target.result);
                
                // Verifica se os campos title e author existem
                if (data.title && data.author) {
                    fetch(`/book/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify({ title: data.title, author: data.author })
                    })
                    .then(response => {
                        if (response.ok) {
                            alert("Book created successfully from JSON!");
                            fileInput.value = "";
                        } else {
                            alert("Failed to create book from JSON.");
                        }
                    })
                    .catch(error => {
                        console.error("Error creating book from JSON:", error);
                    });
                } else {
                    alert("Invalid JSON format. The file must contain title and author fields.");
                }
            } catch (error) {
                alert("Invalid JSON file.");
                console.error("JSON parse error:", error);
            }
        };

        reader.readAsText(file);
    } else {
        alert("Please upload a valid JSON file.");
    }
});
