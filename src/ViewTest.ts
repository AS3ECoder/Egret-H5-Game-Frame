//视图类未完成，解决首次加载时主逻辑问题
class ViewTest extends View{

    //继承游戏主逻辑
    protected createScene():void{
        super.createScene();

        //this.role.toPlay("role");
        this.addMasterEvent();
        this.addUIMoveEvent(this.two);
    }

    protected masterEventHandle(){

        this.everyMasterHaveToExec();
        this.send("aaa");
        this.game();
    }

    private game():void{

        if(this.hasServerData() === true){
            if(this.receive() == "aaa"){
                //tween动画
                this.role.toPlay("role");
            }
        }
        
        this.one.x += 0.03*this.time;
        this.two.x -= 0.04*this.time;

        if(this.one.isCrash(this.two) == true){
            console.log("碰撞了");
            this.removeMasterEvent();

            //切换场景
            this.addChangeSceneEvent("View","test/test2.exml","default.res.json","test");
        }
        else{
            console.log("没碰到");
        }
    }

    //对应ID
    public one:Pic;
    public two:Pic;
    public role:TweenAnimation;

}