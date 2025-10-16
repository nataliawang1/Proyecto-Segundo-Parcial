/* Clase: GestorVideojuegos
   Descripción: Gestiona una lista de videojuegos, permitiendo cargar, agregar, obtener, actualizar y eliminar videojuegos. */
export class GestorVideojuegos {
  /* Constructor: Inicializa la lista de videojuegos y el videojuego seleccionado */
  constructor() {
    this.listaVideojuego = null; // Lista que contendrá los videojuegos
    this.videojuegoSleccionado = null; // Referencia al videojuego actualmente seleccionado (si aplica)
  }

  /* Método: CargarListaVideojuegos
     Descripción: Carga un arreglo de videojuegos en la lista interna */
  CargarListaVideojuegos(arreglo_videojuegos) {
    try {
      if (!Array.isArray(arreglo_videojuegos)) 
        throw new Error('La lista proporcionada no es válida'); // Valida que sea un arreglo
      this.listaVideojuego = [...arreglo_videojuegos]; // Copia los videojuegos a la lista interna
    } catch (error) {
      return error; // Retorna el error si ocurre
    }
  }

  /* Método: AgregarNuevoVideojuego
     Descripción: Agrega un nuevo videojuego a la lista, asignando un id automáticamente si no se proporciona */
  AgregarNuevoVideojuego(videojuego) {
    try {
      if (!this.listaVideojuego) throw new Error('La lista de videojuegos no ha sido inicializada');
      if (!videojuego) throw new Error('El videojuego enviado es nulo');

      const { id, titulo, descripcion, plataforma } = videojuego;
      if (!titulo || !descripcion || !plataforma) 
        throw new Error('Alguno de los datos es nulo');

      // Calcula el nuevo ID si no se proporciona
      const nuevoId = (id !== undefined && id !== null)
        ? Number(id)
        : (this.listaVideojuego.length ? Math.max(...this.listaVideojuego.map(v => v.id)) + 1 : 1);

      const nuevo = {
        id: nuevoId,
        titulo: String(titulo).trim(),
        descripcion: String(descripcion).trim(),
        plataforma: String(plataforma).trim()
      };

      this.listaVideojuego.push(nuevo); // Agrega el nuevo videojuego a la lista
      return nuevo; // Retorna el videojuego agregado
    } catch (error) {
      return error;
    }
  }

  /* Método: ObtenerListaDeVideojuegos
     Descripción: Retorna la lista completa de videojuegos */
  ObtenerListaDeVideojuegos() {
    try {
      if (!this.listaVideojuego) throw new Error('La lista de videojuegos no ha sido inicializada');
      return this.listaVideojuego;
    } catch (error) {
      return error;
    }
  }

  /* Método: ObtenerVideojuegoPorID
     Descripción: Retorna un videojuego específico por su ID */
  ObtenerVideojuegoPorID(id) {
    try {
      if (!this.listaVideojuego) throw new Error('La lista de videojuegos no ha sido inicializada');
      if (id === undefined || id === null) throw new Error('El id es requerido');

      const videojuego = this.listaVideojuego.find(videojuego => videojuego.id === Number(id));
      if (!videojuego) throw new Error(`No se encontró un videojuego con el id: ${id}`);

      return videojuego;
    } catch (error) {
      return error;
    }
  }

  /* Método: ActualizarDatosVideojuego
     Descripción: Actualiza los datos de un videojuego existente por su ID */
  ActualizarDatosVideojuego(id, videojuego_actualizado) {
    try {
      if (!this.listaVideojuego) throw new Error('No se ha inicializado la lista de videojuegos');
      if (id === undefined || id === null) throw new Error('El id es requerido');
      if (!videojuego_actualizado) throw new Error('No se han enviado datos para actualizar');

      // Busca el índice del videojuego a actualizar
      const indice = this.listaVideojuego.findIndex(videojuego => videojuego.id === Number(id));
      if (indice === -1) throw new Error('No se ha encontrado el ID en la lista de videojuegos');

      const actual = this.listaVideojuego[indice];

      // Construye el objeto actualizado conservando datos existentes si no se proporcionan
      const actualizado = {
        ...actual,
        ...(videojuego_actualizado.titulo !== undefined ? { titulo: String(videojuego_actualizado.titulo).trim() } : {}),
        ...(videojuego_actualizado.descripcion !== undefined ? { descripcion: String(videojuego_actualizado.descripcion).trim() } : {}),
        ...(videojuego_actualizado.plataforma !== undefined ? { plataforma: String(videojuego_actualizado.plataforma).trim() } : {}),
      };

      if (!actualizado.titulo || !actualizado.descripcion || !actualizado.plataforma)
        throw new Error('Los campos no pueden quedar vacíos');

      this.listaVideojuego[indice] = actualizado; // Reemplaza el videojuego en la lista
      return actualizado; // Retorna el videojuego actualizado
    } catch (error) {
      return error;
    }
  }

  /* Método: EliminarVideojuegoPorID
     Descripción: Elimina un videojuego de la lista por su ID */
  EliminarVideojuegoPorID(id) {
    try {
      if (!this.listaVideojuego) throw new Error('No se ha cargado la lista de videojuegos');
      if (id === undefined || id === null) throw new Error('El id es requerido');

      const indice = this.listaVideojuego.findIndex(videojuego => videojuego.id === Number(id));
      if (indice === -1) throw new Error(`No se ha encontrado el elemento con el ID: ${id}`);

      const [eliminado] = this.listaVideojuego.splice(indice, 1); // Elimina el elemento usando splice
      return eliminado; // Retorna el videojuego eliminado
    } catch (error) {
      return error;
    }
  }
}
