//游戏通用类，所有对象都可访问
//所有数据都需自定义，请使用框架前自行配置
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Common = (function () {
    function Common() {
    }
    return Common;
}());
//舞台宽度
Common.width = 1136;
//舞台高度
Common.height = 640;
//游戏版本
Common.version = 1.0;
//服务器地址
Common.server = "echo.websocket.org";
//服务器端口
Common.port = 80;
__reflect(Common.prototype, "Common");
//# sourceMappingURL=Common.js.map