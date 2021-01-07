const { io } = require('../server');
const { Usuarios } = require('./clasess/usuarios');

const { crearMensaje } = require('../utils/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre de usuario o sala es obligatorio'
            });
        }
        client.join(data.sala);
        usuarios.addClient(client.id, data.nombre, data.sala);
        let respuesta = usuarios.getClientOnSala(data.sala);
        client.broadcast.to(data.sala).emit('crearMsg', crearMensaje('Admin', 'El usuario ' + data.nombre + ' se conecto'));
        client.broadcast.to(data.sala).emit('listaUsuarios', { usuarios: respuesta });
        callback(respuesta);

    })

    client.on('disconnect', () => {
        let clientBorrado = usuarios.delClient(client.id);
        console.log('Borrando ', clientBorrado);
        client.broadcast.to(clientBorrado.sala).emit('crearMsg', crearMensaje('Admin', 'El usuario ' + clientBorrado.name + ' se desconecto'));
        //client.broadcast.to(clientBorrado.sala).emit('listaUsuarios', { usuarios: usuarios.getClientOnSala(clientBorrado.sala) });

    });

    client.on('enviarMensaje', (data) => {
        let cliente = usuarios.getClient(client.id);
        let mensaje = crearMensaje(cliente.name, data.mensaje);
        client.broadcast.to(cliente.sala).emit('crearMsg', mensaje);
    });

    client.on('msgPrivado', (data) => {
        if (!data.destino) {
            return callback({
                error: true,
                mensaje: 'El usuario destino  es obligatorio'
            });
        }
        let cliente = usuarios.getClient(client.id);
        let mensaje = crearMensaje(cliente.name, data.mensaje);
        client.broadcast.to(data.destino).emit('crearMsg', mensaje);
    });

});