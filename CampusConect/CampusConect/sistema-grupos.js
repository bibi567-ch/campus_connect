const SistemaGrupos = {
    grupos: JSON.parse(localStorage.getItem('grupos')) || [],
    membresias: JSON.parse(localStorage.getItem('membresias')) || {},
    
    crearGrupo: function(nombre, tema, descripcion, esPrivado, creador) {
        const grupo = {
            id: 'grupo_' + Date.now(),
            nombre,
            tema,
            descripcion,
            privado: esPrivado,
            creador,
            fechaCreacion: new Date().toISOString(),
            maxMiembros: esPrivado ? 20 : 50
        };
        
        this.grupos.push(grupo);
        this.membresias[grupo.id] = [creador];
        this.guardar();
        
        return grupo;
    },
    
    buscarGrupos: function(termino, filtros = {}) {
        return this.grupos.filter(grupo => {
            const coincideTexto = grupo.nombre.toLowerCase().includes(termino.toLowerCase()) ||
                                grupo.tema.toLowerCase().includes(termino.toLowerCase());
            
            const coincideFiltro = (!filtros.privacidad || grupo.privado === (filtros.privacidad === 'privado'));
            
            return coincideTexto && coincideFiltro;
        });
    },
    
    unirseGrupo: function(grupoId, usuario) {
        if (!this.membresias[grupoId]) {
            this.membresias[grupoId] = [];
        }
        
        if (this.membresias[grupoId].includes(usuario)) {
            return false; // Ya es miembro
        }
        
        const grupo = this.grupos.find(g => g.id === grupoId);
        if (grupo && this.membresias[grupoId].length < grupo.maxMiembros) {
            this.membresias[grupoId].push(usuario);
            this.guardar();
            return true;
        }
        
        return false;
    },
    
    expulsarMiembro: function(grupoId, miembro, expulsadoPor) {
        if (rolesConfig.tienePermiso(expulsadoPor, 'gestionar_grupos')) {
            const miembros = this.membresias[grupoId];
            if (miembros) {
                this.membresias[grupoId] = miembros.filter(m => m !== miembro);
                this.guardar();
                return true;
            }
        }
        return false;
    },
    
    guardar: function() {
        localStorage.setItem('grupos', JSON.stringify(this.grupos));
        localStorage.setItem('membresias', JSON.stringify(this.membresias));
    }
};