// ！本页面注释代码，均可直接删除，留下仅作参考对比
// （未提取之前的冗余写法）


// 最终处理, 返回登录页面给浏览器
// 路由逻辑处理, 和业务处理的分离
const path = require('path')
const captchapng = require('captchapng');

//4. 数据库操作对象引入 => 获取数据 => 模板渲染(代码的可维护,重复的连接数据库操作,提取出来)
const dbConnect = require(path.join(__dirname, "../tools/databasetool.js"))

// 业务逻辑处理
exports.getLoginPage = (req, res) => {

    res.sendFile(path.join(__dirname, '../statics/views/login.html'))

}

exports.getRegisterPage = (req, res) => {

    res.sendFile(path.join(__dirname, '../statics/views/register.html'))

}

// 注册处理
exports.register = (req, res) => {

    // 构建好需要响应服务器的成功状态码
    let results = {
        status: 0,
        message: "注册成功"
    }


    // 调用数据库工具对象方法 findOne
    dbConnect.findOne('accountInfo', {
        
        username: req.body.username
    }, function (err, doc) {
        
        if (doc) {
            // 查询到有相同的用户名，修改默认的响应状态
            results.status = '1'
            results.message = "用户名已注册"

            console.log(results);
            
            res.json(results)
            return
        }

        // 调用数据库工具对象方法 insertOne
        dbConnect.insertOne('accountInfo', {
            username: req.body.username,
            password: req.body.password
        }, function (err, result) {

            // 不为空，代表插入数据成功
            if (result != null)
                // 返回构建好的默认响应状态
                res.json(results)
        })


        // collection.insertOne({
        //     username: req.body.username,
        //     password: req.body.password
        // }, function (err, result) {

        //     console.log(result);
        //     res.json({
        //         status: 0,
        //         message: result
        //     })

        // });

    })


    // MongoClient.connect(url, {
    //     useNewUrlParser: true
    // }, function (err, client) {

    //     const db = client.db(dbName);

    //     const collection = db.collection('accountInfo');

    //     collection.findOne({
    //         username: req.body.username
    //     }, function (err, doc) {

    //         if (doc) {

    //             res.json({
    //                 status: '1',
    //                 message: "用户名已注册"
    //             })

    //             client.close()

    //         } else {

    //             collection.insertOne({
    //                 username: req.body.username,
    //                 password: req.body.password
    //             }, function (err, result) {

    //                 console.log(result);
    //                 res.json({
    //                     status: 0,
    //                     message: result
    //                 })

    //             });
    //         }

    //     })
    // });

}

// 验证码图片处理
exports.getVcode = (req, res) => {

    const vcode = parseInt(Math.random() * 9000 + 1000)

    req.session.vcode = vcode

    let p = new captchapng(80, 30, vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    let img = p.getBase64();
    let imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        "Content-Type": "image/png"
    });
    res.end(imgbase64);

}


// 登录处理
exports.login = (req, res) => {

    let results = {
        status: 0,
        message: '登录成功'
    }

    // 验证session中的验证码信息
    if (req.body.vcode != req.session.vcode) {

        results.status = 1
        results.message = "验证码不正确"

        res.json(results)
        return
    }

    // 去数据库中, 使用username & password 校验
    // 调用数据库工具对象方法 findOne
    dbConnect.findOne('accountInfo', {
        username: req.body.username,
        password: req.body.password
    }, function (err, doc) {

        if (doc == null) {

            results.status = 2
            results.message = "用户名或密码不正确"

            res.json(results)
            return
        }
        res.json(results)
    })

    // MongoClient.connect(url, {
    //     useNewUrlParser: true
    // }, function (err, client) {

    //     const db = client.db(dbName);

    //     const collection = db.collection('accountInfo');

    //     collection.findOne({
    //         username: req.body.username,
    //         password: req.body.password
    //     }, function (err, doc) {

    //         if (doc == null) {

    //             result.status = 2
    //             result.message = "用户名或密码不正确"
    //             res.json({
    //                 result
    //             })

    //             client.close()
    //             return
    //         }

    //         res.json(result)

    //     })

    // });

}