//测试

class ViewTest extends View{

    //继承游戏主逻辑
    protected createScene():void{
        super.createScene();

        //添加游戏逻辑事件
        this.addMasterEvent();  //添加主逻辑
        this.addUIMoveEvent(this.two);  //向对象添加拖拉事件
        this.addClickEvent(this.one);

        this.send("aaa");   //发送数据到服务器
    }

    //主逻辑处理函数
    protected masterEventHandle(){
        this.everyMasterHaveToExec();   //主逻辑必调用函数
        this.game();        //运行游戏
    }

    private game():void{

        if(this.hasServerData() === true){
            for(let i=this.serverData.length-1; i>=0; i--){
                if(this.receive() == "aaa"){
                    //tween动画
                    this.role.toPlay("role");
                }
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