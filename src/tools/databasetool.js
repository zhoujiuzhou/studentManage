// 重复代码的封装
function connectMongo(clt, param, funName, callback) {

    // 正式连接数据库
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {


        // 连接数据库,返回db对象
        const db = client.db(dbName);
        // 通过db对象 => 创建客户端
        const collection = db.collection(clt);


        // 做方法路径判断
        if (funName == "findList") {

            // 客户端 => 操作数据库
            collection.find(param).toArray(function (err, docs) {
                // 错误提示
                if (err)
                    console.log("find:", err);
                else
                    // 无误回调传参
                    callback(err, docs)
            })


        } else if (funName == "findOne") {

            // 客户端 => 操作数据库
            collection.findOne(param, function (err, doc) {
               
                // 错误提示        
                if (err)
                    console.log("findOne:", err);
                else
                    // 无误回调传参
                    callback(err, doc)
            })

        } else if (funName == "insertOne") {
            // 客户端 => 操作数据库
            collection.insertOne(param, function (err, result) {
                // 错误提示
                if (err)
                    console.log("insertOne:", err);
                else
                    // 无误回调传参
                    callback(err, result)
            })
        }
    });

}



// 引入模块
const MongoClient = require('mongodb').MongoClient;

// 配置数据库端口 URL
const url = 'mongodb://localhost:27017';
// 配置数据库名
const dbName = 'szhmqd21';


// 调用封装后的方法
exports.findList = (clt, param, callback) => {

    connectMongo(clt, param, "findList", callback)

}

exports.findOne = (clt, param, callback) => {

    connectMongo(clt, param, "findOne", callback)

}

exports.insertOne = (clt, param, callback) => {

    connectMongo(clt, param, "insertOne", callback)

}



// // findList 方法导出 clt:collection,集合名称
// exports.findList = (clt, param, callback) => {

//     connectMongo(clt, param, findList,callback)


//     // 正式连接数据库
//     MongoClient.connect(url, {
//         useNewUrlParser: true
//     }, function (err, client) {

//         // 连接数据库,返回db对象
//         const db = client.db(dbName);

//         // 通过db对象 => 创建客户端
//         const collection = db.collection(clt);

//         // 客户端 => 操作数据库
//         collection.find(param).toArray(function (err, docs) {
//             // 错误提示
//             if (err)
//                 console.log("find:", err);
//             else
//                 // 无误回调传参
//                 callback(err, docs)
//         })

//     });
// }

// findOne 方法导出 
// exports.findOne = (clt, param, callback) => {

//     // 正式连接数据库
//     MongoClient.connect(url, {
//         useNewUrlParser: true
//     }, function (err, client) {

//         // 连接数据库,返回db对象
//         const db = client.db(dbName);

//         // 通过db对象 => 创建客户端
//         const collection = db.collection(clt);

//         // 客户端 => 操作数据库
//         collection.findOne(param, function (err, doc) {
//             // 错误提示
//             if (err)
//                 console.log("findOne:", err);
//             else
//                 // 无误回调传参
//                 callback(err, doc)
//         })
//     });
// }

// // findOne 方法导出 
// exports.insertOne = (clt, param, callback) => {

//     // 正式连接数据库
//     MongoClient.connect(url, {
//         useNewUrlParser: true
//     }, function (err, client) {

//         // 连接数据库,返回db对象
//         const db = client.db(dbName);

//         // 通过db对象 => 创建客户端
//         const collection = db.collection(clt);

//         // 客户端 => 操作数据库
//         collection.insertOne(param, function (err, result) {
//             // 错误提示
//             if (err)
//                 console.log("insertOne:", err);
//             else
//                 // 无误回调传参
//                 callback(err, result)
//         })
//     });
// }