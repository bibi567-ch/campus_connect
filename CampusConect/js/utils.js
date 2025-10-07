// js/utils.js - FUNCIONES UTILITARIAS
const $ = q => document.querySelector(q);

function cambiar(pagina) {
    document.querySelectorAll('.page').forEach(x => x.classList.remove('active'));
    pagina.classList.add('active');
}

function guardar(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function cargar(key, def = []) {
    return JSON.parse(localStorage.getItem(key)) || def;
}

// Validación de email institucional
function validarEmailInstitucional(email) {
    return email.endsWith('@universidaddelsur.edu.bo');
}

// Validación de contraseña segura
function validarPasswordSegura(password) {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
}

// Sistema de notificaciones
const SistemaNotificaciones = {
    notificaciones: JSON.parse(localStorage.getItem('notificaciones')) || [],
    
    agregar: function(titulo, mensaje, tipo = 'info', url = null) {
        const notificacion = {
            id: Date.now(),
            titulo,
            mensaje,
            tipo,
            url,
            fecha: new Date().toISOString(),
            leida: false
        };
        
        this.notificaciones.unshift(notificacion);
        this.guardar();
        this.actualizarUI();
    },
    
    marcarLeida: function(id) {
        const notif = this.notificaciones.find(n => n.id === id);
        if (notif) notif.leida = true;
        this.guardar();
        this.actualizarUI();
    },
    
    obtenerNoLeidas: function() {
        return this.notificaciones.filter(n => !n.leida);
    },
    
    actualizarUI: function() {
        const badge = document.getElementById('badgeNotificaciones');
        const dot = document.getElementById('notificationDot');
        
        if (badge) {
            const noLeidas = this.obtenerNoLeidas().length;
            badge.textContent = noLeidas;
            badge.style.display = noLeidas > 0 ? 'inline' : 'none';
        }
        
        if (dot) {
            const noLeidas = this.obtenerNoLeidas().length;
            dot.style.display = noLeidas > 0 ? 'block' : 'none';
        }
    },
    
    guardar: function() {
        localStorage.setItem('notificaciones', JSON.stringify(this.notificaciones));
    }
};