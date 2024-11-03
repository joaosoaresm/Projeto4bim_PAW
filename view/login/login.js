document.getElementById('showRegister').addEventListener('click', () => {
    document.querySelector('.form-wrapper').classList.remove('active');
    document.getElementById('registerWrapper').classList.add('active');
});

document.getElementById('showLogin').addEventListener('click', () => {
    document.querySelector('.form-wrapper.active').classList.remove('active');
    document.querySelector('#loginForm').parentElement.classList.add('active');
});

// Inicialização padrão para mostrar a tela de login primeiro
document.getElementById('loginForm').parentElement.classList.add('active');

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Previne o envio padrão do formulário

    // Obtém os valores dos campos de email e senha
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Faz a requisição de login com método POST
        const response = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.status) {
            // Salva o token JWT no localStorage
            localStorage.setItem('token', data.token);
            alert('Login bem-sucedido!'); // Exibe uma mensagem de sucesso
            // Redireciona para a página principal
            window.location.href = '/dashboard';
        } else {
            // Exibe mensagem de erro caso o login falhe
            alert(data.msg || 'Erro no login.');
        }
    } catch (error) {
        console.error('Erro na requisição de login:', error);
        alert('Erro na requisição de login.');
    }
});