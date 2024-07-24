let menuVisible = false;

const elementosBanderas = document.getElementById("banderas");
const TextosACambiar = document.querySelectorAll("[data-section]");
const enlaceCV = document.getElementById("enlaceCV");

// Variable global para almacenar los textos
let textosGlobales = {};

// Función para actualizar el contenido basado en la traducción
const actualizarContenido = () => {
    TextosACambiar.forEach(elemento => {
        const section = elemento.dataset.section;
        const value = elemento.dataset.value;

        if (textosGlobales[section] && textosGlobales[section][value]) {
            elemento.innerHTML = textosGlobales[section][value];
        } else {
            console.warn(`No se encontró el texto para ${section}:${value}`);
        }
    });
};

// Función para actualizar el contenido del elemento y sus hijos
const actualizarContenidoRecursivo = (elemento) => {
    const section = elemento.dataset.section;
    const value = elemento.dataset.value;

    if (textosGlobales[section] && textosGlobales[section][value]) {
        elemento.innerHTML = textosGlobales[section][value];
    }

    // Actualiza recursivamente todos los hijos que tengan data-section
    Array.from(elemento.children).forEach(child => {
        if (child.dataset.section) {
            actualizarContenidoRecursivo(child);
        }
    });
};

const CambiarIdioma = async (language) => {
    try {
        const requestJson = await fetch(`./languages/${language}.json`);
        textosGlobales = await requestJson.json();
        console.log('Texto cargado:', textosGlobales);  // Para depuración

        // Actualiza todos los textos
        TextosACambiar.forEach(elemento => {
            actualizarContenidoRecursivo(elemento);
        });

        // Cambiar la URL del CV basado en el idioma
        if (language === 'es') {
            enlaceCV.href = 'Documentos/CV_es.pdf';
        } else if (language === 'en') {
            enlaceCV.href = 'Documentos/CV_en.pdf';
        }

        console.log('URL del CV:', enlaceCV.href);
    } catch (error) {
        console.error('Error al cambiar el idioma:', error);
    }
};

elementosBanderas.addEventListener("click", (e) => {
    const language = e.target.closest('.itemBanderas').dataset.language;
    if (language) {
        console.log('Idioma seleccionado:', language);  // Para depuración
        CambiarIdioma(language);
    }
});

// Función que oculta o muestra el menu
function mostrarOcultarMenu() {
    if (menuVisible) {
        document.getElementById("nav").classList = "";
        menuVisible = false;
    } else {
        document.getElementById("nav").classList = "responsive";
        menuVisible = true;
    }
}

function seleccionar() {
    // Oculto el menú una vez que selecciono una opción
    document.getElementById("nav").classList = "";
    menuVisible = false;
}

// Función que aplica las animaciones de las habilidades
function efectoHabilidades() {
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    if (distancia_skills >= 300) {
        let habilidades = document.getElementsByClassName("progreso");
        habilidades[0].classList.add("javascript");
        habilidades[1].classList.add("htmlcss");
        habilidades[2].classList.add("python");
        habilidades[3].classList.add("wordpress");
        habilidades[4].classList.add("drupal");
        habilidades[5].classList.add("comunicacion");
        habilidades[6].classList.add("trabajo");
        habilidades[7].classList.add("creatividad");
        habilidades[8].classList.add("dedicacion");
        habilidades[9].classList.add("proyect");
        // Agregar la habilidad y el nombre de la clase en el CSS
        habilidades[10].classList.add("supapito");
    }
}

// Detecto el scrolling para aplicar la animación de la barra de habilidades
window.onscroll = function () {
    efectoHabilidades();
}
