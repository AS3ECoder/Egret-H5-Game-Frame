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

    public static RECEIVESERVER:string = "接收服务器数据";

    public static CLOSESERVER:string = "网络连接关闭";

    public static ERRORSERVER:string = "网络连接异常";


    //_todo变量所有事件类型都可使用
    public _todo:string = "";   //事件信息

    //CHANGESCENE事件携带的变量
    public _className:string = "";  //CHANGESCENE事件的eui皮肤ts类名
    public _skinName:string = "";   //CHANGESCENE事件的eui皮肤EXML路径
    public _jsonName:string = "";   //CHANGESCENE事件的RES的资源json配置文件
    public _groupName:string = "";  //CHANGESCENE事件的预加载组名

    //RECEIVESERVER事件携带的变量
    public _webSocket:TcpWebSocket = null;  //TcpWebSocket类指针
    public _serverData:string = "";     //接收服务器数据


    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false)
    {
        super(type,bubbles,cancelable);
    }
}