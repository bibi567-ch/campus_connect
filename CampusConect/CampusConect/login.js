document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email.endsWith("@universidaddelsur.edu.bo")) {
    Swal.fire("Correo inválido", "Debes usar tu correo institucional.", "error");
    return;
  }

  if (!isValidPassword(password)) {
    Swal.fire("Contraseña débil", "Debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo.", "error");
    return;
  }

  localStorage.setItem("loggedUser", email);
  window.location.href = "index.html#dashboard";
});

function isValidPassword(pass) {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(pass);
}