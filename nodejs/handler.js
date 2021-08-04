const httpSe = require('http');
const urlSe = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const enrutador = require('./enrutador');
const recursos = require('./recursos');
module.exports = ((req,res)=>{
    // 1. URL
    const urlAct = req.url;
    const urlParse = urlSe.parse(urlAct,true);
    
    //2. RUTA
    const ruta = urlParse.pathname; //<- ruta actual

    //3. quitar slash
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g, '');
    //3.1 OBTENER HTTP
    const metodo = req.method.toLowerCase();
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    //3.1.1 SOLUCION A CORS
    if(metodo === 'options'){
        res.writeHead(200);
        res.end();
        return; //PARA EVITAR SEGUIR HACIENDO EL CÓDIGO DE ABAJO 
    }
    //console.log(metodo);
    //3.2 obtener variables del query ?
    const { query = {} } = urlParse;
    //console.log(query);
    //3.3 obtener headers
    const { headers } = req;
   // console.log(headers); //<-host, connection, cache, 
    //3.4 obtener payload (mensajes)
    const decoder = new stringDecoder('utf-8');
    let buffer = '';
    req.on("data", (data2) => {
        buffer += decoder.write(data2); //stream a string decodificar
        console.log("EVENTO DATA BUFFER");
    });
    req.on('end', () => {
        buffer += decoder.end(); //stream a string decodificar
        //console.log('Buffer: {' , buffer , '}');
        if(headers["content-type"]=== 'application/json'){
            buffer = JSON.parse(buffer);
            //console.log("Si es JSON");
        }

       
        if(rutaLimpia.indexOf("/") > -1){
            var [rutaPrincipal, indice] = rutaLimpia.split('/');
        }
        const data = {
            indice,
            ruta: rutaPrincipal || rutaLimpia,
            query,
            metodo,
            headers,
            payload: buffer
        };
        //3.6 handler
        let handler;
       // console.log('Algo :' , enrutador[data.ruta][metodo]);
        if(data.ruta && enrutador[data.ruta] && enrutador[data.ruta][metodo]){
            handler = enrutador[data.ruta][metodo];
        }else handler = enrutador.error;

        if(typeof handler === 'function'){
            handler(data, (status = 200, message) => {
                const response = JSON.stringify(message);
                res.setHeader('Content-Type', "application/json");
                res.writeHead(status);
                console.log({ data })
                res.end(response);
            });
        }
    });
    
});
