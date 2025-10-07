// Configuración global y utilidades
const $ = q => document.querySelector(q);
const $$ = q => document.querySelectorAll(q);

function cambiarPagina(paginaId) {
  console.log('Cambiando a página:', paginaId); // Para debug
  document.querySelectorAll('.page').forEach(x => x.classList.remove('active'));
  $(`#${paginaId}`).classList.add('active');
}

function guardar(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function cargar(key, def = []) {
  return JSON.parse(localStorage.getItem(key)) || def;
}

// Datos globales iniciales
window.datosApp = {
  eventos: cargar('eventos', []),
  foroPreguntas: cargar('foroPreguntas', []),
  notificaciones: cargar('notificaciones', []),
  grupos: cargar('grupos', []),
  membresias: cargar('membresias', {}),
  chats: cargar('chats', {})
};

// Hacer funciones globales
window.cambiarPagina = cambiarPagina;
window.guardar = guardar;
window.cargar = cargar;