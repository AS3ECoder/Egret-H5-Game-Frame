# Actlinkwe游戏框架

## 一、概述

**Actlinkwe游戏框架**是Actlinkwe团队在开发H5游戏过程中总结并整合的一套适合快速开发、团队合作的**MVC**模式、基于**Egret游戏引擎**的H5游戏开发框架。

为了开发H5游戏更加快速和方便，为了让更多人可以轻松地学习和使用Egret游戏引擎，为了独立开发者能适应开发需求的变化，Actlinkwe团队深入开发项目、了解游戏开发流程、研究优化游戏开发的方法，从Egret游戏引擎入手，取其精华、扩展功能，于是诞生了Actlinkwe游戏框架。

## 二、适合人群

* 使用Egret中EXML的设计人员
* 使用Egret开发游戏的编程人员
* 正在研究Egret引擎的学习人士

没有JavaScript基础的，先过了语言基础关再来鼓捣H5游戏开发 <http://www.w3school.com.cn/js/>

不知道Egret是什么的，知道但没看过Egret官方文档的，或从cocos过来的 <https://www.egret.com/>

## 三、MVC

Actlinkwe游戏框架采用MVC即"***模型-视图-控制器***"模式来开发游戏。其中，**M模型**的功能是加载游戏资源（如图片、音效、文档等）、发送和接收网络数据等等；**V视图**的功能是控制游戏画面的变化，包括处理与用户间的交互事件，将用户的操作反馈到画面上；**C控制器**则控制着模型和视图的操作，保持着游戏的正常运行、退出。

## 四、文件结构

编程人员只需关注 **src** 文件夹里面的.ts代码文件。除了Egret引擎本身的：

* **Main.ts** : 入口类
* **AssetAdapter.ts** : 资源适配类
* **ThemeAdapter.ts** : 主题适配类

这三个文件外，其余已被Actlinkwe框架修改或新建，即其余文件皆是框架的源代码。

设计人员需关注 **resource** 文件夹，在里面创建EXML文件来设计游戏的每个界面。除了Egret引擎本身的：

* **assets** : 资源文件夹
* **config** : 配置文件夹
* **eui_skins** : 皮肤文件夹

这三个文件夹外，其余是Actlinkwe框架的DEMO保存素材和皮肤的文件夹。

## 五、公共类

Actlinkwe游戏框架中现有的公共类有三个，分别是 `AssetAdapter.ts`、`ThemeAdapter.ts`、`Common.ts` 。以下为这三个类的介绍：

* **AssetAdapter.ts** : 项目自动生成的类，不需多加理会。

* **ThemeAdapter.ts** : 项目自动生成的类，不需多加理会。

* **Common.ts** : Actlinkwe游戏框架建立的类，主要存储公有的、**静态的**变量或函数，类型多为游戏信息参数，便于其他类能方便访问。另外，**Commone** 类的成员变量和值需要你自己加上去或修改，里面默认有三个静态变量，分别为 width 游戏舞台宽度, height 游戏舞台高度,  version 游戏目前版本。

*以下所介绍的类除了 **Main** 入口外，其余类皆为Actlinkwe游戏框架的组成部分。*

## 六、事件类

Actlinkwe游戏框架的自定义事件有一个 `GameEvent.ts` 。以下为这个类的介绍：

* **GameEvent.ts** : Actlinkwe游戏框架自定义的事件类，继承引擎的 egret.Event 事件类，定义了多个事件类型，如：

    * 无状态通用型事件 `STRAT`    

    * 用于触发模型的资源加载完成事件 `RESCOMPLETE`
    * 用户操作UI交互触发事件 `UIEVENT`
    * 场景切换事件 `CHANGESCENE`
    * 类间通信事件 `CONNECT`

    所有自定义事件可通过 `_todo` 事件变量来传输信息，由于是字符串型变量，所以可以使用JSON的扩展数据信息。

    另外，场景切换事件 `CHANGESCENE` 有点特殊，它是Actlinkwe游戏框架内置的一个重要的事件，主要功能是视图对象向上传递信息至控制器，控制器根据信息来切换视图。例如，玩家的角色诞生在新手村，当玩家想走出新手村的时候，走到了村口，立即触发了切换场景事件，新手村视图这时候告诉控制器：“玩家要离开新手村了，赶紧切换到城镇场景！”控制器一听，赶紧就把城镇场景显示到游戏舞台上，玩家就会看到游戏角色出现在城镇上了。

    那么，场景切换事件 `CHANGESCENE` 传递什么样的信息，控制器才看得懂，很简单，只有四个字符串变量，分别是：
    
    *  `_className` : 使用特定EXML游戏场景的类名

    *  `_skinName`  : 使用特定EXML游戏场景的类名的EXML文件在resource目录下的路径

    *  `_jsonName`  : 对应特定的EXML游戏场景的RES资源的json配置文件在resource目录下的路径

    *  `_groupName` : 对应特定的EXML游戏场景的RES资源的json配置文件名的预加载组组名

    切换场景事件看起来虽然复杂，其实一点也不复杂。不过，就算再复杂，只要你不打算修改Actlinkwe游戏框架的代码，你也几乎不需要弄懂，直接调用视图对象中已写好的函数即可。

## 七、加载场景页面

Actlinkwe游戏框架中现有的游戏加载过程中的画面生成器有一个 `LoadingUI.ts` 。以下为这个类的介绍：

* **LoadingUI.ts** : 与Model类配合使用，这个类的作用是在游戏切换场景时播放的加载画面。

## 八、模型类

Actlinkwe游戏框架的模型有一个 `Model.ts` 。以下为这个类的介绍：

* **Model.ts** : MVC设计模式中的 **M 模型** 部分，作为一个类继承于egret.Sprite，主要功能是加载游戏资源、发送和接收网络数据，还有添加显示对象（资源加载类）。其中，发送和接收网络数据仍未完成。

    实例化过程：调用构造器，实例化资源加载界面并添加至游戏画面，监听RES加载资源事件，当资源加载完成后，移除加载界面，然后发送消息至对应资源的视图对象并激活视图对象。

## 九、自定义控件类

Actlinkwe游戏框架中现有的自定义EXML控件有一个 `Pic.ts` 。以下为这个类的介绍：

* **Pic.ts** : Actlinkwe游戏框架自定义的一个EUI组件类，继承于eui.Iamge，除了父类基本的图像功能和参数设置外，还增加了额外两个属性和一个功能。

    * 两个属性

        * `isHit`         : 公有布尔型，是否可碰撞，默认为true可碰撞。只有为可碰撞类型的图形才能调用碰撞检测函数。

        * `isChangeScene` : 公有布尔型，是否为切换场景触发器，默认为false。只有为场景触发器碰撞后才有可能触发场景切换事件，不过这个属性可能不使用。因为场景该不该切换应交给视图处理，显示组件不应具备太多功能。

    * 一个功能

        * `isCrash(ob)` : 公有碰撞函数，返回值为boolean型，ob参数为碰撞对象。用于检测当前对象是否与ob对象发生碰撞，碰撞则返回true，否则返回false。采用盒子算法。

## 十、视图类

Actlinkwe游戏框架中现有的视图类有一个 `View.ts` 。以下为这个类的介绍：

* **View.ts** : 视图类是编程人员最需要关心的一个类。在Actlinkwe游戏框架中，编程人员所写的代码几乎所有都在继承于View类中。因为只需关心视图类就好，通过视图类来实现游戏逻辑。

    实例化过程：调用构造器，保存对应EXML游戏画面文件的路径地址，然后处于等待状态，当模型加载资源成功后，接收到模型的通知，开始加载EXML画面，然后执行编程人员所写的代码，直到触发了切换场景的逻辑，发送场景切换事件通知给控制器，然后移除所有显示对象。

    作为编程人员所需要写的逻辑代码的父类，View类有几个重要的函数，子类可以直接调用或者根据源代码进行修改。

    * 一个必须具备的入口函数

        * `createScene`: 受保护无参函数，子类必须显式继承这个函数作为视图的入口。子类需要在这个函数体中添加视图的游戏逻辑。
 
    * 四个事件添加器

        * `addMasterEvent(func,ob)` : 受保护有参函数，子类调用时可使用默认参数值无需赋值直接调用。此函数功能为对ob对象添加**帧事件**，然后调用ob对象中的函数func来处理帧事件。常用于显示对象对应于UI操作的移动。  
        
        * `addClickEvent(func,ob)` : 受保护有参函数，子类调用时可使用默认参数值无需赋值直接调用。此函数功能为对ob对象添加**点击事件**，然后调用ob对象中的函数func来处理点击事件。用于玩家与游戏进行交互，使用频率较多。

        * `addUIMoveEvent(ob)` : 受保护有参函数，子类调用时可使用默认参数值无需赋值直接调用。此函数功能为对ob对象添加**拖动事件**，可将对象拖动到屏幕任意位置，此函数执行结束没有回调，请配合其他逻辑一齐使用。

        * `addChangeSceneEvent(class,exml,json,group)` : 受保护有参函数，调用时传递四个参数用于切换场景，四个参数对应于`CHANGESCENE`的四个信息_className、_skinName、_jsonName、_groupName。当将形参的值传给事件并发送给控制器后，自动撤销此事件的监听。

    * 对应的事件撤销器

        实质就是上述的前三个事件添加器的函数名"add"改为"remove"，撤销事件时参数需跟添加时一致。切换事件函数会自动撤销。

        * `removeMasterEvent(func,ob)`

        * `removeClickEvent(func,ob)`

        * `removeUIMoveEvent(ob)`

## 十一、控制器类

Actlinkwe游戏框架的控制器有两个，分别是 `Controller.ts`、`Map.ts` 。以下为这两个类的介绍： 

* **Controller.ts** : 控制器类，继承于egret.Sprite，是MVC中的一个核心，是利用构造器传参数来实例化模型和视图的地方，也是管理模型对象和视图对象的显示和删除的地方。编程人员只需关注和直接使用Controller的构造器，然后添加到地图(Map)类即可。

    实例化过程：调用构造器，根据构造器参数实例化模型类和视图类，并把模型对象和视图对象添加到自身（因为自身是继承精灵类），当接收到视图的切换场景信息后，删除模型对象和视图对象。

    控制器类一般不独立使用，已集成在Map类里面，直接使用Map类即可。

* **Map.ts** : 地图类，继承于egret.Sprite，用于管理控制器。如果你问：MVC为什么会出现这个类？好吧，我承认，Actlinkwe游戏框架不是真正意义上的MVC类，可以用MVC的思想来理解，但是并非真正意义的MVC模式。

    实例化过程：调用构造器，根据构造器参数来实例化控制器类，并把控制器对象添加到自身，然后向控制器传递地图对象地址，控制器保存地图对象地址后向视图对象传递控制器地址，然后视图对象保存控制器地址，这样就可以将 “ **地图——控制器——视图** ” 连成一条链，当视图对象触发切换地图事件时，视图对象先通知控制器对象，控制器对象通知地图，通过这样的方式逐层往上传递，地图接收到切换场景通知后，删除自身的控制器对象，根据切换场景事件信息重新实例化一个控制器，接着又来一遍，逐层往下传递对应层的对象地址，逐层往上接收切换场景事件信息。

    这个类实例化的对象是用于Main入口类中的，主要是将多个游戏场景连接在一起，由所在场景中触发切换点来切换新的场景。游戏逻辑由视图负责，资源加载由模型负责，视图和模型由控制器负责，那么地图只需管理好控制器，那么就可以靠一个地图对象就能玩转几十个游戏场景了。

    那谁来管地图对象？这个就是编程人员在 `Main` 入口类中添加逻辑来管理地图了。

    地图类的构造函数constructor的形参有四个:

    *  `className` : 使用特定EXML游戏场景的类名

    *  `skinName`  : 使用特定EXML游戏场景的类名的EXML文件在resource目录下的路径

    *  `jsonName`  : 对应特定的EXML游戏场景的RES资源的json配置文件在resource目录下的路径

    *  `groupName` : 对应特定的EXML游戏场景的RES资源的json配置文件名的预加载组组名

## 公共类使用教程

## 模型类使用教程

## EXML使用教程

## 自定义控件使用教程

## 视图类使用教程

## 控制器类使用教程

## 地图类使用教程
