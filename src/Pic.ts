/**
 * 视图，继承于eui位图类，扩展位图属性和功能 
 */
class Pic extends eui.Image
{
    //构造函数
    public constructor(){
        super();
    }

    //是否可碰撞,默认为可碰撞
    public isHit = true;
    
    //是否为切换场景触发器
    public isChangScene = false;
    //场景触发器触发的皮肤组件类名
    public skinClassName = "";

    //碰撞检测，ob为检测的对象，isPrecise为是否使用精确检测碰撞（默认为false）
    public isCrash(ob:Pic):boolean{

        //如果ob对象为可碰撞的对象，才调用碰撞算法
        if(ob.isHit == true){
            
            //object对象的四个点的全局坐标
            let ob1:egret.Point = new egret.Point();    //左上角坐标
            let ob2:egret.Point = new egret.Point();    //右上角坐标
            let ob3:egret.Point = new egret.Point();    //左下角坐标
            let ob4:egret.Point = new egret.Point();    //右下角坐标
            this.localToGlobal(
                ob.x - ob.anchorOffsetX, 
                ob.y - ob.anchorOffsetY,
                ob1     //存储到左上角坐标
            );console.log("作为参数的对象的碰撞左上角坐标",ob1);

            this.localToGlobal(
                ob.x - ob.anchorOffsetX + ob.width, 
                ob.y - ob.anchorOffsetY,
                ob2     //存储到右上角坐标
            );console.log("作为参数的对象的碰撞右上角坐标",ob2);

            this.localToGlobal(
                ob.x - ob.anchorOffsetX, 
                ob.y - ob.anchorOffsetY + ob.height,
                ob3     //存储到左下角坐标
            );console.log("作为参数的对象的碰撞左下角坐标",ob3);

            this.localToGlobal(
                ob.x - ob.anchorOffsetX + ob.width, 
                ob.y - ob.anchorOffsetY + ob.height,
                ob4     //存储到右下角坐标
            );console.log("作为参数的对象的碰撞右下角坐标",ob4);

            //备份对象指针
            let self:Pic = this;

            //本对象的四个顶点的全局坐标
            let self1:egret.Point = new egret.Point();  //左上角坐标
            let self2:egret.Point = new egret.Point();  //右上角坐标
            let self3:egret.Point = new egret.Point();  //左下角坐标
            let self4:egret.Point = new egret.Point();  //右下角坐标
            this.localToGlobal(
                self.x - self.anchorOffsetX, 
                self.y - self.anchorOffsetY,
                self1     //存储到左上角坐标
            );console.log("碰撞算法调用的对象的碰撞左上角坐标",self1);

            this.localToGlobal(
                self.x - self.anchorOffsetX + self.width, 
                self.y - self.anchorOffsetY,
                self2     //存储到右上角坐标
            );console.log("碰撞算法调用的对象的碰撞右上角坐标",self2);

            this.localToGlobal(
                self.x - self.anchorOffsetX, 
                self.y - self.anchorOffsetY + self.height,
                self3     //存储到左下角坐标
            );console.log("碰撞算法调用的对象的碰撞左下角坐标",self3);

            this.localToGlobal(
                self.x - self.anchorOffsetX + self.width, 
                self.y - self.anchorOffsetY + self.height,
                self4     //存储到右下角坐标
            );console.log("碰撞算法调用的对象的碰撞右下角坐标",self4);

            //数组保存该对象四个坐标
            let obPoint:egret.Point[] = new Array(      
                ob1, ob2, ob3, ob4
            );
            //数组保存参数对象四个坐标
            let selfPoint:egret.Point[] = new Array(    
                self1, self2, self3, self4
            );

            //调用静态方法(盒子碰撞算法)并返回
            return Pic.testPontHit(selfPoint, obPoint);
            
        }
        else{   //对象为非碰撞类型就直接返回false
            return false;
        }

    }

    //盒子检测碰撞
    private static testPontHit(self:egret.Point[], ob:egret.Point[]):boolean{
        //self为第一个显示对象的坐标数组，ob作为第二个
        let self1:egret.Point = self[0];    //左上角坐标
        let self2:egret.Point = self[1];    //右上角角坐标
        let self3:egret.Point = self[2];    //左下角坐标
        let self4:egret.Point = self[3];    //右下角坐标

        let ob1:egret.Point = ob[0];    //左上角坐标
        let ob2:egret.Point = ob[1];    //右上角角坐标
        let ob3:egret.Point = ob[2];    //左下角坐标
        let ob4:egret.Point = ob[3];    //右下角坐标

        //确定坐标是否在范围内
        let isIn = false;

        for(let i=0; i<4; i++){
            if( ob[i].x >= self1.x && ob[i].x <= self4.x && ob[i].y >= self1.y && ob[i].y <= self4.y){
                isIn = true;
            }
        }

        if(isIn != true){
            for(let i=0; i<4; i++){
                if( self[i].x >= ob1.x && self[i].x <= ob4.x && self[i].y >= ob1.y && self[i].y <= ob4.y){
                    isIn = true;
                }
            }
        }

        return isIn;    //返回碰撞检测判断值
    }

}