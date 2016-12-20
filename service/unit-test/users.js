/**
 * Created by liujinhe on 16/12/7.
 */

var db=require('../access/db');
db();

var user = require('../access/models/user');
var dao = require('../access/dao/index');
var userModule = dao(user);


console.log('xx');
userModule.create({email: "ljh", password: "welcome1"}, function (err, user) {
    console.log('err :'+err);

    if(err){
        console.log('err :'+err);

    }else{
        console.log('user :'+user);

    }

})
console.log('xx');
