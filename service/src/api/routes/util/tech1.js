/**
 * Created by liujinhe on 16/11/29.
 */

//title,url,source,
var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var async = require('async');
var Promise = require('bluebird');

////var db=require('./db/index');
////db();
//var dao=require('./dao/index');
//var article=require('./models/article')
//var articleDao=dao(article);
//
//var siteArray = [
//    {
//        blog_site: 'https://www.segmentfault.com/news/frontend',
//        item_node: '.news__item .news__item-info',
//        title_node: '.news__item-title a',
//        url_node: '.news__item-title a',
//        from_node: 'a.news__item-external-link',
//        author_node: '.news__item-meta a.mr10',
//        post_time: '.news__item-meta span',
//        pagination_rule: '?page='
//    }
//]
let promiseGet = Promise.promisify(superagent.get, superagent)

let ep = new eventproxy();
//let promiseEPAfter = Promise.promisify(ep.after, ep)//经过测试，ep.after不是可转变成promise的callback方法

let promiseMapLimit = Promise.promisify(async.mapLimit, async);


//var promise = new Promise(function(resolve, reject) {
//    if (1==1){
//        resolve(value);
//    } else {
//        reject(error);
//    }
//});


module.exports= function(articleDao,rules){


    //return new Promise(function (resolve, reject) {
    //
    //
    //})

    //console.log('tech rules :'+ );
    rules=JSON.parse(JSON.stringify(rules))
    
    //rules.map(function (rule) {
    //
    //    return new Promise(function (resolve, reject) {
    //
    //        console.log('Object.keys(e) :'+JSON.stringify(Object.keys(e)));
    //        console.log('e  :'+JSON.stringify(e));
    //        var blogSite = e.blog_site;
    //
    //        var siteName = blogSite.split('.')[1];
    //
    //        console.log('...e   :'+JSON.stringify({...e}))
    //
    //        fetchBlog({siteName, ...e});
    //
    //    })
    //
    //})
    
    rules.forEach(function (e) {

        console.log('Object.keys(e) :'+JSON.stringify(Object.keys(e)));
        console.log('e  :'+JSON.stringify(e));
        var blogSite = e.blog_site;

        var siteName = blogSite.split('.')[1];

        console.log('...e   :'+JSON.stringify({...e}))

        fetchBlog({siteName, ...e});
    });

    //console.log('end');

    function fetchBlog(props) {
        console.log('fetchBlog props  :'+JSON.stringify(props));

        const {blog_site,pagination_rule}=props;

        var c = 1;//设定需要爬取的分页数
        var urlBase = blog_site + pagination_rule;
        //var urlInitial = urlBase + c;

        checkUrl({urlBase, c, ...props});

    }

    function checkUrl(props) {

        //console.log('checkUrl props  :'+JSON.stringify(props));
        const {c,item_node,blog_site}=props;

        console.log('blog_site   ' + blog_site);

        promiseGet(blog_site).then(function (res) {

            var $ = cheerio.load(res.text);

            var items = $(item_node);
            if (items.length > 0) {
                beginFetch(props);//这个callback就是beginFetch
                console.log('checkUrl c :' + c);
            }

        }, function (error) {
            console.log('fetch data error');

        }).catch(function () {

        })

    }


    function beginFetch(props) {
        let {urlBase, c, item_node, siteName}=props;

        var urls = generateUrls(urlBase, c);


        ep.after(siteName, urls.length, function (blogs) {

            blogs.forEach(function (e) {

                var $ = cheerio.load(e);

                var items = $(item_node);

                console.log('items.length   :' + items.length);

                Array.prototype.forEach.call(items, function (item) {

                    let {title_node, url_node, item_node, from_node,author_node,time_node}=props;


                    var title = $(title_node, item).text();
                    var url = $(url_node, item).attr('href');

                    if (url.indexOf('http') != -1) {

                    } else {
                        url = urlBase.substring(0, urlBase.indexOf('com') + 3) + url;
                    }

                    var from = '';
                    if (from_node.indexOf('http') != -1) {
                        from = from_node;

                    } else {
                        from = $(from_node, item).text();

                    }
                    var author = $(author_node, item).text();
                    var postTime = $(time_node, item).text().replace(new RegExp(/\s/g), '');

                    if (!postTime || postTime.indexOf('前') === -1) {
                        var childNodes = $(time_node, item).contents();

                        Array.prototype.forEach.call(childNodes, function (node) {
                            if (node.nodeType === 3) {
                                postTime = node.data.replace(new RegExp(/\s/g), '');
                            }
                        })
                    }

                    //articleDao.create({
                    //    "url":url,
                    //    "title":title,
                    //    "from":from,
                    //    "author":author,
                    //    "postTime":postTime,
                    //    'createTime':new Date()
                    //}, function (err,article) {
                    //    if(err){
                    //        console.log('insert article failed with err :'+err);
                    //    }else{
                    //        console.log('register success'+article);
                    //    }
                    //
                    //});

                    console.log('url :' + url);
                    console.log('title :' + title);
                    console.log('from :' + from);
                    console.log('author :' + author);
                    console.log('post_time :' + postTime);

                });

            });

        });

        promiseMapLimit(urls, 7, function (url, callback) {
            console.log('beging fetch url   :' + url);
            fetchUrl(url, callback);
        }).then(function (res) {
            console.log('async final result :' + res);//注意callback(null, 'fetchurl :' + url);

        }, function (err) {

        })


        function fetchUrl(url, callback) {

            promiseGet(url).then(function (res) {
                console.log('siteName   :' + siteName)
                ep.emit(siteName, res.text);

                //console.log('res.text   :' + JSON.stringify(res.text));

                callback(null, 'fetchurl :' + url);//这个callback的第二个参数会在maplimit的最后一个函数的result输出
                resolve
            }, function (err) {
                if (err) {
                    console.log('fetch data error');
                }
            })
        }

    }


    function generateUrls(urlBase, c) {

        var urls = [];
        //console.log('come to generateUrls');

        for (var i = 1; i <= c; i++) {
            var url = urlBase + i;
            urls.push(url)
        }

        return urls;
    }


}
