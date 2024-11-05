const token = localStorage.getItem('token');
window.onload = async function() {
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
document.getElementById("addLoanForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obtém os valores dos campos
    const loanLeft = document.getElementById("left").value;
	const loanReturn = document.getElementById("return").value;
	const userId = document.getElementById("userId").value;
	const bookId = document.getElementById("bookId").value;

    fetch(`/loan`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ loanLeft, loanReturn, userId, bookId })
    })
    .then(response => {
        if (response.ok) {
            alert(" Loan created successfully!");
            document.getElementById("left").value = "";
            document.getElementById("return").value = "";
            document.getElementById("userId").value = "";
            document.getElementById("bookId").value = "";            
        } else {
            alert("Failed to create loan.");
        }
    })
    .catch(error => {
        console.error("Error creating loan:", error);
    });
});