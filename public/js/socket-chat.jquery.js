let param = (new URL(document.location)).searchParams;
/*if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('El nombre de usuario y sala es necesario');
}*/
var divUsr = $('#divUsuarios');
var titulo = $('#titulo');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var usuario = param.get('nombre');
var sala = param.get('sala');
var divChatbox = $('#divChatbox');
//funciones renderiza usuarios
function renderizarUsuarios(personas) {
    var html = '';
    html = '<li>';
    html += '<a href="javascript:void(0)" class="active"> ' + param.get('sala') + ' </span></a>';
    html += '</li>';
    for (i = 0; i < personas.length; i++) {
        html += '<li>';
        html += ' <a data-id = ' +
            personas[i].id + ' href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span> ' + personas[i].name + '<small class="text-success">online</small></span></a>';
        html += '</li>';
    }
    divUsr.html(html);
    titulo.text('Sala de chat ' + param.get('sala'));
    console.log(titulo);

}

// listener
divUsr.on('click', 'a', function() {
    var id = $(this).data('id');
    if (!id) {
        return;
    }

});


function renderizarMensajes(mensaje, propio) {

    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ' ' + fecha.getMinutes();
    var html = '';
    var adminClass = 'info';
    if (mensaje.name === 'Admin') {
        adminClass = 'danger';
    }
    if (propio) {

        html += '<li class="reverse">';
        html += '<div class="chat-content">';
        html += '    <h5> ' + mensaje.name + '</h5>';
        html += '<div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '</div>';
        html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>'
        html += '<div class="chat-time">' + hora + '</div>';
        html += '</li>';

    } else {
        html += '<li class="animated fadeIn">';
        if (mensaje.name !== 'Admin') {
            html += '   <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }
        html += '   <div class="chat-content">';
        html += '       <h5>' + mensaje.name + '</h5>';
        html += '       <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje;
        html += '       </div>';
        html += '   </div>';
        html += '   <div class="chat-time">' + hora + '</div>';
        html += '</li>';
    };

    divChatbox.append(html);
}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}


formEnviar.on('submit', function(e) {
    e.preventDefault();
    if (txtMensaje.val().trim().length == 0) {
        return;
    }
    // Enviar información
    socket.emit('enviarMensaje', {
        usuario: usuario,
        mensaje: txtMensaje.val()
    }, function(mensaje) {
        txtMensaje.val("").focus();
        renderizarMensajes(mensaje, true);
        scrollBottom();
    });

});