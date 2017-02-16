
var express = require('express');
var router = express.Router();
var Promise =require('bluebird');

var user = require('../access/models/user');
var article = require('../access/models/article');
var rule = require('../access/models/rule');
var API = require('../access/models/api');
var dao = require('../access/dao/index');
var userModel = dao(user);
var articleModel = dao(article);
var ruleModel = dao(rule);
var APIModel = dao(API);

var result = require('../access/models/result')
var resultWrapper = require('./util/resultWrapper');
var util = require('./util/util');
//接下来要做user等对象的缓存


/* GET users listing. */
router.get('/register', function (req, res, next) {

    var email = req.query.email;
    var password = req.query.password;
    console.log('req.query' + JSON.stringify(req.query));

    var re;
    re = /\w@\w*\.\w/
    if (!re.test(email)) {

        resultWrapper(res, '请输入正确的邮件地址!!', {})
        return;
    }

    if (email && password) {

        userModel.findOne({email: email}, function (err, user) {

            if (user) {
                resultWrapper(res, '邮箱已经注册过!!', {})

            } else {

                userModel.create({email: email, password: password}, function (err, user) {
                    console.log('user :' + user);
                    req.session.user = user;

                    resultWrapper(res, err, user, function () {
                        //do sth
                    });
                })

            }
        })

    } else {
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

        console.log('user :' + user);

        if (user) {
            req.session.user = user;
            console.log('req.session.user   :' + JSON.stringify(req.session.user));

            resultWrapper(res, err, user)

        } else {

            resultWrapper(res, '该用户不存在!!!', {})

        }

    })

});


router.get('/getCapacha', function (req, res, next) {

    console.log('before capacha    :');

    var capNum = '' + Math.floor(Math.random(1) * 10) + Math.floor(Math.random(1) * 10) + Math.floor(Math.random(1) * 10) + Math.floor(Math.random(1) * 10);

    var capacha = util.getCapacha(capNum);

    console.log('capacha    :' + capacha);
    resultWrapper(res, '', {capNum: capNum, capacha: capacha})

});

router.get('/addRule', function (req, res, next) {

    let blog_site = req.query.blog_site;
    let item_node = req.query.item_node;
    let title_node = req.query.title_node;
    let url_node = req.query.url_node;
    let from_node = req.query.from_node;
    let author_node = req.query.author_node;
    let post_time = req.query.post_time;
    let pagination_rule = req.query.pagination_rule;
    let user_id = req.query.user_id;

    let rule = {
        blog_site: blog_site, item_node: item_node, title_node: title_node, url_node: url_node,
        from_node: from_node, author_node: author_node, post_time: post_time, pagination_rule: pagination_rule,
        user_id: (req.session.user && req.session.user._id ) || user_id
    };

    console.log('req.session.user   :' + JSON.stringify(req.session.user));
    console.log('rule  :' + JSON.stringify(rule));

    ruleModel.create(rule, function (err, rule) {

        console.log('rule :' + rule);

        resultWrapper(res, err, rule, function () {
            //do sth
        });
    })

})


router.get('/getRuleList', function (req, res, next) {

    console.log('geRuleList');
    console.log('req.session.user._id   :' + req.session.user._id);
    var userId = req.session.user._id || req.query.user_id;

    console.log('rule   :'+JSON.stringify(rule));
    ruleModel.find({user_id:userId}, function (err, rules) {

        console.log('rules  :'+JSON.stringify(rules));
        resultWrapper(res, err, rules)
    })

})

router.get('/updateRule', function (req, res, next) {

    console.log('req.query  :' + JSON.stringify(req.query));

    var rule = req.query;

    var ruleId = rule._id;

    delete rule._id

    ruleModel.update({_id: ruleId}, {$set: rule}, function (err, rule) {
        resultWrapper(res, err, rule)
    })
})


router.get('/getAPIList', function (req, res, next) {

    console.log('getAPIList');
    console.log('req.session.user._id   :' + req.session.user._id);
    var userId = req.session.user._id || req.query.user_id;

    console.log('rule   :'+JSON.stringify(rule));
    APIModel.find({user_id:userId}, function (err, _apis) {

        let apis=_apis.map(function (api) {

            api.apiUrl='http://127.0.0.1:3001/api/users/getRuleList?api_id='+api.apiUrl

            return api;

        })

        console.log('apis  :'+JSON.stringify(apis));
        resultWrapper(res, err, apis)
    })

})

let md5=require('./util/md5');
router.get('/createAPI', function (req, res, next) {


    console.log('creaeAPI');

    let userId=req.session.user._id;
    let email=req.session.user.email;
    let emailName=email.split('@')[0];

    let ruleList=req.query.ruleList;
    let apiName=req.query.apiName;
    let apiUrl=md5(req.session.user._id+apiName);
    let encryptName=email+apiUrl;

    APIModel.create({name:apiName,encryptName:encryptName,ruleList:ruleList,user_id:userId,apiUrl:apiUrl}, function (err, API) {

        resultWrapper(res,err,API);

    })

})

let tech=require('./util/tech');

router.get('/generateAPI', function (req,res,next) {

    let apiID=req.query.api_id;
    let email=req.session.user.email;
    let emailName=email.split('@')[0]

    console.log('apiID  :'+apiID);

    ruleModel.find({api_id:apiID}, function (err,rules) {

        console.log('rules :'+JSON.stringify(rules));


            let apiArticle={...article}
            apiArticle.name=`${api.encryptName}`;

            var articleDao=dao(apiArticle);

            let promiseRules= tech(articleDao,rules);

            Promise.all(promiseRules).then(function (values) {

                resultWrapper(res,err,"success")

            })

        //ruleModel.where('_id').in(["589d622301edcc7ade10db2a","589d75a0585a4d80b1fce279"]).exec(function (err, rules) {
        //
        //    console.log('rules  :'+JSON.stringify(rules));
        //

        //
        //
        //});


    })

})




router.get('/getStarList', function (req, res, next) {

    console.log('getStarList api');
    console.log('req.query  :' + JSON.stringify(req.query));
    var userId = req.query.user_id;

    articleModel.find({starUserList: userId}, function (err, articles) {
        resultWrapper(res, err, articles)

    })
})

module.exports = router;
