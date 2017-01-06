// 模型类
class Model extends egret.Sprite{

    /**
     * 模型构造器，加载resource文件夹下的资源
     * 参数一为资源的配置文件
     * 参数二为预加载组名
     * 参数三为具有createScene函数的对象，目的在于告诉对象已完成资源加载
     */
    public constructor(
            jsonName:string = "default.res.json", 
            groupName:string = "preload",
            object:View = null
        ){
        super();
        this.width = Common.width;
        this.height = Common.height;
        console.log("Model",jsonName,groupName);

        //实例化加载画面
        this.loadingView = new LoadingUI();
        this.addChild(this.loadingView);

        //初始化私有变量预加载组名
        this.groupName = groupName;

        //初始化事件接收对象
        this.object = object;

        //监听RES加载素材事件
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        //加载资源的配置文件
        RES.loadConfig("resource/"+jsonName, "resource/");
    }

    
    //监听资源加载完成事件，需确保接收对象具有uiPrepare函数
    private callFinish(){
        if(this.isResourceLoadEnd){
            if( this.object ){
                this.addEventListener(GameEvent.RESCOMPLETE, this.object.uiPrepare, this.object);     //注册侦听器
                this.order();   //发送要求
                
                this.removeEventListener(GameEvent.RESCOMPLETE, this.object.uiPrepare, this.object);  //移除侦听器
            }
        }
    }

    //发送事件
    private order(){
        var daterEvent:GameEvent = new GameEvent(GameEvent.RESCOMPLETE);    //生成事件对象
        daterEvent._todo = "资源加载完成";    //添加对应的事件信息

        this.dispatchEvent(daterEvent);     //发送要求事件
    }
    
    //加载画面
    private loadingView: LoadingUI;

    //预加载组名
    private groupName:string;
    
    //回调函数
    private object:View;

/*-------------------------------------------------------------------------------------------------------*/

    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        //加载配置文件下的组
        RES.loadGroup(this.groupName);
    }
    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == this.groupName) {
            this.removeChild(this.loadingView);
            console.log("移除加载界面");

            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            console.log("资源加载完成");

            this.callFinish();
        }
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == this.groupName) {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
}