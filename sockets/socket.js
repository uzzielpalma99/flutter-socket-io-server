const {io} = require('../index');


//Mensajes de sockets
io.on('connection', client => {
    console.log('cliente conectado');

    client.on('disconnect', () => { 
        console.log('Cliente desconenctado');
    }); //Callback cuando el cliente de desconecte
    
    client.on('mensaje', (payload) => {//Escuchamos al cliente, su emnsaje
        console.log('Mensaje', payload);

        io.emit('mensaje', {admin: 'Nuevo mensaje'});
    });

  });
