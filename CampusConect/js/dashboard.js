// js/dashboard.js - LÓGICA DEL DASHBOARD
function inicializarDashboard() {
    const userEmail = localStorage.getItem('user');
    if (!userEmail) {
        window.location.reload();
        return;
    }
    
    $('#userWelcome').textContent = `Hola, ${userEmail.split('@')[0]}`;
    
    // Verificar si es administrador
    if (rolesConfig.esAdministrador(userEmail) || rolesConfig.tienePermiso(userEmail, 'crear_eventos')) {
        $('#adminPanel').classList.remove('hidden');
        $('#panelAdmin').classList.remove('hidden');
    }
    
    // Inicializar sistemas modulares
    SistemaEventos.eventos = cargar('eventos', []);
    SistemaForo.preguntas = cargar('foroPreguntas', []);
    SistemaNotificaciones.notificaciones = cargar('notificaciones', []);
    
    // Cargar datos del dashboard
    cargarEventos();
    cargarActividadReciente();
    cargarMisGrupos();
    cargarPreguntasForo();
    actualizarBadges();
    actualizarUserInfo();
    actualizarStats();
    
    setInterval(actualizarStats, 30000);
}

function actualizarStats() {
    const userEmail = localStorage.getItem('user');
    
    const eventosProximos = SistemaEventos.obtenerProximos().length;
    $('#statEvents').textContent = eventosProximos;
    
    const misGrupos = SistemaGrupos.grupos.filter(g => 
        SistemaGrupos.membresias[g.id]?.includes(userEmail)
    ).length;
    $('#statGroups').textContent = misGrupos;
    
    const notificacionesNoLeidas = SistemaNotificaciones.obtenerNoLeidas().length;
    $('#statNotifications').textContent = notificacionesNoLeidas;
    
    $('#statQuestions').textContent = SistemaForo.preguntas.length;
}

function actualizarUserInfo() {
    const userEmail = localStorage.getItem('user');
    const userName = userEmail.split('@')[0];
    
    $('#userName').textContent = userName;
    $('#userEmail').textContent = userEmail;
    $('#userAvatar').textContent = userName.charAt(0).toUpperCase();
    
    const notificacionesNoLeidas = SistemaNotificaciones.obtenerNoLeidas().length;
    const notificationDot = $('#notificationDot');
    if (notificacionesNoLeidas > 0) {
        notificationDot.style.display = 'block';
    } else {
        notificationDot.style.display = 'none';
    }
}

function mostrarTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.nav-tab').forEach(tab => tab.classList.remove('active'));
    
    $('#tab-'+tabName).classList.add('active');
    document.querySelectorAll('.nav-tab').forEach(tab => {
        if (tab.textContent.toLowerCase().includes(tabName)) tab.classList.add('active');
    });
}

function cargarActividadReciente() {
    const contenedor = $('#actividadReciente');
    contenedor.innerHTML = '';
    
    const actividad = [
        ...SistemaEventos.obtenerProximos().slice(0, 2).map(e => ({
            tipo: 'evento',
            titulo: e.titulo,
            fecha: e.fecha,
            descripcion: `Nuevo evento: ${e.titulo}`,
            icono: '📅'
        })),
        ...SistemaForo.preguntas.slice(0, 3).map(p => ({
            tipo: 'pregunta',
            titulo: p.titulo,
            fecha: p.fecha,
            descripcion: `Nueva pregunta: ${p.titulo}`,
            icono: '💬'
        }))
    ];
    
    actividad.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    
    if (actividad.length === 0) {
        contenedor.innerHTML = '<p>No hay actividad reciente.</p>';
        return;
    }
    
    actividad.slice(0, 5).forEach(item => {
        const elemento = document.createElement('div');
        elemento.className = 'evento-card';
        elemento.innerHTML = `
            <h4>${item.icono} ${item.titulo}</h4>
            <div class="evento-meta">
                <strong>Fecha:</strong> ${new Date(item.fecha).toLocaleString()}
            </div>
            <p>${item.descripcion}</p>
        `;
        contenedor.appendChild(elemento);
    });
}

function cargarMisGrupos() {
    const contenedor = $('#misGrupos');
    const userEmail = localStorage.getItem('user');
    contenedor.innerHTML = '';
    
    const misGrupos = SistemaGrupos.grupos.filter(grupo => 
        SistemaGrupos.membresias[grupo.id]?.includes(userEmail)
    );
    
    if (misGrupos.length === 0) {
        contenedor.innerHTML = '<p>Aún no formas parte de ningún grupo.</p>';
        return;
    }
    
    misGrupos.forEach(grupo => {
        const elemento = document.createElement('div');
        elemento.className = 'evento-card';
        elemento.innerHTML = `
            <h4>${grupo.nombre}</h4>
            <p><strong>Tema:</strong> ${grupo.tema}</p>
            <p>${grupo.descripcion}</p>
            <div class="evento-acciones">
                <button class="btn btn-small" onclick="ingresarGrupo('${grupo.id}')">Abrir Grupo</button>
            </div>
        `;
        contenedor.appendChild(elemento);
    });
}

function cargarPreguntasForo() {
    const contenedor = $('#listaPreguntas');
    contenedor.innerHTML = '';
    
    if (SistemaForo.preguntas.length === 0) {
        contenedor.innerHTML = '<p>Aún no hay preguntas en el foro.</p>';
        return;
    }
    
    SistemaForo.preguntas.slice(0, 10).forEach(pregunta => {
        const elemento = document.createElement('div');
        elemento.className = 'evento-card';
        elemento.innerHTML = `
            <h4>${pregunta.titulo}</h4>
            <div class="evento-meta">
                <strong>Por:</strong> ${pregunta.autor} | 
                <strong>Fecha:</strong> ${new Date(pregunta.fecha).toLocaleString()} | 
                <strong>Categoría:</strong> ${pregunta.categoria}
            </div>
            <p>${pregunta.cuerpo.substring(0, 100)}...</p>
            <div class="evento-acciones">
                <button class="btn btn-small" onclick="verPregunta('${pregunta.id}')">Ver Respuestas</button>
                <span>${pregunta.respuestas.length} respuestas</span>
                ${pregunta.resuelta ? '<span style="color:green;">✓ Resuelta</span>' : ''}
            </div>
        `;
        contenedor.appendChild(elemento);
    });
}

function actualizarBadges() {
    const userEmail = localStorage.getItem('user');
    
    const eventosProximos = SistemaEventos.obtenerProximos();
    $('#badgeEventos').textContent = eventosProximos.length;
    $('#badgeEventos').style.display = eventosProximos.length > 0 ? 'inline' : 'none';
    
    SistemaNotificaciones.actualizarUI();
    
    const misGrupos = SistemaGrupos.grupos.filter(g => 
        SistemaGrupos.membresias[g.id]?.includes(userEmail)
    );
    $('#badgeGrupos').textContent = misGrupos.length;
    $('#badgeGrupos').style.display = misGrupos.length > 0 ? 'inline' : 'none';
}

function abrirModalNuevaPregunta() {
    $('#modalPregunta').classList.remove('hidden');
}

function cerrarModalNuevaPregunta() {
    $('#modalPregunta').classList.add('hidden');
    $('#nuevaPreguntaForm').reset();
}