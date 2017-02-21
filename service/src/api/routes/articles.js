var express = require('express');
var router = express.Router();

var dao = require('../access/dao');
var article = require('../access/models/article')
var articleModel = dao(article);
var result = require('../access/models/result');
var list = require('../access/models/list');
var resultWrapper = require('./util/resultWrapper');

//
var pageLimit = 10;//每页面显示10篇文章

/* GET users listing. */
router.get('/getArticles', function (req, res, next) {

    console.log('req.body   :' + JSON.stringify(req.query));

    var apiUrl=req.query.apiUrl;
    var keyWord = req.query.keyWord;
    var pageNow = req.query.pageNow;//pageNow从1开始
    var pageNum = req.query.pageNum;

    if (!pageNow || isNaN(pageNow) || pageNow < 1) {
        pageNow = 1;
    }

    if (pageNum) {
        pageLimit = pageNum;
    }
    var skipNum = (pageNow - 1) * pageLimit;

    let _articleModel=articleModel;

    if(apiUrl){
        let email=req.session.user.email;
        let emailName=email.split('@')[0];

        let APIArticle={...article};
        APIArticle.name=`${emailName}${apiUrl}`

        _articleModel = dao(APIArticle);
    }



    var query = _articleModel.find(keyWord ? {title: new RegExp(keyWord, "i")} : {}).skip(skipNum).limit(pageLimit);

    query.exec(function (err, articles) {

        list.items = articles;
        resultWrapper(res, err, list);

    });
});



router.get('/markStar', function (req, res, next) {

    console.log('req.body   :' + JSON.stringify(req.query));

    //var articleID=req.body.article_id;
    //var userID=req.body.user_id;
    var articleID = req.query.article_id;
    var userID = req.query.user_id;

    articleModel.update({_id: articleID}, {$addToSet: {starUserList: userID}}, function (err, article) {

        resultWrapper(res, err, article);


    });
});

router.get('/isStar', function () {
    var articleID = req.query.article_id;
    var userID = req.query.user_id;

    articleModel.findOne({_id: articleID, starUserList: userID}, function (err, article) {

        resultWrapper(res, err, article);

    })

})

router.get('/cancelStar', function (req, res, next) {
    //var articleID=req.body.article_id;
    //var userID=req.body.user_id;
    var articleID = req.query.article_id;
    var userID = req.query.user_id;


    articleModel.update({_id: articleID}, {$pull: {starUserList: userID}}, function (err, article) {

        resultWrapper(res, err, article);


    })

});

router.get('/getStarNum', function (req, res, next) {
    var articleID = req.query.article_id;

    articleModel.findOne({_id: articleID}, function (err, article) {

        resultWrapper(res, err, {starNum: article.starUserList.length});

        res.send(result);

    })
});

router.get('/getLikeNum', function (req, res, next) {

    var articleID = req.query.article_id;

    articleModel.findOne({_id: articleID}, function (err, article) {

        console.log('err    :'+JSON.stringify(err));
        console.log('article    :'+JSON.stringify(article));
        console.log('article.likeList   :'+article.likeList);
        console.log('article.starUserList   :'+article.starUserList);

        resultWrapper(res, err, {likeNum: article.likeList.length});

    })
})

router.get('/isLike', function (req, res, next) {

    var articleID = req.query.article_id;
    var userID = req.query.user_id;

    articleModel.findOne({_id: articleID, likeList: userID}, function (err, article) {

        resultWrapper(res, err, article);

    })
})


router.get('/markLike', function (req, res, next) {
    var articleID = req.query.article_id;
    var userID = req.query.user_id;
    console.log('markLike req.query :' + JSON.stringify(req.query));

    articleModel.update({_id: articleID}, {$addToSet: {likeList: userID}}, function (err, article) {

        console.log('article    :' + JSON.stringify(article));

        resultWrapper(res, err, article);

    })

})


router.get('/cancelLike', function (req, res, next) {
    var articleID = req.query.article_id;
    var userID = req.query.user_id;

    articleModel.update({_id: articleID}, {$pull: {likeList: userID}}, function (err, article) {

        resultWrapper(res, err, article);

    })

})

module.exports = router;


