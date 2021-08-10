const ioLib = require('socket.io');
const { saveMsgOnDB } = require('../services');
let io;

const configure = server => {
    io = ioLib(server, {
        cors: {
            origin: ["http://localhost:3000"],
            methods: ["GET", "POST"]
        }
    });
    return io;
};

/**
 * @description Listtens for io connection and trigger events
 */
const connect = () => {
    io.on('connection', function(socket){
        console.log('a user connected');
        socket.on('chat message', function(msg){
            console.log('message: ' + msg);
            // Se eu quisesse salvar o chat no db, posso chamar uma função aqui dentro
            saveMsgOnDB(msg);
            // Emite para os usuários do io
            io.emit('send message', msg);
        });

        socket.on('disconnect', function(){
            console.log('user disconnected');
        });
    });
}

module.exports = {
    connect,
    configure,
}