// Mostrar frase aleatoria según tema
function mostrarFraseSegunTema(tema) {
  const frases = frasesPorTema[tema];
  const fraseElemento = document.getElementById("fraseDelDía");

  if (frases && frases.length > 0) {
    const aleatoria = frases[Math.floor(Math.random() * frases.length)];
    fraseElemento.textContent = `"${aleatoria}"`;
  } else {
    fraseElemento.textContent = "Hoy es un buen día para reflexionar y escuchar al corazón.";
  }
}

// Cambiar tema visual y mostrar nueva frase
function cambiarTema() {
  const tema = document.getElementById("temaSelector").value;
  document.body.className = `tema-${tema}`;
  mostrarFraseSegunTema(tema);
}

// Guardar reflexión y tema
function guardarDatos() {
  localStorage.setItem("reflexion", document.getElementById("reflexionTexto").value);
  localStorage.setItem("tema", document.getElementById("temaSelector").value);
  alert("Reflexión guardada 🙏");
}

// Función de acordeón
function activarAcordeon() {
  const acordeones = document.getElementsByClassName("acordeon-btn");
  for (let i = 0; i < acordeones.length; i++) {
    acordeones[i].addEventListener("click", function () {
      this.classList.toggle("activo");
      const panel = this.nextElementSibling;
      panel.style.display = panel.style.display === "block" ? "none" : "block";
    });
  }
}

// Inicialización al cargar la página
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("reflexionTexto").value = localStorage.getItem("reflexion") || "";
  document.getElementById("temaSelector").value = localStorage.getItem("tema") || "presencia";
  cambiarTema();
  activarAcordeon();
});

document.getElementById("modoNoche").onclick = () => {
  document.body.classList.toggle("modo-oscuro");
};

// Mostrar solo una sección del panel central a la vez
function mostrarSeccion(id) {
  const secciones = [
    "panelReflexion",
    "oracionSeccion",
    "lecturaSeccion",
    "meditacionSeccion",
    "accionSeccion"
  ];

  secciones.forEach(seccionId => {
    const seccion = document.getElementById(seccionId);
    if (seccionId === id) {
      seccion.classList.remove("seccion-oculta");
      seccion.classList.add("seccion-activa");
    } else {
      seccion.classList.add("seccion-oculta");
      seccion.classList.remove("seccion-activa");
    }
  });

  if (id !== "meditacionSeccion" && window.respiracionInterval) {
    clearInterval(window.respiracionInterval);
    window.respiracionInterval = null;
  }
}

// Secciones específicas
function irALectura() {
  mostrarSeccion("lecturaSeccion");
}

function irAOracion() {
  mostrarSeccion("oracionSeccion");
  document.getElementById("oracionDelDia").textContent =
    "Padre celestial, gracias por este nuevo amanecer. Guíame en tu luz y verdad.";
}

function irAMeditacion() {
  mostrarSeccion("meditacionSeccion");
  iniciarAnimacionRespiracion();
}

function irAAccion() {
  mostrarSeccion("accionSeccion");
  nuevaAccion();
}

function volver() {
  mostrarSeccion("panelReflexion");
}

// Guardar oración personal
function guardarOracionPersonal() {
  const oracion = document.getElementById("oracionPersonal").value;
  localStorage.setItem("oracionPersonal", oracion);
  alert("Tu oración ha sido guardada 🙏");
}

// Citas por libro
const citasBiblicas = {
  salmos: "El Señor es mi pastor, nada me faltará. – Salmo 23:1",
  proverbios: "Confía en el Señor con todo tu corazón. – Proverbios 3:5",
  mateo: "Bienaventurados los que tienen hambre y sed de justicia. – Mateo 5:6",
  juan: "Yo soy el camino, la verdad y la vida. – Juan 14:6",
  romanos: "Todo lo puedo en Cristo que me fortalece. – Romanos 8:28"
};

function mostrarCita() {
  const libro = document.getElementById("libroBiblia").value;
  const cita = citasBiblicas[libro] || "";
  document.getElementById("citaBiblica").textContent = cita;
}

// Meditación guiada
function iniciarAnimacionRespiracion() {
  const guia = document.getElementById("guiaRespiracion");
  let estado = "Inhala";
  window.respiracionInterval = setInterval(() => {
    estado = estado === "Inhala" ? "Exhala" : "Inhala";
    guia.textContent = estado;
  }, 3000);
}

// Acciones con propósito
const accionesPosibles = [
  "Escucha con atención a alguien sin interrumpir.",
  "Da las gracias sinceramente a alguien hoy.",
  "Haz algo bueno por alguien sin decir que fuiste tú.",
  "Escribe un mensaje positivo a alguien que no esperaría recibirlo.",
  "Dedica 10 minutos a estar en silencio y observar.",
  "Regala algo que ya no usas pero puede servir a otro.",
  "Ora por alguien que te cuesta amar.",
  "Haz una tarea del hogar sin que te lo pidan.",
  "Sonríe a 3 personas, incluso a desconocidos.",
  "Deja el celular por 1 hora para estar presente."
];

function nuevaAccion() {
  const aleatoria = accionesPosibles[Math.floor(Math.random() * accionesPosibles.length)];
  document.getElementById("accionDelDia").textContent = aleatoria;
}

const virtudes = [
  {
    nombre: "Paciencia",
    definicion: "Aceptar el tiempo de los procesos con calma.",
    desafio: "Hoy, respira antes de responder en una situación incómoda."
  },
  {
    nombre: "Fe",
    definicion: "Confiar incluso sin ver.",
    desafio: "Recuerda algo que te ha sostenido en momentos difíciles."
  },
  {
    nombre: "Perdón",
    definicion: "Soltar la carga del resentimiento.",
    desafio: "Piensa en alguien a quien podrías perdonar hoy, incluso en tu interior."
  },
  {
    nombre: "Generosidad",
    definicion: "Dar sin esperar a cambio.",
    desafio: "Haz algo bueno en secreto por otra persona hoy."
  },
  {
    nombre: "Gratitud",
    definicion: "Reconocer el valor de lo que tienes.",
    desafio: "Escribe 3 cosas por las que estás agradecido hoy."
  },
  {
    nombre: "Humildad",
    definicion: "Aceptar nuestras limitaciones con amor.",
    desafio: "Escucha con atención sin necesidad de responder de inmediato."
  }
];

function mostrarVirtud() {
  const aleatoria = virtudes[Math.floor(Math.random() * virtudes.length)];
  const texto = document.getElementById("virtudTexto");

  if (texto) {
    texto.innerHTML = `
      <strong>${aleatoria.nombre}</strong><br>
      <em>${aleatoria.definicion}</em><br>
      <span style="color:#555;">Desafío: ${aleatoria.desafio}</span>
    `;
    localStorage.setItem("virtudDelDia", JSON.stringify(aleatoria));
  }
}

const versiculosProposito = [
  "“Porque yo sé los planes que tengo para ustedes” – Jeremías 29:11",
  "“Cada uno según el don que ha recibido…” – 1 Pedro 4:10",
  "“Pon en manos del Señor todas tus obras…” – Proverbios 16:3",
  "“Todo lo que hagan, háganlo de corazón…” – Colosenses 3:23"
];

const inspiracionPorHabilidad = {
  musica: "🎵 David tocaba el arpa para calmar el espíritu de Saúl. Tu música puede traer paz.",
  escuchar: "👂 Escuchar con amor es una forma poderosa de sanar. Sé esa presencia para otros.",
  deportes: "🏃‍♂️ La perseverancia en el deporte refleja la carrera de la fe. ¡No te detengas!",
  escribir: "✍️ Como los autores bíblicos, tus palabras pueden inspirar y transformar.",
  servir: "👐 Jesús sirvió con humildad. Tu servicio puede ser un reflejo de Su amor."
};

function mostrarInspiracion() {
  const habilidad = document.getElementById("habilidadUsuario").value;
  const texto = inspiracionPorHabilidad[habilidad] || "";
  document.getElementById("inspiracionHabilidad").textContent = texto;
}

// Mostrar un versículo del propósito al cargar
window.addEventListener("DOMContentLoaded", () => {
  const random = versiculosProposito[Math.floor(Math.random() * versiculosProposito.length)];
  document.getElementById("versiculoProposito").textContent = random;
});



