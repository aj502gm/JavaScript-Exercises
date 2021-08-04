module.exports = function mascotas(recursos) {
    return {
        get: (data, callback) =>{
            if(data.indice != undefined){
                if(recursos.mascotas[data.indice]){
                    return callback(200, recursos.mascotas[data.indice]);
                }
                return callback(404, {message: 'Error 404! Mascota desconocida'})
            }else callback(200, recursos.mascotas)
        },
        post: (data, callback) =>{
            //console.log("HANDLER" , { data });
            recursos.mascotas.push(data.payload);
            callback(201, data.payload)
    
        },
        put: (data, callback) =>{
            if(recursos.mascotas[data.indice]){
                recursos.mascotas[data.indice] = data.payload;
                return callback(200, recursos.mascotas[data.indice]);
            }
            return callback(404, {message: 'Error 404! Mascota para editar desconocida'})
        },
        delete: (data, callback) =>{
            if (typeof data.indice !== "undefined") {
                if (recursos.mascotas[data.indice]) {
                    recursos.mascotas = recursos.mascotas.filter(
                    (mascota, indice) => indice != data.indice
                );
                return callback(204, {
                    mensaje: `elemento con indice ${data.indice} eliminado`,
                });
                }
                return callback(404, {
                mensaje: `mascota con indice ${data.indice} no encontrada`,
                });
            }
            callback(400, { mensaje: "indice no enviado" });
        },
    }
    
}