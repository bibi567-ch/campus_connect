// roles.js
const roles = {
  'estudiante@uab.edu.bo': 'estudiante',
  'admin@uab.edu.bo': 'administrador',
  'profesor@uab.edu.bo': 'profesor'
};

function obtenerRolUsuario(email) {
  return roles[email] || 'estudiante';
}

function puedeCrearEvento(email) {
  const rol = obtenerRolUsuario(email);
  return rol === 'administrador' || rol === 'profesor';
}

const rolesConfig = {
    permisos: {
        administrador: ['crear_eventos', 'eliminar_grupos', 'gestionar_usuarios'],
        profesor: ['crear_eventos', 'gestionar_grupos'],
        estudiante: ['unirse_grupos', 'participar_eventos']
    },
    
    esAdministrador: function(email) {
        return email.includes('admin') || email === 'admin@universidaddelsur.edu.bo';
    },
    
    obtenerPermisos: function(email) {
        const rol = this.esAdministrador(email) ? 'administrador' : 
                   email.includes('profesor') ? 'profesor' : 'estudiante';
        return this.permisos[rol];
    },
    
    tienePermiso: function(email, permiso) {
        return this.obtenerPermisos(email).includes(permiso);
    }
};