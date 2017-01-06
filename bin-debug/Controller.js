var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//控制器类
var Controller = (function (_super) {
    __extends(Controller, _super);
    //控制类构造
    //className为继承View类的类名
    //skinName为EXML皮肤文件路径
    //json为资源的配置文件名
    //groupName为预加载组名
    function Controller(className, skinName, json, groupName) {
        if (json === void 0) { json = "default.res.json"; }
        if (groupName === void 0) { groupName = "preload"; }
        var _this = _super.call(this) || this;
        _this.width = Common.width;
        _this.height = Common.height;
        _this.view = eval("new " + className + "(\"" + skinName + "\")"); //将view视图赋值给私有变量
        _this.model = new Model(json, groupName, _this.view); //实例化模型，读取资源
        _this.addChild(_this.view); //添加到控制器
        _this.addChild(_this.model); //添加到控制器
        return _this;
    }
    //私有函数，只有被通知切换场景才删除显示对象
    Controller.prototype.removeUI = function () {
        if (this.view) {
            this.view.removeUI();
            this.removeChild(this.view);
        }
        if (this.model) {
            this.removeChild(this.model);
        }
    };
    //添加向下通知保证路线连通事件
    Controller.prototype.connectToView = function (evt) {
        this.map = evt.target;
        this.addEventListener(GameEvent.CONNECT, this.view.connectToController, this.view); //注册侦听器
        this.orderConnect(); //发送要求
        this.removeEventListener(GameEvent.CONNECT, this.view.connectToController, this.view); //移除侦听器
    };
    //发送事件
    Controller.prototype.orderConnect = function () {
        var daterEvent = new GameEvent(GameEvent.CONNECT); //生成事件对象
        daterEvent._todo = "请求连通"; //添加对应的事件信息
        this.dispatchEvent(daterEvent); //发送要求事件
    };
    //接收View发送的切换场景事件
    Controller.prototype.receiveSkinClassName = function (evt) {
        console.log("切换场景事件，正发送通知给地图管理器");
        this.addEventListener(GameEvent.CHANGESCENE, this.map.receiveSkinClassName, this.map);
        this.orderMap(evt._className, evt._skinName, evt._jsonName, evt._groupName); //发送事件
        this.removeEventListener(GameEvent.CHANGESCENE, this.map.receiveSkinClassName, this.map);
    };
    //发送事件
    Controller.prototype.orderMap = function (className, skinName, jsonName, groupName) {
        var daterEvent = new GameEvent(GameEvent.CHANGESCENE); //生成事件对象
        daterEvent._className = className; //添加对应的事件信息，值为类名
        daterEvent._skinName = skinName; //添加对应的事件信息，值为皮肤路径
        daterEvent._jsonName = jsonName; //添加对应的事件信息，值为资源配置文件
        daterEvent._groupName = groupName; //添加对应的事件信息，值为预加载组名
        this.dispatchEvent(daterEvent); //发送要求事件
    };
    return Controller;
}(egret.Sprite));
__reflect(Controller.prototype, "Controller");
//# sourceMappingURL=Controller.js.map