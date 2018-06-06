var socketio = require('socket.io');
module.exports = {
    listen: function(app,connections){
        io = socketio.listen(app);

        io.sockets.on('connection', function(socket) {
            socket.on('userid', function(userid) {
                //console.log('test:'+userid);
                connections[userid] = socket;

            });
        });
        return io;
    },
    emitEvent:function(socket, event,data){
            socket.emit(event,data);
    }
};