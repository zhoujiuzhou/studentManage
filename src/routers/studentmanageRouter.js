// 引入模块
const express = require('express')
const path = require('path')

// 创建路由
const studentManageRouter = express.Router()

// 引入控制器 & art-Template的渲染方式 的切换
// const studentManageCTRL = require(path.join(__dirname,"../controllers/studentmanageController.js"))
const studentManageCTRL = require(path.join(__dirname,"../controllers/artTemplateController.js"))

// 逻辑业务分离 - 控制器分流
studentManageRouter.get('/list.html',studentManageCTRL.getListPage)

// 导出路由
module.exports = studentManageRouter