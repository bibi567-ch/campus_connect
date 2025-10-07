// storage.js - Nuevo archivo para gestión de datos
const SistemaAlmacenamiento = {
    hacerBackup: function() {
        const datos = {
            usuarios: JSON.parse(localStorage.getItem('usuarios') || '{}'),
            grupos: JSON.parse(localStorage.getItem('grupos') || '[]'),
            eventos: JSON.parse(localStorage.getItem('eventos') || '[]'),
            foro: JSON.parse(localStorage.getItem('foroPreguntas') || '[]'),
            timestamp: new Date().toISOString()
        };
        
        // Descargar como archivo
        const blob = new Blob([JSON.stringify(datos, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup_campusconnect_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
    },
    
    limpiarDatos: function() {
        if (confirm('¿Estás seguro de querer limpiar todos los datos? Esto no se puede deshacer.')) {
            localStorage.clear();
            location.reload();
        }
    }
};