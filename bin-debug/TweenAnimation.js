//wing缓动组动画类（高度与帧事件整合）
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TweenAnimation = (function (_super) {
    __extends(TweenAnimation, _super);
    //当前面板的皮肤请在EXML文件对应id的本类中设置皮肤属性值（路径）
    function TweenAnimation() {
        var _this = _super.call(this) || this;
        //临时存储等待处理
        _this.temp_handle = "";
        //两个确定是否加载皮肤成功标志变量
        _this.is_create = false;
        _this.is_complete = false;
        //播放状态
        _this.isPlay = false;
        //暂停状态
        _this.isPause = false;
        //停止状态
        _this.isStop = false;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onComplete, _this);
        return _this;
    }
    //完成UI事件
    TweenAnimation.prototype.onComplete = function () {
        console.log("onComplete");
        this.is_complete = true;
        if (this.is_create == true &&
            this.is_complete == true &&
            this.temp_handle !== "") {
            eval(this.temp_handle);
            this.temp_handle = "";
            console.log("执行临时");
        }
    };
    //构造器体内函数
    TweenAnimation.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        console.log("createChildren");
        this.is_create = true;
        if (this.is_create == true &&
            this.is_complete == true &&
            this.temp_handle !== "") {
            eval(this.temp_handle);
            this.temp_handle = "";
            console.log("执行临时");
        }
    };
    //播放EXML皮肤文件中对应id值的动画
    TweenAnimation.prototype.toPlay = function (exml_tween_group_id) {
        if (this.isPlay === false) {
            this.tweenGroup = eval("this." + exml_tween_group_id);
            if (this.is_create == false || this.is_complete == false) {
                this.temp_handle = "this.toPlay(" + exml_tween_group_id + ");";
                console.log("临时");
            }
            else {
                this.tweenGroup.addEventListener('complete', this.onTweenGroupComplete, this);
                this.tweenGroup.addEventListener('itemComplete', this.onTweenItemComplete, this);
                this.tweenGroup.play(1);
                this.isPlay = true;
                console.log("正在执行动画！");
            }
        }
    };
    //暂停EXML皮肤文件中对应id值的动画
    TweenAnimation.prototype.toPause = function (exml_tween_group_id) {
        if (this.isPause === false) {
            this.tweenGroup = eval("this." + exml_tween_group_id);
            if (this.is_create == false || this.is_complete == false) {
                this.temp_handle = "this.toPause(" + exml_tween_group_id + ");";
            }
            else {
                this.tweenGroup.addEventListener('complete', this.onTweenGroupComplete, this);
                this.tweenGroup.addEventListener('itemComplete', this.onTweenItemComplete, this);
                this.tweenGroup.pause();
                this.isPause = true;
            }
        }
    };
    //停止EXML皮肤文件中对应id值的动画
    TweenAnimation.prototype.toStop = function (exml_tween_group_id) {
        if (this.isStop === false) {
            this.tweenGroup = eval("this." + exml_tween_group_id);
            if (this.is_create == false || this.is_complete == false) {
                this.temp_handle = "this.toStop(" + exml_tween_group_id + ");";
            }
            else {
                this.tweenGroup.addEventListener('complete', this.onTweenGroupComplete, this);
                this.tweenGroup.addEventListener('itemComplete', this.onTweenItemComplete, this);
                this.tweenGroup.stop();
                this.isStop = true;
            }
        }
    };
    /**
     * 动画组播放完成
     */
    TweenAnimation.prototype.onTweenGroupComplete = function () {
        console.log('tweenGroup动画播放结束！');
        this.tweenGroup.removeEventListener('complete', this.onTweenGroupComplete, this);
        //重置状态
        this.isPlay = false;
        this.isPause = false;
        this.isStop = false;
    };
    /**
     * 动画组中的一项播放完成
     */
    TweenAnimation.prototype.onTweenItemComplete = function (event) {
        var item = event.data;
        console.log(item.target);
        console.log('TweenItem play completed.');
        this.tweenGroup.removeEventListener('itemComplete', this.onTweenItemComplete, this);
    };
    return TweenAnimation;
}(eui.Component));
__reflect(TweenAnimation.prototype, "TweenAnimation");
//# sourceMappingURL=TweenAnimation.js.map