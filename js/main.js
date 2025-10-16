import { convertir_de_JSON_a_Objeto } from "./ayudad.js";
import { GestorVideojuegos } from "./gestorVideojuegos.js";
import { renderLista, mostrarMensaje } from "./controlador_vista.js";

// Elementos del DOM
const contenedor = document.querySelector('#contenedor_elementos_juegos'); // Contenedor donde se muestran los videojuegos
const formulario = document.querySelector('#formulario_agregar'); // Formulario para agregar videojuegos
const botonAgregar = document.querySelector('#boton_agregar'); // Botón de agregar

// Instancia del gestor de videojuegos
const gestor = new GestorVideojuegos();

/* Función: cargarDatos
   Descripción: Carga los datos desde un archivo JSON y los agrega al gestor de videojuegos */
async function cargarDatos() {
  try {
    const lista = await convertir_de_JSON_a_Objeto('js/videojuegos.json'); // Convierte el JSON a objeto
    gestor.CargarListaVideojuegos(lista); // Carga la lista en el gestor
  } catch (error) {
    mostrarMensaje('error', `No se pudieron cargar los datos: ${error.message}`); // Muestra mensaje de error
  }
}

/* Función: reRender
   Descripción: Renderiza la lista actual de videojuegos en el contenedor */
function reRender() {
  try {
    const lista = gestor.ObtenerListaDeVideojuegos(); // Obtiene la lista de videojuegos
    renderLista(contenedor, lista, {
      onEditar: (id) => editarVideojuego(id), // Callback para editar
      onEliminar: (id) => eliminarVideojuego(id), // Callback para eliminar
    });
  } catch (error) {
    mostrarMensaje('error', error.message);
  }
}

/* Función: leerFormulario
   Descripción: Obtiene y valida los datos del formulario, retornando un objeto con los campos */
function leerFormulario() {
  const datos = new FormData(formulario); // Lee los datos del formulario
  const titulo = (datos.get('titulo') || '').toString().trim(); // Título
  const descripcion = (datos.get('descripcion') || '').toString().trim(); // Descripción
  const plataforma = (datos.get('plataforma') || '').toString().trim(); // Plataforma

  if (!titulo || !descripcion || !plataforma) 
    throw new Error('Todos los campos son obligatorios'); // Valida que no falte ningún campo

  return { titulo, descripcion, plataforma }; // Retorna los datos del formulario
}

/* Función: limpiarFormulario
   Descripción: Limpia los campos del formulario */
function limpiarFormulario() {
  formulario.reset(); // Resetea el formulario
}

/* Función: agregarVideojuego
   Descripción: Agrega un nuevo videojuego usando los datos del formulario */
function agregarVideojuego() {
  try {
    const datos = leerFormulario(); // Obtiene los datos
    gestor.AgregarNuevoVideojuego(datos); // Agrega el videojuego al gestor
    limpiarFormulario(); // Limpia el formulario
    reRender(); // Actualiza la vista
    mostrarMensaje('exito', 'Videojuego agregado correctamente'); // Mensaje de éxito
  } catch (error) {
    mostrarMensaje('error', error.message); // Mensaje de error
  }
}

/* Función: editarVideojuego
   Descripción: Permite editar los campos de un videojuego existente */
function editarVideojuego(id) {
  try {
    const actual = gestor.ObtenerVideojuegoPorID(id); // Obtiene el videojuego por ID

    // Solicita al usuario los nuevos datos
    const nuevoTitulo = prompt('Editar título:', actual.titulo);
    if (nuevoTitulo === null) return; // Cancelar edición
    const nuevaPlataforma = prompt('Editar plataforma:', actual.plataforma);
    if (nuevaPlataforma === null) return; 
    const nuevaDescripcion = prompt('Editar descripción:', actual.descripcion);
    if (nuevaDescripcion === null) return; 

    // Actualiza el videojuego en el gestor
    const actualizada = gestor.ActualizarDatosVideojuego(id, {
      titulo: nuevoTitulo,
      plataforma: nuevaPlataforma,
      descripcion: nuevaDescripcion,
    });

    reRender(); // Re-renderiza la lista
    mostrarMensaje('exito', `Videojuego actualizado: ${actualizada.titulo}`); // Mensaje de éxito
  } catch (error) {
    mostrarMensaje('error', error.message); // Mensaje de error
  }
}

/* Función: eliminarVideojuego
   Descripción: Elimina un videojuego de la lista tras confirmación del usuario */
function eliminarVideojuego(id) {
  try {
    const confirmar = confirm('¿Deseas eliminar este videojuego?'); // Confirma acción
    if (!confirmar) return; 

    const eliminado = gestor.EliminarVideojuegoPorID(id); // Elimina el videojuego
    reRender(); // Re-renderiza la lista
    mostrarMensaje('exito', `Se eliminó: ${eliminado.titulo}`); // Mensaje de éxito
  } catch (error) {
    mostrarMensaje('error', error.message); // Mensaje de error
  }
}

/* Función: init
   Descripción: Inicializa la aplicación cargando los datos y configurando los eventos */
async function init() {
  await cargarDatos(); // Carga los datos iniciales
  reRender(); // Renderiza la lista al inicio

  // Evento para agregar videojuego al presionar el botón
  botonAgregar.addEventListener('click', (e) => {
    e.preventDefault(); // Evita el envío del formulario
    agregarVideojuego();
  });
}

// Inicializa la aplicación
init();
