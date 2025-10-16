/* Clase: Videojuego
   Descripción: Representa un videojuego con id, título y descripción, y permite mostrar sus datos en consola. */
export class Videojuego {
  /* Constructor: Inicializa un nuevo videojuego con id, título y descripción */
  constructor(id, titulo, descripcion) {
    this.id = id; // Identificador único del videojuego
    this.titulo = titulo; // Título del videojuego
    this.descripcion = descripcion; // Descripción del videojuego
  }

  /* Método: mostrarDatos
     Descripción: Muestra en consola los datos del videojuego en un formato legible */
  mostrarDatos() {
    console.log(
      'Juego ', this.titulo,        // Muestra el título del juego
      ', con el id: ', this.id,    // Muestra el id del juego
      ', se trata de ', this.descripcion // Muestra la descripción del juego
    );
  }
}
