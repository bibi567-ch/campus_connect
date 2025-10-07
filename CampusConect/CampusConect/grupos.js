const grupos = JSON.parse(localStorage.getItem("grupos")) || [];
const membresias = JSON.parse(localStorage.getItem("membresias")) || {}; // {grupoIndex: [usuarios]}

function renderGrupos(filtro = "") {
  const lista = document.getElementById("listaGrupos");
  lista.innerHTML = "";
  const user = localStorage.getItem("loggedUser");

  const filtrados = grupos.filter(g =>
    g.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    g.tema.toLowerCase().includes(filtro.toLowerCase())
  );

  filtrados.forEach((g, i) => {
    const esMiembro = (membresias[i] || []).includes(user);
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${g.nombre}</strong> - ${g.tema}<br/>
        <small>${g.descripcion}</small><br/>
        <em>${g.privado ? "Privado" : "Público"}</em>
      </div>
      <div>
        ${esMiembro
          ? `<button onclick="ingresarGrupo(${i})">Ingresar</button>`
          : `<button onclick="unirse(${i})">Unirse</button>`}
        ${g.creador === user ? `<button onclick="eliminarGrupo(${i})">Eliminar</button>` : ""}
      </div>
    `;
    lista.appendChild(li);
  });
}

function unirse(index) {
  const user = localStorage.getItem("loggedUser");
  if (!membresias[index]) membresias[index] = [];
  if (membresias[index].includes(user)) {
    Swal.fire("Ya eres miembro", "", "info");
    return;
  }
  membresias[index].push(user);
  localStorage.setItem("membresias", JSON.stringify(membresias));
  Swal.fire("¡Bienvenido!", "Ahora formas parte del grupo.", "success").then(() => {
    renderGrupos();
  });
}

function ingresarGrupo(index) {
  localStorage.setItem("grupoActual", index);
  window.location.href = "grupo-interno.html";
}