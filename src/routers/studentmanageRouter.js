// 引入模块
const express = require('express')
const path = require('path')

// 创建路由
const studentManageRouter = express.Router()

// 引入控制器 & art-Template的渲染方式 的切换
const studentManageCTRL = require(path.join(__dirname,"../controllers/studentmanageController.js"))
// const studentManageCTRL = require(path.join(__dirname,"../controllers/artTemplateController.js"))

// 逻辑业务分离 - 控制器分流

// 获取 学生管理列表页面
studentManageRouter.get('/list.html',studentManageCTRL.getListPage)

// 获取 添加页面
studentManageRouter.get('/add',studentManageCTRL.getAddStudentPage)

// 添加 学生信息
studentManageRouter.post('/add',studentManageCTRL.AddStudent)

// 获取 编辑页面
studentManageRouter.get('/edit/:studentId',studentManageCTRL.getEditList)

// 编辑 学生信息
studentManageRouter.post('/edit/:studentId',studentManageCTRL.editStudent)

// 完成删除功能
studentManageRouter.get('/delete/:studentId',studentManageCTRL.deleteStudent)


// 导出路由
module.exports = studentManageRouter