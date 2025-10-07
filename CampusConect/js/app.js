// js/app.js - CON DIAGNÓSTICO
console.log('🔧 app.js cargado');
// Archivo principal que inicializa toda la aplicación
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar sistemas
  inicializarAuth();
  inicializarTema();
  
  // Verificar si ya está logueado
  if (localStorage.getItem('user')) {
    mostrarDashboard();
  }
});

// Hacer las funciones globales disponibles
window.mostrarDashboard = mostrarDashboard;
window.logout = logout;
  // Configurar navegación global
  window.mostrarGrupos = function() {
    cambiarPagina('gruposPage');
    renderGrupos();
  };
  
  window.mostrarDash = function() {
    cambiarPagina('dashPage');
  };
  
  // Funciones modales
  window.abrirModalNuevaPregunta = function() {
    $('#modalPregunta').classList.remove('hidden');
  };
  
  window.cerrarModalNuevaPregunta = function() {
    $('#modalPregunta').classList.add('hidden');
    $('#nuevaPreguntaForm').reset();
  };
;
// Selector simple
const $ = q => document.querySelector(q);

function cambiar(pagina) {
    console.log('🔧 Cambiando página a:', pagina.id);
    document.querySelectorAll('.page').forEach(x => {
        x.classList.remove('active');
        console.log('🔧 Removiendo active de:', x.id);
    });
    pagina.classList.add('active');
    console.log('🔧 Agregando active a:', pagina.id);
}

// Hacer la función global
window.mostrarDash = function() {
    console.log('🔧 Ejecutando mostrarDash()');
    const dashPage = $('#dashPage');
    console.log('🔧 dashPage encontrado:', dashPage);
    
    if (dashPage) {
        cambiar(dashPage);
        console.log('🔧 Dashboard activado');
        
        // Inicializar dashboard si existe
        if (typeof inicializarDashboard === 'function') {
            console.log('🔧 Inicializando dashboard...');
            inicializarDashboard();
        } else {
            console.log('❌ inicializarDashboard no es una función');
        }
    } else {
        console.log('❌ dashPage no encontrado');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 DOM Content Loaded en app.js');
    
    // Verificar si ya está logueado
    const user = localStorage.getItem('user');
    console.log('🔧 User en localStorage:', user);
    
    if (user) {
        console.log('🔧 Usuario encontrado, mostrando dashboard');
        mostrarDash();
    } else {
        console.log('🔧 No hay usuario, mostrando login');
        const loginPage = $('#loginPage');
        if (loginPage) {
            cambiar(loginPage);
        } else {
            console.log('❌ loginPage no encontrado');
        }
    }
});

// Funciones básicas para otros módulos
function guardar(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function cargar(key, def = []) {
    return JSON.parse(localStorage.getItem(key)) || def;
}

// Funciones globales
window.mostrarGrupos = function() {
    console.log('Mostrando grupos...');
    cambiar($('#gruposPage'));
}

window.logout = function() {
    localStorage.removeItem('user');
    location.reload();
}

window.mostrarTab = function(tabName) {
    console.log('Cambiando tab a:', tabName);
}

window.abrirModalNuevaPregunta = function() {
    console.log('Abriendo modal...');
}

window.cerrarModalNuevaPregunta = function() {
    console.log('Cerrando modal...');
}