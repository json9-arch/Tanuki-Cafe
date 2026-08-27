document.addEventListener("DOMContentLoaded", () => {
        const secciones = document.querySelectorAll("[data-fondo]");

        function actualizarFondo() {
            let seccionActual = null;
            let menorDistancia = Infinity;
            const centroPantalla = window.innerHeight / 2;

            secciones.forEach(seccion => {
                const rect = seccion.getBoundingClientRect();
                const centroSeccion = rect.top + (rect.height / 2);
                const distancia = Math.abs(centroPantalla - centroSeccion);

                if (distancia < menorDistancia) {
                    menorDistancia = distancia;
                    seccionActual = seccion;
                }
            });

            if (seccionActual) {
                const nuevoFondo = seccionActual.getAttribute("data-fondo");

                if (!document.body.classList.contains(nuevoFondo)) {
                    document.body.className = document.body.className
                        .split(" ")
                        .filter(c => !c.startsWith("fondo-"))
                        .join(" ");

                    document.body.classList.add(nuevoFondo);
                }
            }
        }

        // Escuchar el desplazamiento y el cambio de tamaño de pantalla
        window.addEventListener("scroll", actualizarFondo, { passive: true });
        window.addEventListener("resize", actualizarFondo, { passive: true });

        // Ejecutar una vez al cargar la página
        actualizarFondo();
    });