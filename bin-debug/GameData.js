// 保存游戏信息到本地类
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameData = (function () {
    function GameData() {
    }
    /**
     * 空间存储管理
     */
    //按名创建一个存储空间（如物品栏，属性栏），空间实际是一个数组，多个空间由空间管理器localSpaceDB进行管理
    GameData.createSpace = function (space_name) {
        //如果还没有数据库空间管理器，新建一个，否则检测空间管理器中是否已存在同名的空间
        if (!egret.localStorage.getItem("localSpaceDB")) {
            var space_obj_1 = [];
            var space_json = JSON.stringify(space_obj_1); //转化对象为JSON格式
            egret.localStorage.setItem("localSpaceDB", space_json);
            console.log("新建游戏本地数据存储空间管理器成功");
        }
        //取出所有空间名，空间名存在JSON中，所以需要转化成JS对象
        var space_obj = JSON.parse(egret.localStorage.getItem("localSpaceDB"));
        //检查对象是否存在空间名
        for (var i = 0; i < space_obj.length; i++) {
            if (space_obj[i].spaceName == space_name) {
                console.log("已存在空间名" + space_name + "，新建失败");
                return false; //如果已存在空间名，退出函数，返回失败值
            }
        }
        //空间管理器localSpaceDB登记新空间
        var new_obj = {
            spaceName: space_name
        };
        var old_space_obj = JSON.parse(egret.localStorage.getItem("localSpaceDB")); //获取存储所有空间名的对象
        old_space_obj.push(new_obj);
        var new_space_json = JSON.stringify(old_space_obj);
        egret.localStorage.setItem("localSpaceDB", new_space_json);
        //新建一个变量名为space_name的值的空间
        var data_obj = [];
        var data_json = JSON.stringify(data_obj);
        egret.localStorage.setItem(space_name, data_json);
        console.log("新建" + space_name + "空间成功");
        return true;
    };
    /**================================================================================= */
    //按名删除一个存储空间
    GameData.deleteSpace = function (space_name) {
        //判断是否删除的依据变量
        var isDelete = false;
        //空间管理器待删除的空间名的下标
        var delIndex = -1;
        //是否存在空间管理器localSpaceDB
        if (egret.localStorage.getItem("localSpaceDB")) {
            //获取空间管理器中所有空间名字的json数据并转化为js对象
            var all_space_name_obj = JSON.parse(egret.localStorage.getItem("localSpaceDB"));
            //检测是否存在space_name值的空间名，记录删除信息
            for (var i = 0; i < all_space_name_obj.length; i++) {
                if (all_space_name_obj[i].spaceName == space_name) {
                    isDelete = true;
                    delIndex = i;
                }
            }
            //确定是否删除
            if (isDelete === true && delIndex !== -1) {
                all_space_name_obj.splice(delIndex, 1); //删除空间名
                var new_space_json = JSON.stringify(all_space_name_obj); //转换对象为JSON
                //更新空间管理器信息
                egret.localStorage.setItem("localSpaceDB", new_space_json);
                //删除空间
                egret.localStorage.removeItem(space_name);
                console.log("成功删除" + space_name + "空间");
                return true;
            }
            else {
                console.log("删除空间失败，不存在" + space_name + "空间");
                return false;
            }
        }
    };
    /**================================================================================= */
    //向空间插入数据，参数分别为空间名、json数据
    GameData.insert = function (space_name, json_data) {
        //检测是否存在空间
        if (egret.localStorage.getItem(space_name)) {
            //获取空间存储的数据
            var all_data = JSON.parse(egret.localStorage.getItem(space_name));
            //插入数据
            all_data.push(json_data);
            egret.localStorage.setItem(space_name, JSON.stringify(all_data));
            console.log("已插入数据：" + json_data + "，所有数据如下：");
            console.dir(all_data);
            return true;
        }
        else {
            console.log("不存在" + space_name + "空间");
            return false;
        }
    };
    /**================================================================================= */
    //替换空间（数组）中对应下标的数据
    GameData.update = function (space_name, data_index, json_data) {
        //检测是否存在空间
        if (egret.localStorage.getItem(space_name)) {
            //获取空间存储的数据
            var all_data = JSON.parse(egret.localStorage.getItem(space_name));
            //将空间的data_index下标的数据替换为json_data
            all_data.splice(data_index, 1, json_data);
            egret.localStorage.setItem(space_name, JSON.stringify(all_data));
            console.log("已更新数据：" + json_data + "，所有数据如下：");
            console.dir(all_data);
            return true;
        }
        else {
            console.log("不存在" + space_name + "空间");
            return false;
        }
    };
    /**================================================================================= */
    //删除空间（数组）中对应下标的数据
    GameData.delete = function (space_name, data_index) {
        //检测是否存在空间
        if (egret.localStorage.getItem(space_name)) {
            //获取空间存储的数据
            var all_data = JSON.parse(egret.localStorage.getItem(space_name));
            //将被删除的数据
            var delete_data = all_data[data_index];
            //将空间的data_index下标的数据删除
            all_data.splice(data_index, 1);
            egret.localStorage.setItem(space_name, JSON.stringify(all_data));
            console.log("已删除数据：" + delete_data + "，所有数据如下：");
            console.dir(all_data);
            return true;
        }
        else {
            console.log("不存在" + space_name + "空间");
            return false;
        }
    };
    /**================================================================================= */
    //查找空间（数组）中对应下标的数据并返回数组，下标默认为-1即搜索全部
    GameData.select = function (space_name, data_index) {
        if (data_index === void 0) { data_index = -1; }
        //检测是否存在空间
        if (egret.localStorage.getItem(space_name)) {
            //获取空间存储的数据
            var all_data = JSON.parse(egret.localStorage.getItem(space_name));
            //结果数组
            var result = void 0;
            //保存查询结果到结果数组
            if (data_index === -1) {
                result = all_data;
            }
            else if (data_index < all_data.length && data_index >= 0) {
                result = [];
                result.push(all_data[data_index]);
            }
            else {
                result = [];
            }
            console.log("已返回数据：" + result + "，所有数据如下：");
            //返回结果数组
            return result;
        }
        else {
            console.log("不存在" + space_name + "空间");
            return null;
        }
    };
    /**================================================================================= */
    /**================================================================================= */
    /**
     * 离散存储（非空间存储）
     */
    //保存 key键-value值 数据（如本地存储账号密码）
    GameData.setItem = function (key, value) {
        var result = egret.localStorage.setItem("localScatterDataNotDB_" + key, value);
        return result;
    };
    //删除key键数据
    GameData.removeItem = function (key) {
        egret.localStorage.removeItem("localScatterDataNotDB_" + key);
    };
    //清除所有离散数据
    GameData.clear = function () {
        console.log("Can not clear All data! 请使用removeItem逐个清除！");
    };
    //获取key键数据
    GameData.getItem = function (key) {
        var result = egret.localStorage.getItem("localScatterDataNotDB_" + key);
        return result;
    };
    /**================================================================================= */
    /**================================================================================= */
    //生成任意值到任意值的随机整数
    GameData.random = function (min, max) {
        if (min === void 0) { min = 0; }
        if (max === void 0) { max = 1; }
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map