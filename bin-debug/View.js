// 视图，封装帧事件到eui组件作为主逻辑
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var View = (function (_super) {
    __extends(View, _super);
    //构造函数，参数skinTempName为resource文件夹下的EXML皮肤路径
    function View(skinTempName) {
        var _this = _super.call(this) || this;
        /*--------------------------------------------------------------------------------------*/
        /* 帧事件 */
        //每帧开始时间
        _this.timeOnEnterFrame = 0;
        //每帧所用时间，多用于对应ID值的组件平滑移动
        _this.time = 0;
        //鼠标点击时，鼠标全局坐标与显示对象的位置差
        _this.distanceUI = new egret.Point();
        //当前触摸状态，按下时，值为true
        _this.touchStatusUI = false;
        /*--------------------------------------------------------------------------------------*/
        //webSocket网络通信
        //服务器数据队列
        _this.serverData = new Array();
        /*----------------------------------------------------------------------------------------------*/
        /* 构造 */
        _this.skinTempName = ""; //临时的皮肤路径
        _this.skinTempName = "resource/" + skinTempName;
        return _this;
    }
    //对应于Model资源加载完成事件后调用的函数
    //子类必须继承并修改skinName值
    View.prototype.uiPrepare = function () {
        this.addEventListener(eui.UIEvent.COMPLETE, this.createScene, this);
        this.skinName = this.skinTempName; //读取皮肤
    };
    //游戏主逻辑开始
    //子类应该在这函数体里添加UI事件
    View.prototype.createScene = function () {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.createScene, this);
        console.log("组件创建完成");
    };
    //监听帧事件，参数handleFunc为帧事件的处理函数
    View.prototype.addMasterEvent = function (handleFunc, obj) {
        if (handleFunc === void 0) { handleFunc = this.masterEventHandle; }
        if (obj === void 0) { obj = this; }
        console.log("视图内帧事件");
        this.addEventListener(egret.Event.ENTER_FRAME, handleFunc, obj);
        //更新开始时间
        this.timeOnEnterFrame = egret.getTimer();
    };
    //取消对应处理函数的帧事件
    View.prototype.removeMasterEvent = function (handleFunc, obj) {
        if (handleFunc === void 0) { handleFunc = this.masterEventHandle; }
        if (obj === void 0) { obj = this; }
        this.removeEventListener(egret.Event.ENTER_FRAME, handleFunc, obj);
    };
    //帧事件默认处理函数
    View.prototype.masterEventHandle = function () {
        this.everyMasterHaveToExec();
    };
    //帧事件的处理函数必须在函数体调用的函数
    View.prototype.everyMasterHaveToExec = function () {
        var end = egret.getTimer(); //每帧结束时间
        var start = this.timeOnEnterFrame; //每帧开始时间
        this.time = end - start; //每帧所用时间
        console.log("每帧所用毫秒: ", (1000 / this.time).toFixed(5));
        this.timeOnEnterFrame = egret.getTimer();
    };
    /*--------------------------------------------------------------------------------------*/
    /* UI点击事件 */
    //添加UI点击事件
    View.prototype.addClickEvent = function (handleFunc, obj) {
        if (handleFunc === void 0) { handleFunc = this.clickEventHandle; }
        if (obj === void 0) { obj = this; }
        console.log("视图点击事件");
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, handleFunc, obj);
    };
    //取消UI点击事件
    View.prototype.removeClickEvent = function (handleFuc, obj) {
        if (handleFuc === void 0) { handleFuc = this.clickEventHandle; }
        if (obj === void 0) { obj = this; }
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, handleFuc, obj);
    };
    //UI点击处理函数，获取点击点，子类可覆盖
    View.prototype.clickEventHandle = function (evt) {
        console.log("点击的坐标：", evt.stageX, evt.stageY);
    };
    //显示对象拖动事件，参数为皮肤中的显示对象
    View.prototype.addUIMoveEvent = function (ui) {
        this.moveUI = ui;
        console.log("视图内拖动事件");
        //监听鼠标拖动事件
        this.moveUI.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.UIMouseDown, this);
        this.moveUI.addEventListener(egret.TouchEvent.TOUCH_END, this.UIMouseUp, this);
    };
    View.prototype.UIMouseDown = function (evt) {
        console.log("Mouse Down.");
        this.touchStatusUI = true;
        this.distanceUI.x = evt.stageX - this.moveUI.x;
        this.distanceUI.y = evt.stageY - this.moveUI.y;
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.UIMouseMove, this);
    };
    View.prototype.UIMouseMove = function (evt) {
        if (this.touchStatusUI == true) {
            console.log("moving now ! Mouse: [X:" + evt.stageX + ",Y:" + evt.stageY + "]");
            this.moveUI.x = evt.stageX - this.distanceUI.x;
            this.moveUI.y = evt.stageY - this.distanceUI.y;
        }
    };
    View.prototype.UIMouseUp = function (evt) {
        console.log("Mouse Up.");
        this.touchStatusUI == false;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.UIMouseMove, this);
    };
    //来自控制器的连通事件
    View.prototype.connectToController = function (evt) {
        this.control = evt.target;
        this.web = evt._webSocket;
    };
    //添加切换场景事件
    View.prototype.addChangeSceneEvent = function (className, skinName, jsonName, groupName) {
        if (jsonName === void 0) { jsonName = "default.res.json"; }
        if (groupName === void 0) { groupName = "preload"; }
        console.log("切换场景事件，正发送通知给控制器");
        this.addEventListener(GameEvent.CHANGESCENE, this.control.receiveSkinClassName, this.control);
        this.orderController(className, skinName, jsonName, groupName); //发送事件
        this.removeEventListener(GameEvent.CHANGESCENE, this.control.receiveSkinClassName, this.control);
        //this.removeUI();
    };
    //发送事件
    View.prototype.orderController = function (className, skinName, jsonName, groupName) {
        var daterEvent = new GameEvent(GameEvent.CHANGESCENE); //生成事件对象
        daterEvent._className = className; //添加对应的事件信息，值为类名
        daterEvent._skinName = skinName; //添加对应的事件信息，值为皮肤路径
        daterEvent._jsonName = jsonName; //添加对应的事件信息，值为资源配置文件
        daterEvent._groupName = groupName; //添加对应的事件信息，值为预加载组名
        this.dispatchEvent(daterEvent); //发送要求事件
    };
    //接收服务器数据函数
    View.prototype.receiveServerMsg = function (evt) {
        var server_data = evt._serverData; //接收服务器数据
        this.saveServerData(server_data); //调用处理函数
    };
    //接收并处理函数，如果使用webSocket网络通信的话，子类必须继承使用
    View.prototype.saveServerData = function (server_data) {
        //console.log("View视图接收到服务器数据："+server_data);
        this.serverData.push(server_data);
    };
    //检查是否收到服务器数据
    View.prototype.hasServerData = function () {
        if (this.serverData.length > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    //获取队列中的一个数据
    View.prototype.receive = function () {
        return this.serverData.shift();
    };
    //发送数据到服务器
    View.prototype.send = function (server_data) {
        //调用网络通信对象发送函数
        this.web.send(server_data);
    };
    //处理网络连接关闭
    View.prototype.onSocketClose = function () {
        console.log("正在处理：网络连接关闭事件！");
    };
    //处理网络连接异常
    View.prototype.onSocketError = function () {
        console.log("正在处理：网络连接异常事件！");
    };
    //父类函数
    View.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        console.log("构造函数完成");
    };
    //私有函数，只有被通知切换场景才删除显示对象
    View.prototype.removeUI = function () {
        for (var i = this.numChildren - 1; i >= 0; i--) {
            if (this.getChildAt(i)) {
                this.removeChild(this.getChildAt(i));
            }
        }
    };
    return View;
}(eui.Component));
__reflect(View.prototype, "View");
//# sourceMappingURL=View.js.map