$.SocketIoHelper = function() {
};

$.SocketIoHelper.prototype = (function() {
	var setting = {
		number_notification: 0,
		userid: ''
	};
	var socket;
	return {
		init: function(options) {
			if (typeof options === "undefined" || options.length < 1) {
				return false;
			}
			$.extend(setting, options);
			this.initSocket();
		},
		initSocket: function() {
			socket = io();
            console.log(setting.userid);
            socket.emit('userid', setting.userid);
            socket.on('reconnect', function() {
                console.log('reconnect');
				socket.emit('userid', +setting.userid);
            });
            socket.on("disconnect", function() {
                console.log('disconnect');
            });
            socket.on('update-chat', function(message) {
				console.log('Update chat from Server');
				console.log(message);
                if((message.senderId + '-' + message.powerId) == currentChatBox) {
                    addMessageToChatStyleLeft(message.body, message.send_name, '/uploads/'+message.user_thumbnail, message.created_at, message.powerId);
                } else {
					$(".item-list-chat[data-active='" + message.senderId + '-' + message.powerId + "']").addClass('active new-message');
					$(".item-list-chat[data-active='" + message.senderId + '-' + message.powerId + "']").find('.label-new').removeClass('hide');
                    $(".item-list-chat[data-active='" + message.senderId + '-' + message.powerId + "']").find('.label-new').show();
                    setTimeout(function () {
						$(".item-list-chat[data-active='" + message.senderId + '-' + message.powerId + "']").removeClass('active');
					}, 600);
                }
            });
            socket.on('update-notification', function(data) {
                countNotify = countNotify + data;
                var currentNumber = $('#noti-badge').attr('data-number');
                currentNumber = parseInt(currentNumber) + data;
                $('#noti-badge').removeClass('hide');
                $('#noti-badge').attr('data-number', currentNumber);
                $('#noti-badge').text(currentNumber);
            });
		}

	};
}(jQuery));