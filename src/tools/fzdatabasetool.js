// 引入模块
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

exports.ObjectId = ObjectId


// 配置数据库端口 URL
const url = 'mongodb://localhost:27017';
// 配置数据库名
const dbName = 'szhmqd21';


// 封装
function connectDB(clt, callback) {

    // 正式连接数据库
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, (err, client) => {

        // 连接数据库,返回db对象
        const db = client.db(dbName);

        // 通过db对象 => 创建客户端
        const collection = db.collection(clt);

        // 通过回调传出数据
        callback(err, client, collection)
    });
}


// find
exports.findList = (clt, param, callback) => {

    // connectMongo(clt, param, findList,callback)

    connectDB(clt, (err, client, collection) => {
        // 客户端 => 操作数据库
        collection.find(param).toArray((err, docs) => {

            // 关闭数据库
            client.close();

            // 错误提示
            if (err)
                console.log("find:", err);
            else
                // 无误回调传参
                callback(err, docs)
        })
    })

}

// findOne 
exports.findOne = (clt, param, callback) => {

    connectDB(clt, (err, client, collection) => {

        // 客户端 => 操作数据库
        collection.findOne(param, function (err, doc) {

            // 关闭数据库
            client.close();

            // 错误提示
            if (err)
                console.log("findOne:", err);
            else
                // 无误回调传参
                callback(err, doc)
        })
    });
}

// insertOne 
exports.insertOne = (clt, param, callback) => {

    connectDB(clt, (err, client, collection) => {

        // 客户端 => 操作数据库
        collection.insertOne(param, function (err, result) {

            // 关闭数据库
            client.close();

            // 错误提示
            if (err)
                console.log("insertOne:", err);
            else
                // 无误回调传参
                callback(err, result)
        })
    });
}

// updateOne 
exports.updateOne = (clt, find, param, callback) => {

    connectDB(clt, (err, client, collection) => {

        // 客户端 => 操作数据库
        collection.updateOne(find, param, (err, result) => {

            // 关闭数据库
            client.close();

            // 错误提示
            if (err)
                console.log("find:", err);
            else
                // 无误回调传参
                callback(err, result)
        })
    })

}

// deleteOne 
exports.deleteOne = (clt,  param, callback) => {

    connectDB(clt, (err, client, collection) => {

        // 客户端 => 操作数据库
        collection.deleteOne( param, (err, result) => {

            // 关闭数据库
            client.close();

            // 错误提示
            if (err)
                console.log("find:", err);
            else
                // 无误回调传参
                callback(err, result)
        })
    })

}