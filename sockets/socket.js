const {io} = require('../index');
const{ v4 : uuidV4} = require('uuid');

const Emprendimientos = require('../models/emprendimientos');
const Emprendimiento = require('../models/emprendimiento');

const emprendimientos = new Emprendimientos();

emprendimientos.addEmprendimiento(new Emprendimiento(uuidV4(), 'Miguel González', '1. Revisar conexiones eléctricas. 2. Informar riesgos.', 'Técnicos del futuro', 'Obtener nuevo talento de comunidades rurales en tecnología', 'Chiapas'));
emprendimientos.addEmprendimiento(new Emprendimiento(uuidV4(), 'Roberto García', '1. Listar un informe de materia prima. 2 Recabacar conteo de prendas. 3. Validar costos. 4. Capacitar empleados.', 'Moda mexicana tradicional', 'Implementar industria textil con mano de obra de zonas marginadas', 'Oaxaca'));
emprendimientos.addEmprendimiento(new Emprendimiento(uuidV4(), 'Brenda Araujo', '1. Llevar un informe de plantas y flores cultivadas. 2. Solcitar pesticidas y abono. 3. Instalar 5 viveres adicionales. 4. Planificar sistema de riego.', 'Floricultores del sur', 'Implementar un mercado de plantas favoreciendonos de las condiciones amnbientales de la ciudad de méxico', 'Xochimilco y Milpa Alta'));
emprendimientos.addEmprendimiento(new Emprendimiento(uuidV4(), 'Adrián Peralta', '1. Implementar proceso de obtención de aceite de coco', 'Cosméticos naturistas', 'Popularizar el uso del aceite de coco con un producto natural en la sociedad mexicana', 'Guerrero'));

//Mensajes de sockets
io.on('connection', client => {
    console.log('cliente conectado');

    client.emit('active-emprendimientos', emprendimientos.getEmprendimientos());

    client.on('disconnect', () => { 
        console.log('Cliente desconenctado');
    }); //Callback cuando el cliente de desconecte
    
    client.on('mensaje', (payload) => {//Escuchamos al cliente, su mensaje
        console.log('Mensaje', payload);
        io.emit('mensaje', {admin: 'Nuevo mensaje'});
    });

    // client.on('vote-band', (payload) => {
        
    //     bands.voteBand(payload.id);
    //     io.emit('active-bands', bands.getBands());
    
    // });

    client.on('add-emprendimiento', (payload) => {
        const newEmprendimiento = new Emprendimiento(payload.id, payload.emprendedor, payload.actividades, payload.emprendimiento, payload.descripcion, payload.localidad);
        emprendimientos.addEmprendimiento(newEmprendimiento);
        io.emit('active-emprendimientos', emprendimientos.getEmprendimientos());
    
    });

    client.on('delete-emprendimiento', (payload) => {
        emprendimientos.deleteEmprendimientos(payload.id)
        io.emit('active-emprendimientos', emprendimientos.getEmprendimientos());
    });


    // client.on('emitir-mensaje', (payload) => { //Escuchamos al cliente, su emitir-mensaje
    //     // io.emit('nuevo-mensaje', payload); //Emite a todos los clientes conectados
    //     // console.log(payload);
    //     client.broadcast.emit('nuevo-mensaje', payload); //Emite a todos menos el que lo emitio

    // });

  });
