const recursos = require("./recursos");
const mascotas = require("./rutas/mascotas");
module.exports = {
    ruta: (data, callback) => {
        callback(200, {message: 'Ok en ruta'}); //exito
    },
    error: (data, callback) =>{
        callback(404, {message: 'Error 404!'})
    },
    mascotas: mascotas(recursos),
};