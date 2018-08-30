//1. 引入模块
const xtpl = require('xtpl');
const path = require('path');

//4. 数据库操作对象引入 => 获取数据 => 模板渲染(代码的可维护,重复的连接数据库操作,提取出来)
const dbConnect = require(path.join(__dirname, "../tools/databasetool.js"))

//2. 业务逻辑处理
exports.getListPage = (req, res) => {

    //6. 模糊查询的关键字处理( 有参数 || 无参数 )
    const keyword = req.query.keyword || ""    

    //5. 调用数据库对象的 findList 方法
    dbConnect.findList('studentInfo', {name:{$regex:keyword}}, (err, docs) => {
        //3. 模板渲染 (操作5.时,移入此回调中)
        xtpl.renderFile(path.join(__dirname, "../statics/views/list.html"), {
            array:docs,
            keyword
        }, function (err, content) {
            //4. 服务器的响应 (回调之前，有做错误判断，有错误就不会执行回调)
            res.send(content)
        });
    })

}