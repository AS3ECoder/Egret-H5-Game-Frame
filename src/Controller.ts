//控制器类
class Controller extends egret.Sprite 
{
    //控制类构造
    //className为继承View类的类名
    //skinName为EXML皮肤文件路径
    //json为资源的配置文件名
    //groupName为预加载组名
    public constructor(
            className:string, 
            skinName:string, 
            json:string = "default.res.json", 
            groupName:string = "preload"
        ){
            super();
            this.width = Common.width;
            this.height = Common.height;

            this.view = eval( "new " + className+"(\"" + skinName + "\")" );   //将view视图赋值给私有变量
            this.model = new Model(json, groupName, this.view);     //实例化模型，读取资源

            this.addChild(this.view);       //添加到控制器
            this.addChild(this.model);      //添加到控制器
    }

    //场景界面
    private view:any;
    private model:any;

    //私有函数，只有被通知切换场景才删除显示对象
    public removeUI():void{
        if( this.view ){
            this.view.removeUI();
            this.removeChild( this.view );
        }
        if( this.model ){
            this.removeChild( this.model );
        }
    }



/*--------------------------------------------------------------------------------------*/
/* 切换场景事件 */

    public map:Map;     //当Map对象添加View时被赋值
    public web:TcpWebSocket     //通信对象，当Map对象初始化时被赋值

    //添加向下通知保证路线连通事件
    public connectToView(evt:GameEvent){
        this.map = evt.target;
        this.web = evt._webSocket;

        this.addEventListener(GameEvent.CONNECT, this.view.connectToController, this.view);     //注册侦听器
        this.orderConnect();   //发送要求
        
        this.removeEventListener(GameEvent.CONNECT, this.view.connectToController, this.view);  //移除侦听器
    }

    //发送事件
    private orderConnect(){
        var daterEvent:GameEvent = new GameEvent(GameEvent.CONNECT);    //生成事件对象
        daterEvent._todo = "请求连通";    //添加对应的事件信息
        daterEvent._webSocket = this.web;   //添加网络对象指针

        this.dispatchEvent(daterEvent);     //发送要求事件
    }
    
    //接收View发送的切换场景事件
    public receiveSkinClassName(evt:GameEvent){
        console.log("切换场景事件，正发送通知给地图管理器");
        this.addEventListener(GameEvent.CHANGESCENE, this.map.receiveSkinClassName, this.map);

        this.orderMap(evt._className, evt._skinName, evt._jsonName, evt._groupName);    //发送事件

        this.removeEventListener(GameEvent.CHANGESCENE, this.map.receiveSkinClassName, this.map);
    }

    //发送事件
    private orderMap(className:string, skinName:string, jsonName:string, groupName:string){
        var daterEvent:GameEvent = new GameEvent(GameEvent.CHANGESCENE);    //生成事件对象
        daterEvent._className = className;    //添加对应的事件信息，值为类名
        daterEvent._skinName = skinName;    //添加对应的事件信息，值为皮肤路径
        daterEvent._jsonName = jsonName;    //添加对应的事件信息，值为资源配置文件
        daterEvent._groupName = groupName;  //添加对应的事件信息，值为预加载组名

        this.dispatchEvent(daterEvent);     //发送要求事件
    }


/*--------------------------------------------------------------------------------------*/

    //webSocket网络通信，接收服务器数据函数
    public receiveServerMsg(evt:GameEvent):void{
        this.addEventListener(GameEvent.RECEIVESERVER, this.view.receiveServerMsg, this.view);     //注册侦听器
        
        var msg:string = evt._serverData;
        
        this.orderSocketEvent(msg);   //发送要求
        
        this.removeEventListener(GameEvent.RECEIVESERVER, this.view.receiveServerMsg, this.view);  //移除侦听器
    }

    //发送事件
    private orderSocketEvent(msg:string){
        var daterEvent:GameEvent = new GameEvent(GameEvent.RECEIVESERVER);    //生成事件对象
        
        daterEvent._serverData = msg;   //添加服务器数据

        this.dispatchEvent(daterEvent);     //发送要求事件
    }

    //连接关闭事件
    public onSocketClose():void{
        this.addEventListener(GameEvent.CLOSESERVER, this.view.onSocketClose, this.view);     //注册侦听器
        this.orderSocket("CLOSESERVER");   //发送要求
        
        this.removeEventListener(GameEvent.CLOSESERVER, this.view.onSocketClose, this.view);
    }

    //发送函数
    private orderSocket(eventType:string):void{
        var daterEvent:GameEvent;
        switch(eventType){
            case "CLOSESERVER" : daterEvent = new GameEvent(GameEvent.CLOSESERVER);
                break;
            case "ERRORSERVER" : daterEvent = new GameEvent(GameEvent.ERRORSERVER);
                break;
        }
        this.dispatchEvent(daterEvent);     //发送要求事件
    }

    //出现异常事件
    public onSocketError():void{
        this.addEventListener(GameEvent.ERRORSERVER, this.view.onSocketError, this.view);     //注册侦听器
        this.orderSocket("ERRORSERVER");   //发送要求
        
        this.removeEventListener(GameEvent.ERRORSERVER, this.view.onSocketError, this.view);
    }
    

}
