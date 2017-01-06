var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//地图管理类
var Map = (function (_super) {
    __extends(Map, _super);
    //地图构造类，跟控制器的一样，用来初始化第一张地图
    function Map(className, skinName, jsonName, groupName) {
        if (jsonName === void 0) { jsonName = "default.res.json"; }
        if (groupName === void 0) { groupName = "preload"; }
        var _this = _super.call(this) || this;
        //控制器对象
        _this.game = null;
        /*--------------------------------------------------------------------------------------*/
        /* 切换场景事件 */
        //皮肤类名
        _this.className = "";
        //皮肤路径
        _this.skinName = "";
        //RES资源配置json文件
        _this.jsonName = "";
        //RES资源配置json文件中的预加载组名
        _this.groupName = "";
        _this.width = Common.width;
        _this.height = Common.height;
        _this.className = className;
        _this.skinName = skinName;
        _this.jsonName = jsonName;
        _this.groupName = groupName;
        _this.changeScene();
        return _this;
    }
    //切换或初始化场景函数
    Map.prototype.changeScene = function () {
        if (this.game != null) {
            this.game.removeUI();
            this.removeChild(this.game);
        }
        this.game = null;
        this.game = new Controller(this.className, this.skinName, this.jsonName, this.groupName);
        this.addChild(this.game);
        this.addConnectToCotroller();
    };
    //添加向下通知保证路线连通事件
    Map.prototype.addConnectToCotroller = function () {
        this.addEventListener(GameEvent.CONNECT, this.game.connectToView, this.game); //注册侦听器
        this.orderConnect(); //发送要求
        this.removeEventListener(GameEvent.CONNECT, this.game.connectToView, this.game); //移除侦听器
    };
    //发送事件
    Map.prototype.orderConnect = function () {
        var daterEvent = new GameEvent(GameEvent.CONNECT); //生成事件对象
        daterEvent._todo = "请求连通"; //添加对应的事件信息
        this.dispatchEvent(daterEvent); //发送要求事件
    };
    //接收Controller发送的切换场景事件
    Map.prototype.receiveSkinClassName = function (evt) {
        console.log("地图管理器已接收切换场景事件");
        this.className = evt._className; //接收类名
        this.skinName = evt._skinName; //接收类名
        this.jsonName = evt._jsonName; //接收到配置文件名
        this.groupName = evt._groupName; //接收到预加载组名
        this.changeScene();
    };
    return Map;
}(egret.Sprite));
__reflect(Map.prototype, "Map");
//# sourceMappingURL=Map.js.map