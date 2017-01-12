var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
//游戏通用类，所有对象都可访问
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
__reflect(Common.prototype, "Common");
//# sourceMappingURL=Common.js.map