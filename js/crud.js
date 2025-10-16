/* Función: obtener_datos_formulario
   Descripción: Obtiene los datos del formulario, valida los campos y agrega un nuevo videojuego a la lista de videojuegos. */
const obtener_datos_formulario = (event) => {
    console.log("funcion para obtener datos");

    const datos_formulario = new FormData(formulario); // Lee todos los campos del formulario
    const datos = Object.fromEntries(datos_formulario.entries()); // Convierte los datos del formulario en un objeto

    try {
        if (!datos.titulo || !datos.descripcion) { // Valida que se hayan ingresado título y descripción
            throw new Error('No se han ingresado los datos en el formulario');
        }

        // Agrega un nuevo videojuego a la lista
        videojuegos.push(new Videojuego(
            videojuegos.length + 1, datos.titulo, datos.descripcion
        ));

        // Si hay videojuegos en la lista, muestra el último agregado
        if (videojuegos.length >= 0) {
            const ultimo_videojuego = videojuegos[videojuegos.length - 1];
            crearElementoVista(ultimo_videojuego.titulo, ultimo_videojuego.descripcion);
        }

        // Llama a la función para eliminar (nota: la lógica de id aquí necesita revisión)
        eliminar_videojuego(videojuegos.length);

    } catch (error) {
        // Muestra mensaje de error en pantalla
        document.querySelector("#mensaje_error").hidden = false;
        document.querySelector("#mensaje_error").textContent = error.message;
    }
};

/* Función: eliminar_videojuego
   Descripción: Recibe un id y elimina el videojuego correspondiente de la lista. */
function eliminar_videojuego(id) {
    // Filtra el videojuego que coincida con el id
    const videojuego_a_eliminar = videojuegos.filter(videojuego => videojuego.id === id);

    try {
        if (!videojuego_a_eliminar) { // Si no existe el juego, lanza error
            throw new Error('No se puede eliminar el juego, ya que no existe');
        }

        // Aquí debería implementarse la lógica correcta para eliminar usando splice
        videojuegos.splice(); // Nota: falta definir índice y cantidad para borrar
        console.log('puedo eliminar el juego');
    } catch (error) {
        console.log(error);
    }
}

/* Función: crearElementoVista
   Descripción: Crea un elemento HTML para mostrar un videojuego con título, descripción y botones de acción. */
export const crearElementoVista = (titulo_videojuego, descripcion_videojuego) => {
    const elemento = document.createElement('div'); // Contenedor principal
    elemento.classList.add("elemento-lista-juegos"); // Clase CSS

    const titulo = document.createElement('h1'); // Elemento para el título
    titulo.textContent = titulo_videojuego;

    const descripcion = document.createElement('p'); // Elemento para la descripción
    descripcion.textContent = descripcion_videojuego;

    const boton_editar = document.createElement('button'); // Botón de editar
    boton_editar.classList.add('editar');
    boton_editar.textContent = 'Editar';

    const boton_eliminar = document.createElement('button'); // Botón de eliminar
    boton_eliminar.classList.add('eliminar');
    boton_eliminar.textContent = 'Eliminar';

    // Agrega todos los elementos al contenedor principal
    elemento.appendChild(titulo);
    elemento.appendChild(descripcion);
    elemento.appendChild(boton_editar);
    elemento.appendChild(boton_eliminar);

    // Inserta el contenedor en el DOM
    contenedor_elementos.appendChild(elemento);
};

// Evento para agregar un videojuego al presionar el botón
document.querySelector("#boton_agregar").addEventListener('click', () => {
    obtener_datos_formulario();
});
