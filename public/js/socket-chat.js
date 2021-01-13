var socket = io();

let params = (new URL(document.location)).searchParams;
if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre de usuario y sala es necesario');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('listaUsuarios', function(data) {
    renderizarUsuarios(data.usuarios)
});

socket.on('crearMsg', function(data) {
    renderizarMensajes(data, false);
    scrollBottom();
});

socket.on('connect', function() {
    socket.emit('entrarChat', usuario, function(resp) {
        renderizarUsuarios(resp);
    });
});

// escuchar
socket.on('disconnect', function() {

});

socket.on('msgPrivado', function(msg) {
    //console.log(msg);
})