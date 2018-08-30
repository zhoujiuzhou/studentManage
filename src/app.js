//1. 导入express
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

//2. 创建应用
const app = express()

//5. 利用bodyParse处理参数
app.use(bodyParser.urlencoded({ extended: false }))
//6. session的使用,验证登录信息
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

//3. 集成路由
const accountRouter = require(path.join(__dirname,'routers/accountRouter.js'))
app.use('/account',accountRouter)
const studentManageRouter = require(path.join(__dirname,'routers/studentManageRouter.js'))
app.use('/studentmanage',studentManageRouter)

//4. 启用应用
app.listen(3000,'127.0.0.1',(err)=>{

    if(err)
        console.log(err);
    console.log("creat OK"); 

})