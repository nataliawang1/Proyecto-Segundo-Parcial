/* Función: convertir_de_JSON_a_Objeto
   Descripción: Recibe la dirección del  JSON, lo obtiene mediante fetch y devuelve su contenido*/
export async function convertir_de_JSON_a_Objeto(direccion_archivo) {
  const datos = await fetch(direccion_archivo); // Obtiene el archivo JSON desde la URL 
  const objeto = await datos.json(); // Convierte el contenido JSON a un objeto Java
  return objeto; // Retorna el objeto
}

/* Función: convertir_de_Objeto_a_JSON
   Descripción: Recibe un objeto JavaScript y lo convierte a una cadena JSON  */
export function convertir_de_Objeto_a_JSON(objeto) {
  return JSON.stringify(objeto, null, 2); 
}
