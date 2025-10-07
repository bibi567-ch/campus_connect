// Sistema de eventos
function cargarEventos() {
  const listaEventos = $('#listaEventos');
  listaEventos.innerHTML = '';
  
  if (datosApp.eventos.length === 0) {
    listaEventos.innerHTML = '<p>No hay eventos programados en este momento.</p>';
    return;
  }
  
  datosApp.eventos.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  
  datosApp.eventos.forEach(evento => {
    const eventoElement = document.createElement('div');
    eventoElement.className = 'evento-card';
    eventoElement.innerHTML = `
      <h4>${evento.titulo}</h4>
      <div class="evento-meta">
        <strong>Fecha:</strong> ${new Date(evento.fecha).toLocaleString()} | 
        <strong>Lugar:</strong> ${evento.lugar} | 
        <strong>Tipo:</strong> ${evento.tipo}
      </div>
      <p>${evento.descripcion}</p>
      <div class="evento-acciones">
        <button class="btn btn-small" onclick="asistirEvento('${evento.id}')">Asistiré</button>
        <button class="btn-secondary btn-small" onclick="compartirEvento('${evento.id}')">Compartir</button>
      </div>
    `;
    listaEventos.appendChild(eventoElement);
  });
}

function crearEvento(e) {
  e.preventDefault();
  
  const titulo = $('#tituloEvento').value;
  const descripcion = $('#descEvento').value;
  const fecha = $('#fechaEvento').value;
  const lugar = $('#lugarEvento').value;
  const tipo = $('#tipoEvento').value;
  
  const nuevoEvento = {
    id: Date.now().toString(),
    titulo,
    descripcion,
    fecha,
    lugar,
    tipo,
    creador: localStorage.getItem('user'),
    asistentes: []
  };
  
  datosApp.eventos.push(nuevoEvento);
  guardar('eventos', datosApp.eventos);
  
  Swal.fire('Éxito', 'Evento publicado correctamente', 'success');
  $('#crearEventoForm').reset();
  cargarEventos();
  actualizarBadges();
}