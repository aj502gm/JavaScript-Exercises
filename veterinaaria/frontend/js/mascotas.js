/*PENDIENTE
    MOSTRAR MENSAJES DE ERROR EN CASO QUE EL SERVIDOR ESTÉ APAGADO
    MASCOTAS NO DISPONIBLES 
*/
const form = document.getElementById("formMascota");
let nombreMascota = document.getElementById("nombreMascota");
let edadMascota = document.getElementById("edadMascota");
let modoForm = document.getElementById("exampleModalLabel");
let btnEnviar = document.getElementById('enviarDatos');
let indexNumber = document.getElementById('indice');
const urlPrincipal = 'https://veterinaria-back.now.sh/mascotas';

let listadoMascotas = [];

async function listarMascotas(){
    try{
        const respuesta = await fetch(urlPrincipal)//GET
        const mascotaServer = await respuesta.json();
        if(Array.isArray(mascotaServer)){
            listadoMascotas = mascotaServer;
        }
        if(listadoMascotas.length > 0){
            let renderHtml = listadoMascotas.map((mascota,index)=>
            `<tr>
                <th scope = "row" id= 'indexN'>${index}</th>
                <td>${mascota.nombre}</td>
                <td>${mascota.edad}</td>
                <td> 
                    <button type="button" class="btn btn-warning editar" data-bs-toggle="modal"  data-bs-target="#exampleModal">Editar</button>
                    <button type = "button" class = "btn btn-danger eliminar">Eliminar</button>
                </td>
            </tr>`
             ).join("")
            document.getElementById("tablaMascotas").innerHTML = renderHtml;
            Array.from(document.getElementsByClassName("editar")).forEach((btn, index) => btn.onclick = indiceEditar(index));
            Array.from(document.getElementsByClassName('eliminar')).forEach((btn,index) => btn.onclick = eliminarMascota(index));
            return;
        }
    }catch(error){

    }
}
function eliminarMascota(index){
    const urlBorrar =  `${urlPrincipal}/${index}`; 
    return async function eliminarElemento(){
        try{
            const respuesta = await fetch(urlBorrar,{
                method: "DELETE"
            });
           if(respuesta.ok){
                listarMascotas();
           }
        }catch(error){
            console.log(error);
        }
    }
}
function indiceEditar(index){
    return function edicion(){
        btnEnviar.innerHTML = "Editar";
        const mascotaEditar = listadoMascotas[index];
        nombreMascota.value = mascotaEditar.nombre;
        edadMascota.value = mascotaEditar.edad;
        indice.value = index;
        console.log('indice: ' , index)
    }
}

listarMascotas();
async function enviar(event){
    try{
        event.preventDefault();
        const nombreAccion = btnEnviar.innerHTML;
        const nuevaMascota = {
            nombre: nombreMascota.value,
            edad: edadMascota.value,
        }
        let urlEnvio = urlPrincipal;
        let method = "POST";
        if(nombreAccion === 'Editar'){
            method = "PUT"
            listadoMascotas[indice.value] = nuevaMascota;
            urlEnvio =  `${urlPrincipal}/${indice.value}`;
        }
       
        const response = await fetch(urlEnvio,{
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevaMascota),
            mode: 'cors',
        });
        if(response.ok){
            listarMascotas();      
        }
    }catch(error){
        console.log( { error} );
    }
}
form.onsubmit = enviar;