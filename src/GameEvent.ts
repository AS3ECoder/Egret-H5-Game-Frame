/**
 * 自定义游戏事件
 */
class GameEvent extends egret.Event
{
    public static START:string = "事件开始";

    public static RESCOMPLETE:string = "资源加载成功";

    public static UIEVENT:string = "UI触发事件";

    public static CHANGESCENE:string = "切换场景";

    public static CONNECT:string = "连通类间通信";


    public _todo:string = "";   //事件信息

    public _className:string = "";  //CHANGESCENE事件的eui皮肤ts类名
    public _skinName:string = "";   //CHANGESCENE事件的eui皮肤EXML路径
    public _jsonName:string = "";   //CHANGESCENE事件的RES的资源json配置文件
    public _groupName:string = "";  //CHANGESCENE事件的预加载组名

    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false)
    {
        super(type,bubbles,cancelable);
    }
}