var MongoClient = require("mongodb").MongoClient;

// 接続文字列
//シェル起動時のurlとDB名(DBは作成していなくても問題なし)
var url = "mongodb://127.0.0.1:27017/mydb";

// MongoDB へ 接続
MongoClient.connect(url, (err, client) => {  //dbからclientに変更
    const db = client.db("mydb")  //　追加
    db.collection("users",(error, collection) => {
        collection.insertMany([
            { name: 'Bob', age: 24 },
            { name: 'john', age: 30 }
        ],(error,result) => {
            client.close();  //db.close()から変更
        });
    });
});
