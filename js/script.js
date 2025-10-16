// URL de la API de ejemplo
const url = "https://jsonplaceholder.typicode.com/posts";

// Datos que se enviarán en la petición POST
const datos_enviar = {
    title: 'Post 1',
    body: 'contenido del post',
    userId: 1
};

/* Función: peticionFetchGet
   Descripción: Realiza una petición GET a la URL proporcionada y retorna los datos como objeto JSON */
async function peticionFetchGet(url) {
    try {
        const respuesta = await fetch(url); // Espera la respuesta de la petición GET
        if(!respuesta.ok){ // Verifica si hubo algún error HTTP
            throw new Error('Error HTTP: ' + respuesta.status);
        }
        const datos = await respuesta.json(); // Convierte la respuesta a JSON
        return datos; // Retorna los datos obtenidos
    }
    catch(error) {
        return error; // Retorna el error si ocurre
    }
}

/* Función: peticionFetchPost
   Descripción: Realiza una petición POST enviando datos a la URL y retorna la respuesta en JSON */
async function peticionFetchPost(url, datos_a_enviar){
    try{
        const respuesta = await fetch(url, {
            method: 'POST', // Método HTTP POST
            headers: {
                'Content-Type': 'application/json' // Tipo de contenido JSON
            },
            body: JSON.stringify(datos_a_enviar) // Convierte los datos a JSON para enviar
        });

        if(!respuesta.ok){ // Verifica si hubo algún error HTTP
            throw new Error('Error HTTP: ' + respuesta.status);
        }

        const datos = await respuesta.json(); // Convierte la respuesta a JSON
        return datos; // Retorna los datos obtenidos
    }
    catch(error){
        return error; // Retorna el error si ocurre
    }
}

// Uso de la función GET con promesas
peticionFetchGet(url)
.then(respuesta => {
    // Itera sobre cada elemento y lo muestra en consola
    respuesta.forEach(element => {
        console.log(element)
    });
})
.catch(error => {
    console.log(error); // Muestra error si ocurre
});

// Uso de la función POST con promesas
peticionFetchPost(url, datos_enviar)
.then(datos => {
    console.log(datos); // Muestra la respuesta del POST en consola
})
.catch(error => {
    console.log(error); // Muestra error si ocurre
});
