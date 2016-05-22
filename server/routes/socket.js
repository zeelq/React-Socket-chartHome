module.exports = (app, socket)=> {
    'use strict';
    const socketRoutePrefix = "/socket";
    const socketMap = {
        "updateUserNumber": "updateUserNumber",

        "sendNewMessage": "new.message.send",
        "getNewMessage": "new.message.get",

        "newUserConnected": "new.user.connected",
        "newUserLogin": "new.user.login",
        "loginSuccess": "new.user.loginSuccess",
        "touristLogin": "new.tourist.login"
    };
    let online = 0;
    let tourist = 0;

    socket.on("connection", function (socket) {
        //有新的用户链接
        socket.emit(socketMap.newUserConnected, {});

        tourist += 1;
        socket.emit(socketMap.updateUserNumber, {online, tourist});
        socket.broadcast.emit(socketMap.updateUserNumber, {online, tourist});

        //新的用户开始登录
        socket.on(socketMap.newUserLogin, (user)=> {

            //缓存用户信息
            socket.userName = user.userName;
            socket.userId = user.userId;
            socket.userAvatar = user.userAvatar;

            online += 1;
            tourist -= 1;

            //广播有新的用户加入了
            socket.emit(socketMap.loginSuccess, {user, status: {online, tourist}});
            socket.broadcast.emit(socketMap.newUserLogin, {user, status: {online, tourist}});

        });

        //游客登录
        socket.on(socketMap.touristLogin, (user)=> {
            //广播有的游客加入了
            socket.broadcast.emit(socketMap.newUserLogin, {user});
        });

        //用户发送新的消息
        socket.on(socketMap.sendNewMessage, (message)=> {
            socket.broadcast.emit(socketMap.getNewMessage, message);
            socket.emit(socketMap.getNewMessage, message);
        });

        socket.on('event', (data)=> {
            console.log(`当前发送数据为：${data.toString()}`)
        });


        socket.on('disconnect', function () {
            console.log(`当前socket链接已中断`)
        });

    });


};