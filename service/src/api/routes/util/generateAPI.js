/**
 * Created by liujinhe on 16/11/29.
 */

//title,url,source,
var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var async = require('async');

var db=require('./db/index');
db();
var dao=require('./dao/index');
var article=require('./models/article')
var articleDao=dao(article);

var Promise = require('bluebird');

//
//var siteArray = [
//    {
//        blog_site: 'https://segmentfault.com/news/frontend',
//        item_node: '.news__item .news__item-info',
//        title_node: '.news__item-title a',
//        url_node: '.news__item-title a',
//        from_node: 'a.news__item-external-link',
//        author_node: '.news__item-meta a.mr10',
//        post_time: '.news__item-meta span',
//        pagination_rule: '?page='
//    },
//    {
//        blog_site: 'http://blog.csdn.net/web/hotarticle.html',
//        item_node: '.blog_list',
//        title_node: '.tracking-ad a',
//        url_node: '.tracking-ad a',
//        from_node: 'http://blog.csdn.net',
//        author_node: 'a.nickname',
//        post_time: '.blog_list_b .fr label',
//        pagination_rule: '?&page='
//    },
//    {
//        blog_site: 'http://www.cnblogs.com/cate/108703/',
//        item_node: '.post_item',
//        title_node: 'a.titlelnk',
//        url_node: 'a.titlelnk',
//        from_node: 'http://www.cnblogs.com',
//        author_node: 'a.lightblue',
//        post_time: '.post_item_foot',
//        pagination_rule: '#p'
//    }
//]



module.exports=function(siteArray){


    promiseGet = Promise.promisify(superagent.get, superagent)

    siteArray.forEach(function (e) {

        var blogSite = e.blog_site;

        var siteName = blogSite.split('.')[1];

        fetchBlog(siteName, e);
    });

    function calcUrls(blogSite, paginationRule, itemNode, callback) {

        var c = 1;//设定需要爬取的分页数
        var urlBase = blogSite + paginationRule;
        var urlInitial = urlBase + c;

        checkUrl(urlInitial, callback);


    }

    function checkUrl(url) {

        promiseGet(blogSite).then(function (res) {

            var $ = cheerio.load(res.text);

            var items = $(itemNode);
            if (items.length > 0) {
                beginFetch(urlBase, c, itemNode);//这个callback就是beginFetch
                console.log('checkUrl c :' + c);
            } else {
                c = c - 10;
                checkUrl(urlBase + c);//这是我后来加上去的
            }

        }, function (error) {
            console.log('fetch data error');

        }).catch(function () {

        })


        //superagent.get(blogSite).end(function (err, res) {
        //    if (err) {
        //        console.log('fetch data error');
        //    }
        //
        //    var $ = cheerio.load(res.text);
        //
        //    var items = $(itemNode);
        //    if (items.length > 0) {
        //        callback(urlBase, c, itemNode);//这个callback就是beginFetch
        //        console.log('checkUrl c :' + c);
        //    } else {
        //        c = c - 10;
        //        checkUrl(urlBase + c,callback);//这是我后来加上去的
        //    }
        //    //items.forEach();
        //})

    }

    function generateUrls(urlBase, c) {

        var urls = [];

        for (var i = 1; i <= c; i++) {
            var url = urlBase + i;
            urls.push(url)
        }

        return urls;
    }


    function fetchBlog(siteName, props) {

        var blogSite = props.blog_site;
        var itemNode = props.item_node;
        var titleNode = props.title_node;
        var urlNode = props.url_node;
        var fromNode = props.from_node;
        var authorNode = props.author_node;
        var timeNode = props.post_time;
        var paginationRule = props.pagination_rule;

        calcUrls(blogSite, paginationRule, itemNode, beginFetch);


    }

    function beginFetch(urlBase, c, itemNode) {
        var ep = new eventproxy();

        var urls = generateUrls(urlBase, c);

        ep.after(siteName, urls.length, function (blogs) {

            blogs.forEach(function (e) {

                var $ = cheerio.load(e);

                var items = $(itemNode);

                console.log('items.length   :' + items.length);

                Array.prototype.forEach.call(items, function (item) {

                    //console.log('e          :'+JSON.stringify(e));
                    //console.log('titleNode  :' + titleNode);
                    //console.log('urlNode    ' + urlNode);
                    //console.log('fromNode   :' + fromNode);
                    //console.log('timeNode   :' + timeNode);

                    var title = $(titleNode, item).text();
                    var url = $(urlNode, item).attr('href');

                    if (url.indexOf('http') != -1) {

                    } else {
                        url = urlBase.substring(0, urlBase.indexOf('com') + 3) + url;
                    }

                    var from = '';
                    if (fromNode.indexOf('http') != -1) {
                        from = fromNode;

                    } else {
                        from = $(fromNode, item).text();

                    }
                    var author = $(authorNode, item).text();
                    var postTime = $(timeNode, item).text().replace(new RegExp(/\s/g), '');

                    if (!postTime || postTime.indexOf('前') === -1) {
                        var childNodes = $(timeNode, item).contents();

                        Array.prototype.forEach.call(childNodes, function (node) {
                            if (node.nodeType === 3) {
                                postTime = node.data.replace(new RegExp(/\s/g), '');
                            }
                        })
                    }

                    articleDao.create({
                        "url":url,
                        "title":title,
                        "from":from,
                        "author":author,
                        "postTime":postTime,
                        'createTime':new Date()
                    }, function (err,article) {
                        if(err){
                            console.log('insert article failed with err :'+err);
                        }else{
                            console.log('register success'+article);
                        }

                    });

                    //console.log('url :' + url);
                    //console.log('title :' + title);
                    //console.log('from :' + from);
                    //console.log('author :' + author);
                    //console.log('post_time :' + postTime);

                });

            });
        })


        async.mapLimit(urls, 7, function (url, callback) {
            console.log('beging fetch url   :' + url);
            fetchUrl(url, callback);
        }, function (err, result) {
            console.log('async final result :' + result);//注意callback(null, 'fetchurl :' + url);
        });

        function fetchUrl(url, callback) {
            superagent.get(url).end(function (err, res) {
                if (err) {
                    console.log('fetch data error');
                }

                ep.emit(siteName, res.text);
                callback(null, 'fetchurl :' + url);//这个callback的第二个参数会在maplimit的最后一个函数的result输出
                //items.forEach();

            })
        }

    }


}

