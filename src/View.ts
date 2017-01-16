// 视图，封装帧事件到eui组件作为主逻辑

//视图类未完成，解决首次加载时主逻辑问题

class View extends eui.Component
{

    //对应于Model资源加载完成事件后调用的函数
    //子类必须继承并修改skinName值
    public uiPrepare():void{
        this.addEventListener(eui.UIEvent.COMPLETE,this.createScene,this);
        this.skinName = this.skinTempName;  //读取皮肤
    }
    
    //游戏主逻辑开始
    //子类应该在这函数体里添加UI事件
    protected createScene():void{
        this.removeEventListener(eui.UIEvent.COMPLETE,this.createScene,this);
        console.log("组件创建完成");
    }


/*--------------------------------------------------------------------------------------*/
/* 帧事件 */

    //每帧开始时间
    protected timeOnEnterFrame = 0;

    //每帧所用时间，多用于对应ID值的组件平滑移动
    protected time = 0;

    //监听帧事件，参数handleFunc为帧事件的处理函数
    protected addMasterEvent(handleFunc:any=this.masterEventHandle, obj:View=this){
        console.log("视图内帧事件");
        this.addEventListener(egret.Event.ENTER_FRAME,handleFunc,obj);
        //更新开始时间
        this.timeOnEnterFrame = egret.getTimer();
    }
    //取消对应处理函数的帧事件
    protected removeMasterEvent(handleFunc:any=this.masterEventHandle, obj:View=this){
        this.removeEventListener(egret.Event.ENTER_FRAME,handleFunc,obj);
    }
    //帧事件默认处理函数
    protected masterEventHandle(){
        this.everyMasterHaveToExec();
    }
    //帧事件的处理函数必须在函数体调用的函数
    protected everyMasterHaveToExec(){
        var end = egret.getTimer();             //每帧结束时间
        var start = this.timeOnEnterFrame;      //每帧开始时间
        this.time = end - start;                //每帧所用时间
        console.log("每帧所用毫秒: ", (1000 / this.time).toFixed(5));
        this.timeOnEnterFrame = egret.getTimer();
    }
    

/*--------------------------------------------------------------------------------------*/
/* UI点击事件 */

    //添加UI点击事件
    protected addClickEvent(handleFunc:any=this.clickEventHandle, obj:View=this){
        console.log("视图点击事件");
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, handleFunc, obj);
    }
    //取消UI点击事件
    protected removeClickEvent(handleFuc:any=this.clickEventHandle, obj:View=this){
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, handleFuc, obj);
    }
    //UI点击处理函数，获取点击点，子类可覆盖
    protected clickEventHandle(evt:egret.TouchEvent){
        console.log("点击的坐标：", evt.stageX, evt.stageY);
    }


/*--------------------------------------------------------------------------------------*/
/* UI显示对象拖动事件 */

    //拖动事件的显示对象UI
    protected moveUI:any;
    //鼠标点击时，鼠标全局坐标与显示对象的位置差
    protected distanceUI:egret.Point = new egret.Point();
    //当前触摸状态，按下时，值为true
    private touchStatusUI:boolean = false;              
    //显示对象拖动事件，参数为皮肤中的显示对象
    protected addUIMoveEvent(ui:any){
        this.moveUI = ui;
        console.log("视图内拖动事件");
        //监听鼠标拖动事件
        this.moveUI.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.UIMouseDown, this);
        this.moveUI.addEventListener(egret.TouchEvent.TOUCH_END, this.UIMouseUp, this);
    }
    protected UIMouseDown(evt:egret.TouchEvent)
    {
        console.log("Mouse Down.");
        this.touchStatusUI = true;
        this.distanceUI.x = evt.stageX - this.moveUI.x;
        this.distanceUI.y = evt.stageY - this.moveUI.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.UIMouseMove, this);
    }
    protected UIMouseMove(evt:egret.TouchEvent)
    {
        if(this.touchStatusUI == true){
            console.log("moving now ! Mouse: [X:"+evt.stageX+",Y:"+evt.stageY+"]");
            this.moveUI.x = evt.stageX - this.distanceUI.x;
            this.moveUI.y = evt.stageY - this.distanceUI.y;
        }
    }
    protected UIMouseUp(evt:egret.TouchEvent)
    {
        console.log("Mouse Up.");
        this.touchStatusUI == false;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.UIMouseMove, this);
    }


/*--------------------------------------------------------------------------------------*/
/* 切换场景事件 */

    public control:Controller;     //当Controller对象添加View时被赋值
    public web:TcpWebSocket;       //通信对象，用于发送数据到服务器

    //来自控制器的连通事件
    public connectToController(evt:GameEvent){
        this.control = evt.target;
        this.web = evt._webSocket;
    }
    
    //添加切换场景事件
    public addChangeSceneEvent(className:string, skinName:string, jsonName:string = "default.res.json", groupName:string = "preload"){
        console.log("切换场景事件，正发送通知给控制器");
        this.addEventListener(GameEvent.CHANGESCENE, this.control.receiveSkinClassName, this.control);

        this.orderController(className, skinName, jsonName, groupName);    //发送事件

        this.removeEventListener(GameEvent.CHANGESCENE, this.control.receiveSkinClassName, this.control);

        //this.removeUI();
    }

    //发送事件
    private orderController(className:string, skinName:string, jsonName:string, groupName:string){
        var daterEvent:GameEvent = new GameEvent(GameEvent.CHANGESCENE);    //生成事件对象
        daterEvent._className = className;    //添加对应的事件信息，值为类名
        daterEvent._skinName = skinName;    //添加对应的事件信息，值为皮肤路径
        daterEvent._jsonName = jsonName;    //添加对应的事件信息，值为资源配置文件
        daterEvent._groupName = groupName;  //添加对应的事件信息，值为预加载组名

        this.dispatchEvent(daterEvent);     //发送要求事件
    }


/*--------------------------------------------------------------------------------------*/
//webSocket网络通信

    //服务器数据队列
    public serverData:string[] = new Array();

    //接收服务器数据函数
    public receiveServerMsg(evt:GameEvent):void{
        var server_data:string = evt._serverData;   //接收服务器数据

        this.saveServerData(server_data);  //调用处理函数
    }

    //接收并处理函数，如果使用webSocket网络通信的话，子类必须继承使用
    protected saveServerData(server_data:string):void{
        //console.log("View视图接收到服务器数据："+server_data);

        this.serverData.push(server_data);
    }

    //检查是否收到服务器数据
    protected hasServerData():boolean{
        if(this.serverData.length > 0){
            return true;
        }
        else{
            return false;
        }
    }

    //获取队列中的一个数据
    protected receive():string{
        return this.serverData.shift();
    }

    //发送数据到服务器
    protected send(server_data:string):void{
        //调用网络通信对象发送函数
        this.web.send( server_data );   
    }

    //处理网络连接关闭
    protected onSocketClose():void{
        console.log("正在处理：网络连接关闭事件！");
    }

    //处理网络连接异常
    protected onSocketError():void{
        console.log("正在处理：网络连接异常事件！");
    }



/*----------------------------------------------------------------------------------------------*/
/* 构造 */

    public skinTempName:string = "";    //临时的皮肤路径

    //构造函数，参数skinTempName为resource文件夹下的EXML皮肤路径
    public constructor(skinTempName:string){
        super();
        this.skinTempName = "resource/"+skinTempName;
    }
    
    //父类函数
    protected createChildren() {
        super.createChildren();
        console.log("构造函数完成");
    }

    //私有函数，只有被通知切换场景才删除显示对象
    public removeUI():void{
        for(let i=this.numChildren-1; i>=0; i--){
            if(this.getChildAt(i)){
                this.removeChild(this.getChildAt(i));
            }
        }
    }

}