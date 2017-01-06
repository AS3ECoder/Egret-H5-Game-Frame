var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 自定义游戏事件
 */
var GameEvent = (function (_super) {
    __extends(GameEvent, _super);
    function GameEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        var _this = _super.call(this, type, bubbles, cancelable) || this;
        _this._todo = ""; //事件信息
        _this._className = ""; //CHANGESCENE事件的eui皮肤ts类名
        _this._skinName = ""; //CHANGESCENE事件的eui皮肤EXML路径
        _this._jsonName = ""; //CHANGESCENE事件的RES的资源json配置文件
        _this._groupName = ""; //CHANGESCENE事件的预加载组名
        return _this;
    }
    return GameEvent;
}(egret.Event));
GameEvent.START = "事件开始";
GameEvent.RESCOMPLETE = "资源加载成功";
GameEvent.UIEVENT = "UI触发事件";
GameEvent.CHANGESCENE = "切换场景";
GameEvent.CONNECT = "连通类间通信";
__reflect(GameEvent.prototype, "GameEvent");
//# sourceMappingURL=GameEvent.js.map