//webSocket协议的网络连接类

class TcpWebSocket{

    //server为服务器地址，port为监听端口号，obj为Map对象
    public constructor(server:string, port:number, map:Map = null){

        this.webSocket = new egret.WebSocket();  
        if(map !== null){
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

    //Map对象
    private map:Map = null;
    //是否连接服务器成功标志
    private isConnect = false;
    //临时保存的待发送数据
    private wait:string[] = new Array();

    //发送数据
    public send(msg:string="Connect~"):void{
        if(this.isConnect === false){
            this.wait.push(msg);    //如果未连接成功，则暂时保存待发送数据
        }
        else{
            console.log("发送数据：" + msg);
            this.webSocket.writeUTF(msg);
        }
    }

    //webSocket对象
    private webSocket:egret.WebSocket;

    //webSocket连接成功
    private onSocketOpen():void {
        console.log("连接服务器成功!!!");
        this.isConnect = true;
        for(let i=0; i<this.wait.length; i++){
            this.send(this.wait[i]);
        }
        //清除输出缓冲（一般数据传输异常是flush的问题）
        this.webSocket.flush();
    }

    //webSocket接收数据
    private onReceiveMessage(e:egret.Event):void {    
        var msg = this.webSocket.readUTF();    
        console.log("收到数据：" + msg);

        if(this.map !== null){
            this.map.receiveServerMsg(msg);
        }
    }

    //webSocket关闭处理函数
    private onSocketClose():void{
        console.log("服务器连接关闭!!!");

        if(this.map !== null){
            this.map.onSocketClose();
        }
    }

    //webSocket异常事件
    private onSocketError():void{
        console.log("服务器连接异常!!!");

        if(this.map !== null){
            this.map.onSocketError();
        }
    }
}