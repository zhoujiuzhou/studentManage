//1. 导入express
const express = require("express")
const path = require("path")




//2. 创建路由对象
const accountRouter = express.Router()

//5. 导入控制器

const accountCTRL = require(path.join(__dirname,"../controllers/accountController"))

//3. 处理具体的请求
accountRouter.get('/login.html',accountCTRL.getLoginPage)
accountRouter.get('/register.html',accountCTRL.getRegisterPage)
accountRouter.get('/vcode',accountCTRL.getVcode)
// 完成退出功能
accountRouter.get('/logout',accountCTRL.logout)


accountRouter.post('/register',accountCTRL.register)
accountRouter.post('/login',accountCTRL.login)


//4. 导出
module.exports = accountRouter