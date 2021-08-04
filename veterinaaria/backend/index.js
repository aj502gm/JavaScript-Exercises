const httpSe = require('http');
const urlSe = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const enrutador = require('./enrutador');
const recursos = require('./recursos');

//INSTANCIA DEL SERVER
const server = httpSe.createServer(require('./handler'));


server.listen(8000, () => console.log('Server is now working'));