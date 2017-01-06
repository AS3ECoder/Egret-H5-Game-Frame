//地图管理类
class Map extends egret.Sprite{

    //控制器对象
    private game:Controller = null;

    //地图构造类，跟控制器的一样，用来初始化第一张地图
    public constructor(
            className:string, 
            skinName:string, 
            jsonName:string = "default.res.json", 
            groupName:string = "preload"
        ){
            super();
            this.width = Common.width;
            this.height = Common.height;

            this.className = className;  
            this.skinName = skinName;    
            this.jsonName = jsonName;     
            this.groupName = groupName; 

            this.changeScene();
    }

    //切换或初始化场景函数
    private changeScene():void{
        
        if(this.game != null){
            this.game.removeUI();
            this.removeChild(this.game);
        }

        this.game = null;
        this.game = new Controller(
            this.className,
            this.skinName,
            this.jsonName,
            this.groupName
        );

        this.addChild(this.game);

        this.addConnectToCotroller();
    }


    //添加向下通知保证路线连通事件
    private addConnectToCotroller(){
        this.addEventListener(GameEvent.CONNECT, this.game.connectToView, this.game);     //注册侦听器
        this.orderConnect();   //发送要求
        
        this.removeEventListener(GameEvent.CONNECT, this.game.connectToView, this.game);  //移除侦听器
    }

    //发送事件
    private orderConnect(){
        var daterEvent:GameEvent = new GameEvent(GameEvent.CONNECT);    //生成事件对象
        daterEvent._todo = "请求连通";    //添加对应的事件信息

        this.dispatchEvent(daterEvent);     //发送要求事件
    }


/*--------------------------------------------------------------------------------------*/
/* 切换场景事件 */

    //皮肤类名
    private className:string = "";
    //皮肤路径
    private skinName:string = "";
    //RES资源配置json文件
    private jsonName:string = "";
    //RES资源配置json文件中的预加载组名
    private groupName:string = "";
    
    //接收Controller发送的切换场景事件
    public receiveSkinClassName(evt:GameEvent){
        console.log("地图管理器已接收切换场景事件");

        this.className = evt._className;    //接收类名
        this.skinName = evt._skinName;    //接收类名
        this.jsonName = evt._jsonName;      //接收到配置文件名
        this.groupName = evt._groupName;    //接收到预加载组名

        this.changeScene();
    }


}