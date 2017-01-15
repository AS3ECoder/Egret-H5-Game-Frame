var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//视图类未完成，解决首次加载时主逻辑问题
var ViewTest = (function (_super) {
    __extends(ViewTest, _super);
    function ViewTest() {
        return _super.apply(this, arguments) || this;
    }
    //继承游戏主逻辑
    ViewTest.prototype.createScene = function () {
        _super.prototype.createScene.call(this);
        //this.role.toPlay("role");
        this.addMasterEvent();
        this.addUIMoveEvent(this.two);
    };
    ViewTest.prototype.masterEventHandle = function () {
        this.everyMasterHaveToExec();
        this.send("aaa");
        this.game();
    };
    ViewTest.prototype.game = function () {
        if (this.hasServerData() === true) {
            if (this.receive() == "aaa") {
                //tween动画
                this.role.toPlay("role");
            }
        }
        this.one.x += 0.03 * this.time;
        this.two.x -= 0.04 * this.time;
        if (this.one.isCrash(this.two) == true) {
            console.log("碰撞了");
            this.removeMasterEvent();
            //切换场景
            this.addChangeSceneEvent("View", "test/test2.exml", "default.res.json", "test");
        }
        else {
            console.log("没碰到");
        }
    };
    return ViewTest;
}(View));
__reflect(ViewTest.prototype, "ViewTest");
//# sourceMappingURL=ViewTest.js.map