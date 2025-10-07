// foro.js - Completamente renovado
const SistemaForo = {
    preguntas: JSON.parse(localStorage.getItem('foroPreguntas')) || [],
    
    crearPregunta: function(titulo, cuerpo, autor, categoria = 'general') {
        const pregunta = {
            id: 'pregunta_' + Date.now(),
            titulo,
            cuerpo,
            autor,
            categoria,
            fecha: new Date().toISOString(),
            respuestas: [],
            votos: 0,
            etiquetas: [],
            resuelta: false
        };
        
        this.preguntas.unshift(pregunta);
        this.guardar();
        return pregunta;
    },
    
    responderPregunta: function(preguntaId, respuesta, autor) {
        const pregunta = this.preguntas.find(p => p.id === preguntaId);
        if (pregunta) {
            pregunta.respuestas.push({
                id: 'respuesta_' + Date.now(),
                contenido: respuesta,
                autor,
                fecha: new Date().toISOString(),
                votos: 0,
                esSolucion: false
            });
            this.guardar();
            return true;
        }
        return false;
    },
    
    marcarComoSolucion: function(preguntaId, respuestaId) {
        const pregunta = this.preguntas.find(p => p.id === preguntaId);
        if (pregunta) {
            pregunta.respuestas.forEach(r => r.esSolucion = false);
            const respuesta = pregunta.respuestas.find(r => r.id === respuestaId);
            if (respuesta) {
                respuesta.esSolucion = true;
                pregunta.resuelta = true;
                this.guardar();
                return true;
            }
        }
        return false;
    },
    
    guardar: function() {
        localStorage.setItem('foroPreguntas', JSON.stringify(this.preguntas));
    }
};