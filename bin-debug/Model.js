var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// 模型类
var Model = (function (_super) {
    __extends(Model, _super);
    /**
     * 模型构造器，加载resource文件夹下的资源
     * 参数一为资源的配置文件
     * 参数二为预加载组名
     * 参数三为具有createScene函数的对象，目的在于告诉对象已完成资源加载
     */
    function Model(jsonName, groupName, object) {
        if (jsonName === void 0) { jsonName = "default.res.json"; }
        if (groupName === void 0) { groupName = "preload"; }
        if (object === void 0) { object = null; }
        var _this = _super.call(this) || this;
        _this.isResourceLoadEnd = false;
        _this.width = Common.width;
        _this.height = Common.height;
        console.log("Model", jsonName, groupName);
        //实例化加载画面
        _this.loadingView = new LoadingUI();
        _this.addChild(_this.loadingView);
        //初始化私有变量预加载组名
        _this.groupName = groupName;
        //初始化事件接收对象
        _this.object = object;
        //监听RES加载素材事件
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, _this.onConfigComplete, _this);
        //加载资源的配置文件
        RES.loadConfig("resource/" + jsonName, "resource/");
        return _this;
    }
    //监听资源加载完成事件，需确保接收对象具有uiPrepare函数
    Model.prototype.callFinish = function () {
        if (this.isResourceLoadEnd) {
            if (this.object) {
                this.addEventListener(GameEvent.RESCOMPLETE, this.object.uiPrepare, this.object); //注册侦听器
                this.order(); //发送要求
                this.removeEventListener(GameEvent.RESCOMPLETE, this.object.uiPrepare, this.object); //移除侦听器
            }
        }
    };
    //发送事件
    Model.prototype.order = function () {
        var daterEvent = new GameEvent(GameEvent.RESCOMPLETE); //生成事件对象
        daterEvent._todo = "资源加载完成"; //添加对应的事件信息
        this.dispatchEvent(daterEvent); //发送要求事件
    };
    /*-------------------------------------------------------------------------------------------------------*/
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    Model.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        //加载配置文件下的组
        RES.loadGroup(this.groupName);
    };
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    Model.prototype.onResourceLoadComplete = function (event) {
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
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Model.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    Model.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    Model.prototype.onResourceProgress = function (event) {
        if (event.groupName == this.groupName) {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    return Model;
}(egret.Sprite));
__reflect(Model.prototype, "Model");
//# sourceMappingURL=Model.js.map