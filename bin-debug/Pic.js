var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 视图，继承于eui位图类，扩展位图属性和功能
 */
var Pic = (function (_super) {
    __extends(Pic, _super);
    //构造函数
    function Pic() {
        var _this = _super.call(this) || this;
        //是否可碰撞,默认为可碰撞
        _this.isHit = true;
        //是否为切换场景触发器
        _this.isChangeScene = false;
        return _this;
    }
    //碰撞检测，ob为检测的对象，isPrecise为是否使用精确检测碰撞（默认为false）
    Pic.prototype.isCrash = function (ob) {
        //如果ob对象为可碰撞的对象，才调用碰撞算法
        if (ob.isHit == true) {
            //object对象的四个点的全局坐标
            var ob1 = new egret.Point(); //左上角坐标
            var ob2 = new egret.Point(); //右上角坐标
            var ob3 = new egret.Point(); //左下角坐标
            var ob4 = new egret.Point(); //右下角坐标
            this.localToGlobal(ob.x - ob.anchorOffsetX, ob.y - ob.anchorOffsetY, ob1 //存储到左上角坐标
            );
            //console.log("作为参数的对象的碰撞左上角坐标",ob1);
            this.localToGlobal(ob.x - ob.anchorOffsetX + ob.width, ob.y - ob.anchorOffsetY, ob2 //存储到右上角坐标
            );
            //console.log("作为参数的对象的碰撞右上角坐标",ob2);
            this.localToGlobal(ob.x - ob.anchorOffsetX, ob.y - ob.anchorOffsetY + ob.height, ob3 //存储到左下角坐标
            );
            //console.log("作为参数的对象的碰撞左下角坐标",ob3);
            this.localToGlobal(ob.x - ob.anchorOffsetX + ob.width, ob.y - ob.anchorOffsetY + ob.height, ob4 //存储到右下角坐标
            );
            //console.log("作为参数的对象的碰撞右下角坐标",ob4);
            //备份对象指针
            var self_1 = this;
            //本对象的四个顶点的全局坐标
            var self1 = new egret.Point(); //左上角坐标
            var self2 = new egret.Point(); //右上角坐标
            var self3 = new egret.Point(); //左下角坐标
            var self4 = new egret.Point(); //右下角坐标
            this.localToGlobal(self_1.x - self_1.anchorOffsetX, self_1.y - self_1.anchorOffsetY, self1 //存储到左上角坐标
            );
            //console.log("碰撞算法调用的对象的碰撞左上角坐标",self1);
            this.localToGlobal(self_1.x - self_1.anchorOffsetX + self_1.width, self_1.y - self_1.anchorOffsetY, self2 //存储到右上角坐标
            );
            //console.log("碰撞算法调用的对象的碰撞右上角坐标",self2);
            this.localToGlobal(self_1.x - self_1.anchorOffsetX, self_1.y - self_1.anchorOffsetY + self_1.height, self3 //存储到左下角坐标
            );
            //console.log("碰撞算法调用的对象的碰撞左下角坐标",self3);
            this.localToGlobal(self_1.x - self_1.anchorOffsetX + self_1.width, self_1.y - self_1.anchorOffsetY + self_1.height, self4 //存储到右下角坐标
            );
            //console.log("碰撞算法调用的对象的碰撞右下角坐标",self4);
            //数组保存该对象四个坐标
            var obPoint = new Array(ob1, ob2, ob3, ob4);
            //数组保存参数对象四个坐标
            var selfPoint = new Array(self1, self2, self3, self4);
            //调用静态方法(盒子碰撞算法)并返回
            return Pic.testPontHit(selfPoint, obPoint);
        }
        else {
            return false;
        }
    };
    //盒子检测碰撞
    Pic.testPontHit = function (self, ob) {
        //self为第一个显示对象的坐标数组，ob作为第二个
        var self1 = self[0]; //左上角坐标
        var self2 = self[1]; //右上角角坐标
        var self3 = self[2]; //左下角坐标
        var self4 = self[3]; //右下角坐标
        var ob1 = ob[0]; //左上角坐标
        var ob2 = ob[1]; //右上角角坐标
        var ob3 = ob[2]; //左下角坐标
        var ob4 = ob[3]; //右下角坐标
        //确定坐标是否在范围内
        var isIn = false;
        for (var i = 0; i < 4; i++) {
            if (ob[i].x >= self1.x && ob[i].x <= self4.x && ob[i].y >= self1.y && ob[i].y <= self4.y) {
                isIn = true;
            }
        }
        if (isIn != true) {
            for (var i = 0; i < 4; i++) {
                if (self[i].x >= ob1.x && self[i].x <= ob4.x && self[i].y >= ob1.y && self[i].y <= ob4.y) {
                    isIn = true;
                }
            }
        }
        return isIn; //返回碰撞检测判断值
    };
    return Pic;
}(eui.Image));
__reflect(Pic.prototype, "Pic");
//# sourceMappingURL=Pic.js.map