const BuscadorGlobal = {
    buscar: function(termino) {
        const resultados = {
            eventos: SistemaEventos.eventos.filter(e => 
                e.titulo.toLowerCase().includes(termino) ||
                e.descripcion.toLowerCase().includes(termino)
            ),
            grupos: SistemaGrupos.grupos.filter(g =>
                g.nombre.toLowerCase().includes(termino) ||
                g.tema.toLowerCase().includes(termino)
            ),
            preguntas: SistemaForo.preguntas.filter(p =>
                p.titulo.toLowerCase().includes(termino) ||
                p.cuerpo.toLowerCase().includes(termino)
            )
        };
        
        return resultados;
    },
    
    mostrarResultados: function(resultados) {
        // Implementar interfaz de resultados de búsqueda
    }
};