//1. 引入模块
const xtpl = require('xtpl');
const path = require('path');

//4. 数据库操作对象引入 => 获取数据 => 模板渲染(代码的可维护,重复的连接数据库操作,提取出来)
// const dbConnect = require(path.join(__dirname, "../tools/databasetool.js"))
const dbConnect = require(path.join(__dirname, "../tools/fzdatabasetool.js"))




//2. 业务逻辑处理

// 获取 学生管理列表页面 -处理
exports.getListPage = (req, res) => {

    //6. 模糊查询的关键字处理( 有参数 || 无参数 )
    const keyword = req.query.keyword || ""

    //5. 调用数据库对象的 findList 方法
    dbConnect.findList('studentInfo', {
        name: {
            $regex: keyword
        }
    }, (err, docs) => {
        //3. 模板渲染 (操作5.时,移入此回调中)
        xtpl.renderFile(path.join(__dirname, "../statics/views/list.html"), {
            array: docs,
            keyword,
            loggedName:req.session.loggedName
        }, function (err, content) {
            //4. 服务器的响应 (回调之前，有做错误判断，有错误就不会执行回调)
            res.send(content)
        });
    })

}

// 获取 新增页面-处理
exports.getAddStudentPage = (req, res) => {

    //3. 模板渲染 (操作5.时,移入此回调中)
    xtpl.renderFile(path.join(__dirname, "../statics/views/add.html"), {
        loggedName:req.session.loggedName
    }, function (err, content) {
        //4. 服务器的响应 (回调之前，有做错误判断，有错误就不会执行回调)
        res.send(content)
    });

}

// 添加 学生信息 -处理
exports.AddStudent = (req, res) => {

    //6. 模糊查询的关键字处理( 有参数 || 无参数 )
    const param = req.body
    // 5. 调用数据库对象的 findList 方法
    dbConnect.insertOne('studentInfo', param, (err, result) => {
        if (result == null) {
            res.send(`<script>alert("新增失败");location.href="http://127.0.0.1:3000/studentmanage/add"</script>`)
        } else {
            res.send(`<script>alert("新增成功");location.href="http://127.0.0.1:3000/studentmanage/list.html"</script>`)
        }
    })
}

// 获取 编辑页面 -处理
exports.getEditList = (req, res) => {
    // //5. 调用数据库对象的 findList 方法
    dbConnect.findOne('studentInfo', {
        _id: dbConnect.ObjectId(req.params.studentId)
    }, (err, doc) => {

        //3. 模板渲染 (操作5.时,移入此回调中)
        xtpl.renderFile(path.join(__dirname, "../statics/views/edit.html"), {
            student: doc,
            loggedName:req.session.loggedName
        }, function (err, content) {
            //4. 服务器的响应 (回调之前，有做错误判断，有错误就不会执行回调)
            res.send(content)
        });
    })
}

// 编辑 学生信息 -处理
exports.editStudent = (req, res) => {

    // //5. 调用数据库对象的 findList 方法
    dbConnect.updateOne('studentInfo', {
        _id: dbConnect.ObjectId(req.params.studentId)
    }, {
        $set: req.body
    }, (err, result) => {
    
        if (result == null) {
            res.send(`<script>alert("修改失败");location.href="http://127.0.0.1:3000/studentmanage/edit/${req.params.studentId}"</script>`)
        } else {
            res.send(`<script>alert("修改成功");location.href="http://127.0.0.1:3000/studentmanage/list.html"</script>`)
        }

    })

}

// 完成删除功能
exports.deleteStudent = (req, res) => {

    // //5. 调用数据库对象的 findList 方法
    dbConnect.deleteOne('studentInfo', {
        _id: dbConnect.ObjectId(req.params.studentId)
    }, (err, result) => {
    
        if (result == null) {
            res.send(`<script>alert("删除失败");location.href="http://127.0.0.1:3000/studentmanage/edit/${req.params.studentId}"</script>`)
        } else {
            res.send(`<script>alert("删除成功");location.href="http://127.0.0.1:3000/studentmanage/list.html"</script>`)
        }

    })

}
