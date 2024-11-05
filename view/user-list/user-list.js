window.onload = async function() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Por favor, faça login para acessar esta página.');
        window.location.href = '/';
        return;
    }

    try {
        const response = await fetch('/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Passando o token no cabeçalho
            }
        });

        const data = await response.json();

        if (data.status) {
            const usersBody = document.getElementById('usersBody');
            data.users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                `;
                usersBody.appendChild(row);
            });
        } else {
            alert(data.msg || 'Erro ao buscar usuários.');
        }
    } catch (error) {
        console.error('Erro na requisição de listagem de usuários:', error);
        alert('Erro ao buscar usuários. Tente novamente mais tarde.');
    }
};

// Logout function
document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = '/home';
});
