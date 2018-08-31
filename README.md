# 项目简介
这是一个用NodeJs+mongoDb完成的服务端渲染的小项目

## 页面

1、注册

2、登陆

3、学生管理列表（模糊查询）

4、新增列表

5、修改列表

## 基本架构

浏览器 => 主入口（一级目录&路由分配） + 路由（二级目录&功能分配） + 控制器（业务逻辑处理&数据库操作功能调用） + mango操作（数据库功能封装） 

## 技术点

1、开启网络服务

2、模块化处理

​	express框架  做分路由处理浏览器请求 业务逻辑 和 数据库操作的分离

​	核心：导入、导出

​		require()

​		module.exports.method = (param) =>{	

​		}

3、xtpl(依赖xtemplate) 和 art-template 的 模板继承 + 渲染

4、npm 第三方中间件的使用

​	body-parser     	（post 参数处理）

​	md5			（md5加密 & 加盐处理）

​	express-session	（express 中服务端的 session 使用）

​	mongodb		（express 中的 mongodb 数据库操作）

​	captchapng 		（验证码图片生成器，验证登陆）

5、静态资源路径配置

​	express 唯一内置 ：static

6、异步回调的跨页面传输

7、数据库操作的异步回调封装