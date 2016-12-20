/**
 * Created by liujinhe on 16/11/29.
 */


module.exports={
    database:process.env.MONGO_URI||'localhost/tech_read' //其中localhost是mongod所在的地址,tech_read是是数据库的名字
}