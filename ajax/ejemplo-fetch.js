//console.log("Working");
const ulList = document.getElementById("listado");
const btn = document.getElementById("boton");
let usuarios = [];



function render(){
   //const list = usuarios;
   let renderStr = usuarios.map(user =>`<li>${user.nombre}</li>`).join("");
   console.log(renderStr);
   ulList.innerHTML = renderStr;
}

//var xml = new XMLHttpRequest();
//xml.addEventListener("load", resListener);


function traerDatos(){
    const datos = {nombre: "aj"}
    fetch("https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios",{
        method: "POST",
        headers: {"Content-Type":"application/json", },
        body: JSON.stringify(datos),
    })
    .then((response)=>response.json())
    .then((respuestaJSON)=>{
        console.log("Respuesta JSON:",respuestaJSON);
            fetch("https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios")
            .then(response => response.json())
            .then(userResponse => {
                //response.json();
                console.log("Respuesta usuarios: ", userResponse); 
                usuarios = userResponse;
                 
                render();
            }); //DEFAULT PETICIÓN GET
           
    })
    .catch((error)=>{console.log("error")});   
}

btn.onclick = traerDatos;