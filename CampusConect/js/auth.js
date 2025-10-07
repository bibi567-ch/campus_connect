// Sistema de autenticación
function inicializarAuth() {
  $('#loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = $('#email').value.trim();
    const password = $('#password').value;
    
    // Validación de correo institucional
    if (!email.endsWith('@universidaddelsur.edu.bo')) {
      Swal.fire('Correo inválido', 'Debes usar tu correo institucional (@universidaddelsur.edu.bo)', 'error');
      return;
    }
    
    // Validación de contraseña
    if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)) {
      Swal.fire('Contraseña débil', 'Mín 8 chars, 1 mayúsc, 1 número y 1 símbolo', 'error');
      return;
    }
    
    // Login exitoso - MOSTRAR MENSAJE Y LUEGO NAVEGAR
    Swal.fire({
      title: '¡Éxito!',
      text: 'Inicio de sesión correcto',
      icon: 'success',
      confirmButtonText: 'Continuar',
      timer: 2000,
      timerProgressBar: true
    }).then((result) => {
      localStorage.setItem('user', email);
      mostrarDashboard();
    });
  });
}

function mostrarDashboard() {
  cambiarPagina('dashPage');
  inicializarDashboard();
}

function logout() {
  localStorage.clear();
  location.reload();
}