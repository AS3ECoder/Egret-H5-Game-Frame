//测试
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ViewTest = (function (_super) {
    __extends(ViewTest, _super);
    function ViewTest() {
        return _super.apply(this, arguments) || this;
    }
    //继承游戏主逻辑
    ViewTest.prototype.createScene = function () {
        _super.prototype.createScene.call(this);
        //添加游戏逻辑事件
        this.addMasterEvent(); //添加主逻辑
        this.addUIMoveEvent(this.two); //向对象添加拖拉事件
        this.addClickEvent(this.one);
        this.send("aaa"); //发送数据到服务器
    };
    //主逻辑处理函数
    ViewTest.prototype.masterEventHandle = function () {
        this.everyMasterHaveToExec(); //主逻辑必调用函数
        this.game(); //运行游戏
    };
    ViewTest.prototype.game = function () {
        if (this.hasServerData() === true) {
            for (var i = this.serverData.length - 1; i >= 0; i--) {
                if (this.receive() == "aaa") {
                    //tween动画
                    this.role.toPlay("role");
                }
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