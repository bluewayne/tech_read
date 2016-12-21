var express = require('express');
var router = express.Router();
var user = require('../access/models/user');
var article=require('../access/models/article');
var dao = require('../access/dao/index');
var userModel = dao(user);
var articleModel=dao(article);
var result = require('../access/models/result')
var resultWrapper = require('./util/resultWrapper');
var util=require('./util/util');


/* GET users listing. */
router.get('/register', function (req, res, next) {

    var email = req.query.email;
    var password = req.query.password;
    console.log('req.query'+JSON.stringify(req.query));


    var re;
    re= /\w@\w*\.\w/
    if(!re.test(email)){

        resultWrapper(res, '请输入正确的邮件地址!!', {})
        return;
    }

    if(email&&password){

        userModel.findOne({email: email}, function (err, user) {

            if(user){
                resultWrapper(res, '邮箱已经注册过!!', {})

            }else{

                userModel.create({email: email, password: password}, function (err, user) {
                    console.log('user :'+user);

                    resultWrapper(res, err, user, function () {
                        //do sth
                    });
                })

            }
        })

    }else{
        console.log('邮箱或者用户名不能为空');
        resultWrapper(res, '邮箱或者用户名不能为空!!', {})
    }


});

router.get('/setIsValid', function (req, res, next) {

    var userId = req.query.user_id;

    userModule.update({_id: userId}, {$set: {is_valid: true}}, function (err, user) {

        resultWrapper(res, err, user)

    })

})

router.get('/login', function (req, res, next) {
    var email = req.query.email;
    var password = req.query.password;

    userModel.findOne({email: email, password: password}, function (err, user) {

        console.log('user :'+user);

        if(user){
            resultWrapper(res, err, user)
        }else{

            resultWrapper(res, '该用户不存在!!!', {})

        }

    })

});


router.get('/getCapacha', function (req,res,next) {

    console.log('before capacha    :');


    var capNum=''+Math.floor(Math.random(1)*10)+Math.floor(Math.random(1)*10)+Math.floor(Math.random(1)*10)+Math.floor(Math.random(1)*10);

    var capacha=util.getCapacha(capNum);

    console.log('capacha    :'+capacha);
    resultWrapper(res, '', {capNum:capNum,capacha:capacha})

});

router.get('/getStarList', function (req, res, next) {

    console.log('getStarList api');
    console.log('req.query  :'+JSON.stringify(req.query));
    var userId=req.query.user_id;


    articleModel.find({starUserList:userId}, function (err,articles) {
        resultWrapper(res, err, articles)

    })

})


module.exports = router;
