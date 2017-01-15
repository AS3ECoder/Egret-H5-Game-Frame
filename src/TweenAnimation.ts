//wing缓动组动画类（高度与帧事件整合）

class TweenAnimation extends eui.Component 
{
    
    //当前面板的皮肤请在EXML文件对应id的本类中设置皮肤属性值（路径）
    public constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE,this.onComplete,this);
    }

    //临时存储等待处理
    private temp_handle:string = "";
    //两个确定是否加载皮肤成功标志变量
    private is_create:boolean = false;
    private is_complete:boolean = false;

    //完成UI事件
    private onComplete():void{
        console.log("onComplete");
        this.is_complete = true;

        if(this.is_create == true  && 
           this.is_complete == true && 
           this.temp_handle !== ""
        ){
            eval(this.temp_handle);
            this.temp_handle = "";
            console.log("执行临时");
        }
    }
    
    //构造器体内函数
    protected createChildren(): void {
        super.createChildren();
        console.log("createChildren");

        this.is_create = true;

        if(this.is_create == true  && 
           this.is_complete == true && 
           this.temp_handle !== ""
        ){
            eval(this.temp_handle);
            this.temp_handle = "";
            console.log("执行临时");
        }
    }

    //动画组名
    private tweenGroup:any;
    //播放状态
    private isPlay:boolean = false;
    //暂停状态
    private isPause:boolean = false;
    //停止状态
    private isStop:boolean = false;

    //播放EXML皮肤文件中对应id值的动画
    public toPlay(exml_tween_group_id:string):void{

        if(this.isPlay === false){
            this.tweenGroup = eval("this."+exml_tween_group_id);

            if( this.is_create == false  || this.is_complete == false ){
                this.temp_handle = "this.toPlay("+exml_tween_group_id+");";
                console.log("临时");
            }
            else{
                this.tweenGroup.addEventListener('complete', this.onTweenGroupComplete, this);
                this.tweenGroup.addEventListener('itemComplete', this.onTweenItemComplete, this);
                
                this.tweenGroup.play(1);
                this.isPlay = true;
                console.log("正在执行动画！");
            }
        }   
    }

    //暂停EXML皮肤文件中对应id值的动画
    public toPause(exml_tween_group_id:string):void{

        if(this.isPause === false){
            this.tweenGroup = eval("this."+exml_tween_group_id);

            if( this.is_create == false  || this.is_complete == false ){
                this.temp_handle = "this.toPause("+exml_tween_group_id+");";
            }
            else{
                this.tweenGroup.addEventListener('complete', this.onTweenGroupComplete, this);
                this.tweenGroup.addEventListener('itemComplete', this.onTweenItemComplete, this);
                this.tweenGroup.pause();
                this.isPause = true;
            }
        }
    }
    //停止EXML皮肤文件中对应id值的动画
    public toStop(exml_tween_group_id:string):void{

        if(this.isStop === false){
            this.tweenGroup = eval("this."+exml_tween_group_id);

            if( this.is_create == false  || this.is_complete == false ){
                this.temp_handle = "this.toStop("+exml_tween_group_id+");";
            }
            else{
                this.tweenGroup.addEventListener('complete', this.onTweenGroupComplete, this);
                this.tweenGroup.addEventListener('itemComplete', this.onTweenItemComplete, this);
                this.tweenGroup.stop();
                this.isStop = true;
            }
        }
    }


    /**
     * 动画组播放完成
     */
    private onTweenGroupComplete(): void {
        console.log('tweenGroup动画播放结束！');
        
        this.tweenGroup.removeEventListener('complete', this.onTweenGroupComplete, this);

        //重置状态
        this.isPlay = false;
        this.isPause = false;
        this.isStop = false;
    }
    /**
     * 动画组中的一项播放完成
     */
    private onTweenItemComplete(event: egret.Event): void {
        const item = event.data as egret.tween.TweenItem;
        console.log(item.target);
        console.log('TweenItem play completed.');
        
        this.tweenGroup.removeEventListener('itemComplete', this.onTweenItemComplete, this);
    }
}
