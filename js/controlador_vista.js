/* Función: crearTarjeta
   Descripción: Crea un elemento HTML que representa un videojuego, con título, descripción, plataforma y botones de acción (Editar y Eliminar). */
export function crearTarjeta(videojuego, handlers) {
  const { id, titulo, descripcion, plataforma } = videojuego; // Desestructuración de los datos del videojuego

  const card = document.createElement('div'); // Contenedor principal de la tarjeta
  card.classList.add('elemento-lista-juegos'); 
  card.dataset.id = String(id); // Guarda el ID del videojuego en un atributo data-id

  const h2 = document.createElement('h2'); 
  h2.textContent = titulo; // Asigna el texto del título

  const p = document.createElement('p'); 
  p.textContent = descripcion; // Asigna el texto de la descripción

  const plataformaTag = document.createElement('span'); // Etiqueta de la plataforma
  plataformaTag.classList.add('plataforma'); // Clase CSS para la plataforma
  plataformaTag.textContent = plataforma; // Texto con la plataforma

  const acciones = document.createElement('div'); // Contenedor para los botones
  acciones.classList.add('acciones'); // Clase CSS para los botones

  const btnEditar = document.createElement('button'); // Botón de editar
  btnEditar.classList.add('editar'); // Clase CSS para el botón
  btnEditar.textContent = 'Editar'; // Texto del botón
  btnEditar.addEventListener('click', () => handlers.onEditar(id)); // Evento para editar el videojuego

  const btnEliminar = document.createElement('button'); // Botón de eliminar
  btnEliminar.classList.add('eliminar'); // Clase CSS para el botón
  btnEliminar.textContent = 'Eliminar'; // Texto del botón
  btnEliminar.addEventListener('click', () => handlers.onEliminar(id)); // Evento para eliminar el videojuego

  acciones.appendChild(btnEditar); // Añade botón editar al contenedor de acciones
  acciones.appendChild(btnEliminar); // Añade botón eliminar al contenedor de acciones

  card.appendChild(h2); 
  card.appendChild(plataformaTag); // Añade plataforma a la tarjeta
  card.appendChild(p); // Añade descripción a la tarjeta
  card.appendChild(acciones); // Añade acciones a la tarjeta

  return card; // Retorna la tarjeta completa
}

/* Función: renderLista
   Descripción: Limpia un contenedor y agrega una lista de tarjetas de videojuegos al DOM. */
export function renderLista(contenedor, lista, handlers) {
  limpiarContenedor(contenedor); // Limpia el contenedor antes de renderizar
  lista.forEach(v => {
    const tarjeta = crearTarjeta(v, handlers); // Crea una tarjeta para cada videojuego
    contenedor.appendChild(tarjeta); // Añade la tarjeta al contenedor
  });
}

/* Función: limpiarContenedor
   Descripción: Elimina todos los elementos hijos de un contenedor dado. */
export function limpiarContenedor(contenedor) {
  while (contenedor.firstChild) contenedor.removeChild(contenedor.firstChild); // Elimina cada hijo hasta que el contenedor quede vacío
}

/* Función: mostrarMensaje
   Descripción: Muestra un mensaje en pantalla, ya sea de error o de estado, ocultando el mensaje contrario. */
export function mostrarMensaje(tipo, texto) {
  const msgError = document.querySelector('#mensaje_error'); // Selecciona el elemento de mensaje de error
  const msgEstado = document.querySelector('#mensaje_estado'); // Selecciona el elemento de mensaje de estado
  if (!msgError || !msgEstado) return; // Si no existen los elementos, no hace nada

  msgError.hidden = true; // Oculta el mensaje de error
  msgEstado.hidden = true; // Oculta el mensaje de estado
  msgError.textContent = ''; // Limpia texto de error
  msgEstado.textContent = ''; // Limpia texto de estado

  if (tipo === 'error') {
    msgError.textContent = texto; // Asigna el texto de error
    msgError.hidden = false; // Muestra el mensaje de error
  } else {
    msgEstado.textContent = texto; // Asigna el texto de estado
    msgEstado.hidden = false; // Muestra el mensaje de estado
  }
}
