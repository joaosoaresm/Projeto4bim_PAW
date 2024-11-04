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

document.getElementById('listUsersButton').addEventListener('click', () => {
    window.location.href = '/user-list';
});