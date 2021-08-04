//console.log("Working");
const ulList = document.getElementById("listado");
const boton = document.getElementById("boton");
function resListener(){
   const list = JSON.PARSE(this.responseText);
   const render = list.map(user => {
       `<li>${user.nombre}</li>`
   }).join("");
   ulList.innerHTML = render;
}

var xml = new XMLHttpRequest();
xml.addEventListener("load", resListener);


function traerDatos(){
    xml.open("POST",  "https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios",true );
    xml.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xml.send("nombre=ANDRES")
    setTimeout(()=>{
        xml.open("GET", "https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios");
        xml.send();
    }, 3000);
}

