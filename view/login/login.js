// Função para alternar entre os formulários de login e registro
function toggleForms(showLogin) {
    document.querySelectorAll('.form-wrapper').forEach(wrapper => wrapper.classList.remove('active'));
    if (showLogin) {
        document.getElementById('loginForm').parentElement.classList.add('active');
    } else {
        document.getElementById('registerWrapper').classList.add('active');
    }
}

// Configurações de evento para troca de formulário
document.getElementById('showRegister').addEventListener('click', () => toggleForms(false));
document.getElementById('showLogin').addEventListener('click', () => toggleForms(true));

// Inicializa o formulário de login como ativo
toggleForms(true);

// Função de validação do formulário de login
function validateLoginForm(email, password) {
    if (!email || !password) {
        alert("Por favor, preencha ambos os campos.");
        return false;
    }
    return true;
}

// Evento de envio do formulário de login
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!validateLoginForm(email, password)) return;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.status) {
            localStorage.setItem('token', data.token);
            alert('Login bem-sucedido!');
            window.location.href = '/home';
        } else {
            alert(data.msg || 'Erro no login.');
        }
    } catch (error) {
        console.error('Erro na requisição de login:', error);
        alert('Erro na requisição de login. Tente novamente mais tarde.');
    }
});

// Função de validação do formulário de registro
function validateRegisterForm(name, email, password) {
    if (!name || !email || !password) {
        alert("Por favor, preencha todos os campos.");
        return false;
    }
    return true;
}

// Evento de envio do formulário de registro
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('emailRegister').value.trim();
    const password = document.getElementById('passwordRegister').value.trim();

    if (!validateRegisterForm(name, email, password)) return;

    try {
        const response = await fetch('/user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (data.status) {
            alert('Registro bem-sucedido! Você será redirecionado para o login.');
            toggleForms(true); // Alterna para o formulário de login
        } else {
            alert(data.msg || 'Erro no registro.');
        }
    } catch (error) {
        console.error('Erro na requisição de registro:', error);
        alert('Erro na requisição de registro. Tente novamente mais tarde.');
    }
});