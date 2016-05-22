'use strict';
import Socket from 'socket.io-client'
import Notification from '../component/Notification'
export default (actions)=> {

    class ChartClient {
        constructor() {
            this.state = {};
            this.actions = actions;
            this.socket = undefined;
            this.socketMap = {};
            this._init();
        }

        _init() {
            let connected = false;
            let userInfo = {
                userAvatar: "https://striker.teambition.net/thumbnail/110gde961faa89851691d0ea5dd81eb8e419/w/200/h/200",
                userName: "游客",
                id: this._getUuid()
            };

            this.socket = Socket.connect("http://127.0.0.1:3000");

            this.state = {connected, userInfo};

            this._setSocketMap();
            this._listenSocket();
            this._attachEvent();
        }

        _setSocketMap() {

            this.socketMap = {
                "updateUserNumber":"updateUserNumber",

                "sendNewMessage": "new.message.send",
                "getNewMessage": "new.message.get",

                "newUserConnected": "new.user.connected",
                "newUserLogin": "new.user.login",
                "loginSuccess": "new.user.loginSuccess",
                "touristLogin":"new.tourist.login"
            };

        }

        _listenSocket() {
            let {connected,userInfo} =this.state;
            const socket = this.socket;
            const socketMap = this.socketMap;

            socket.on(socketMap.newUserConnected, ()=> {
                Notification.info("欢迎进入Socket.io Chart !\n 请登录",()=>{
                    let userName = window.prompt("请输入您的板牙名");
                    if (userName) {
                        userInfo.userName = userName;
                        userInfo.id=this._getUuid();
                        socket.emit(socketMap.newUserLogin, userInfo);
                    }else {
                        Notification.err("尚未输入板鸭名称~");
                        socket.emit(socketMap.touristLogin,userInfo)
                    }
                });
            });
            //更新用户数量
            socket.on(socketMap.updateUserNumber,(data)=>{
                this._actionsUpdateUserNumber(data);
            });

            //用户登录成功
            socket.on(socketMap.loginSuccess, ({user})=> {
                connected = true;
                Notification.success(`欢迎板牙:${user.userName}`)
            });
            //通知他人有用户登录成功
            socket.on(socketMap.newUserLogin, ({user})=> {
                Notification.info(`有新的板牙进入聊天室,欢迎${user.userName}`,null,2500)
            });

            //用户获得新消息
            socket.on(socketMap.getNewMessage, (data)=> {
                data.chatSenderType="others";
                data.userInfo && (data.userInfo.id == this.state.userInfo.id) && (data.chatSenderType="mine");
                this._actionsGetNewMessage(data);
            });
        }

        /**
         * 更新用户数量
         * @param online
         * @param tourist
         * @returns {*}
         * @private
         */
        _actionsUpdateUserNumber(data){
            return this._dispatch("updateUserNumber", data);
        }

        /**
         * actions.getNewMessage
         * @param data
         * @returns {*}
         * @private
         */
        _actionsGetNewMessage(data) {
            return this._dispatch("getNewMessage", data);
        }

        /**
         * 统一 actions dispatch
         * @param type
         * @param data
         * @returns {*}
         * @private
         */
        _dispatch(type, data) {
            return this.actions[type] && this.actions[type](data)
        }

        /**
         * javascript版本的uuid
         * @returns {string}
         * @private
         */
        _getUuid() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        /**
         *  format Date
         * @param date
         * @param fmt
         * @returns {*}
         * @private
         */
        _formatDate(date, fmt){
            var o = {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt))
                fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        }

        _attachEvent() {

            //用户发送新消息
            const submitForm = document.querySelector(".sendMessage");
            const input = submitForm.querySelector('input[type="text"]');

            const socket = this.socket;
            const socketMap = this.socketMap;

            let {userInfo}=this.state;


            submitForm.addEventListener('submit', ()=> {

                let detail = input.value;
                let date = new Date();

                socket.emit(socketMap.sendNewMessage, {userInfo, detail, time:{date:date,dataFormat:this._formatDate(date,"yyyy-MM-dd hh:mm:ss")}});
                input.value = "";

            }, false);
        }

    }
    return ChartClient;
}