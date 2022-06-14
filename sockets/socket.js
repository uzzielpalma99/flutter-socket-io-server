const {io} = require('../index');

const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Heroes del Silencio'));
bands.addBand(new Band('Metallica'));

//Mensajes de sockets
io.on('connection', client => {
    console.log('cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { 
        console.log('Cliente desconenctado');
    }); //Callback cuando el cliente de desconecte
    
    client.on('mensaje', (payload) => {//Escuchamos al cliente, su mensaje
        console.log('Mensaje', payload);
        io.emit('mensaje', {admin: 'Nuevo mensaje'});
    });

    client.on('vote-band', (payload) => {
        
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    
    });

    client.on('add-band', (payload) => {
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    
    });

    client.on('delete-band', (payload) => {
        bands.deleteBands(payload.id)
        io.emit('active-bands', bands.getBands());
    });


    // client.on('emitir-mensaje', (payload) => { //Escuchamos al cliente, su emitir-mensaje
    //     // io.emit('nuevo-mensaje', payload); //Emite a todos los clientes conectados
    //     // console.log(payload);
    //     client.broadcast.emit('nuevo-mensaje', payload); //Emite a todos menos el que lo emitio

    // });

  });
