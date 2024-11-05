let idSelected = undefined;
const token = localStorage.getItem('token');

window.onload = async function() {
    if (!token) {
        alert('Por favor, faça login para acessar esta página.');
        window.location.href = '/';
        return;
    }

    await getLoans();
};

document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = '/home';
});

// Fechar o modal
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("updateBookModal").classList.add("hidden-modal");
});

// Enviar dados do formulário para o backend
document.getElementById("addBookForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obtém os valores dos campos
    const loanLeft = document.getElementById("left").value;
	const loanReturn = document.getElementById("return").value;

    fetch(`/loan/${idSelected}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ loanLeft, loanReturn })
    })
    .then(async response => {
        if (response.ok) {
            alert("Loan updated successfully!");
            document.getElementById("left").value = "";
            document.getElementById("return").value = "";
            const booksBody = document.getElementById('booksBody');
            booksBody.innerHTML = "";
            await getLoans();
        } else {
            alert("Failed to update loan.");
        }
    })
    .catch(error => {
        console.error("Error updating loan:", error);
    });
});

const getLoans = async () => {
    try {
        const response = await fetch('/loan', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Passando o token no cabeçalho
            }
        });

        const data = await response.json();

        if (data.status) {
            const loansBody = document.getElementById('booksBody');
            data.loans.forEach(loan => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${loan.id}</td>
                    <td>${loan.loan_left}</td>
                    <td>${loan.loan_return}</td>
                    <td>${loan.User_id}</td>
                    <td>${loan.Book_id}</td>
                    <td id="update-${loan.id}" class="link">update</td>
                    <td id="delete-${loan.id}" class="link">delete</td>
                `;
                loansBody.appendChild(row);
                
                document.getElementById(`delete-${loan.id}`).addEventListener('click', () => {
                    if (confirm(`Are you sure you want to delete the loan?`)) {
                        // Realiza a requisição DELETE
                        fetch(`/loan/${loan.id}`, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}` // Inclua o token de autenticação se necessário
                            }
                        })
                        .then(response => {
                            if (response.ok) {
                                alert("Loan deleted successfully!");
                                row.remove();
                            } else {
                                alert("Failed to delete loan.");
                            }
                        })
                        .catch(error => {
                            console.error("Error deleting loan:", error);
                        });
                    }
                });

                document.getElementById(`update-${loan.id}`).addEventListener("click", () => {
                    idSelected = loan.id;
                    document.getElementById("updateBookModal").classList.remove("hidden-modal");
                });
            });
        } else {
            alert(data.msg || 'Error getting loans.');
        }
    } catch (error) {
        console.error('Error on loan list request:', error);
        alert('Error getting loans. Please try again later.');
    }
}