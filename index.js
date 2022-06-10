const express = require('express');
const path = require('path');
require('dotenv').config(); //Establecer las variables de entorno de .env

//App de Express
const app = express(); //Nuestra aplicacion express

//Node Server
const server = require('http').createServer(app); //Se crea nuestro servidor
module.exports.io = require('socket.io')(server); //Exporto la variable io al socket io 
//Arriba lado derecho se anexa nuestar aplicacion de sockets
require('./sockets/socket'); //para llamar al metodo en ese archivo

//Path publico
const publicPath = path.resolve(__dirname, 'public'); //Apuntamos a la carpeta public local


app.use(express.static(publicPath));

server.listen(process.env.PORT, (err) => {
    
    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto!!', process.env.PORT);
});