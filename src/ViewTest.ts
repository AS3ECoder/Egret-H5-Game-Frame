//视图类未完成，解决首次加载时主逻辑问题
class ViewTest extends View{

    //继承游戏主逻辑
    protected createScene():void{
        super.createScene();
        this.addMasterEvent();
        //this.addUIMoveEvent(this.one);
    }

    protected masterEventHandle(){
        this.everyMasterHaveToExec();
        this.game();
    }

    private game():void{
        
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

    public one:Pic;
    public two:Pic;

}