// 网络通信
//根据API的多个事件进行重新封装
//重写HTTP类
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TcpWebSocket = (function () {
    //server为服务器地址，port为监听端口号，obj为Map对象
    function TcpWebSocket(server, port, map) {
        if (map === void 0) { map = null; }
        //Map对象
        this.map = null;
        //是否连接服务器成功标志
        this.isConnect = false;
        //临时保存的待发送数据
        this.wait = new Array();
        this.webSocket = new egret.WebSocket();
        if (map !== null) {
            this.map = map;
        }
        //设置传输类型默认值
        this.webSocket.type = egret.WebSocket.TYPE_STRING;
        //监听接收服务器数据事件
        this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        //监听服务器连接事件
        this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
        this.webSocket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        //添加异常侦听，出现异常会调用此方法
        this.webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        //连接服务器
        this.webSocket.connect(server, port);
    }
    //发送数据
    TcpWebSocket.prototype.send = function (msg) {
        if (msg === void 0) { msg = "Connect~"; }
        if (this.isConnect === false) {
            this.wait.push(msg); //如果未连接成功，则暂时保存待发送数据
        }
        else {
            console.log("发送数据：" + msg);
            this.webSocket.writeUTF(msg);
        }
    };
    //webSocket连接成功
    TcpWebSocket.prototype.onSocketOpen = function () {
        console.log("连接服务器成功!!!");
        this.isConnect = true;
        for (var i = 0; i < this.wait.length; i++) {
            this.send(this.wait[i]);
        }
        //清除输出缓冲（一般数据传输异常是flush的问题）
        this.webSocket.flush();
    };
    //webSocket接收数据
    TcpWebSocket.prototype.onReceiveMessage = function (e) {
        var msg = this.webSocket.readUTF();
        console.log("收到数据：" + msg);
        if (this.map !== null) {
            this.map.receiveServerMsg(msg);
        }
    };
    //webSocket关闭处理函数
    TcpWebSocket.prototype.onSocketClose = function () {
        console.log("服务器连接关闭!!!");
        if (this.map !== null) {
            this.map.onSocketClose();
        }
    };
    //webSocket异常事件
    TcpWebSocket.prototype.onSocketError = function () {
        console.log("服务器连接异常!!!");
        if (this.map !== null) {
            this.map.onSocketError();
        }
    };
    return TcpWebSocket;
}());
__reflect(TcpWebSocket.prototype, "TcpWebSocket");
//# sourceMappingURL=TcpWebSocket.js.map