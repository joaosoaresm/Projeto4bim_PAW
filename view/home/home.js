window.onload = function() {
    const token = localStorage.getItem('token');
    const mainContent = document.getElementById('mainContent');

    if (token) {
        mainContent.classList.remove('hidden');
    } else {
        window.location.href = '/';
    }
};

// Lógica de logout
document.getElementById('logoutButton').addEventListener('click', () => {
    // Remove o token do localStorage
    localStorage.removeItem('token');
    // Redireciona para a página de login
    window.location.href = '/';
});

document.getElementById('addBookButton').addEventListener('click', () => {
    window.location.href = '/add-book';
});

document.getElementById('listBooksButton').addEventListener('click', () => {
    window.location.href = '/book-list';
});

document.getElementById('listUsersButton').addEventListener('click', () => {
    window.location.href = '/user-list';
});

document.getElementById('loanBookButton').addEventListener('click', () => {
    window.location.href = '/add-loan';
});

document.getElementById('listLoansButton').addEventListener('click', () => {
    window.location.href = '/loan-list';
});

document.getElementById("manageUserButton").addEventListener("click", () => {
    const userOptionsMenu = document.getElementById("userOptionsMenu");
    userOptionsMenu.classList.toggle("hidden-button");
});

// Abrir o modal de Update User
document.getElementById("updateUserButton").addEventListener("click", () => {
    document.getElementById("updateUserModal").classList.remove("hidden-modal");
});

// Fechar o modal
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("updateUserModal").classList.add("hidden-modal");
});

// Enviar dados do formulário para o backend
document.getElementById("updateUserForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obtém os valores dos campos
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const oldUser = JSON.parse(localStorage.getItem('user'));

    // Realiza a requisição PUT
    fetch(`/user/${oldUser.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => {
        if (response.ok) {
            alert("User updated successfully!");
            document.getElementById("updateUserModal").classList.add("hidden-modal");
            
        } else {
            alert("Failed to update user.");
        }
    })
    .catch(error => {
        console.error("Error updating user:", error);
    });
});

// Abrir o modal de Update User
document.getElementById("deleteUserButton").addEventListener("click", () => {
    const user = JSON.parse(localStorage.getItem('user'));

    fetch(`/user/${user.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    })
    .then(response => {
        if (response.ok) {
            alert("User deleted successfully!");
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/';            
        } else {
            alert("Failed to delete user.");
        }
    })
    .catch(error => {
        console.error("Error deleting user:", error);
    });
});
