///**
// * Created by liujinhe on 17/2/11.
// */
//
////let path=require('path');
////
////console.log(path.resolve(__dirname, '/..', '/views'));
////
////console.log(path.resolve(__dirname, '..', 'views'));
//
//
//console.log('dd');
//
//let a = {
//    "_id": {"value": "589d622301edcc7ade10db2a", "editable": true},
//    "blog_site": {"value": "1", "editable": true},
//    "item_node": {"value": "dd", "editable": true},
//    "title_node": {"value": "dd", "editable": true},
//    "url_node": {"value": "dd", "editable": true},
//    "from_node": {"value": "dd", "editable": true},
//    "author_node": {"value": "dd", "editable": true},
//    "post_time": {"value": "dd", "editable": true},
//    "pagination_rule": {"value": "dd", "editable": true},
//    "user_id": {"value": "5847b7d7e973d8399bb86877", "editable": true},
//    "__v": {"value": 0, "editable": true},
//    "key": 0
//};
//
//(function (x) {
//    console.log(x);
//})({...a})
//
//
//console.log(...a);

//let a=[2];
//a.map(function (x) {
//    return 1;
//})
//
//console.log(a);
//
//function pow(x) {
//    return x * x;
//}
//
//var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]
//
//console

//let a={a1:1,b2:2};
//
//let {b2,x}=a
//
//console.log('http://www.cnblogs.com/cate/108703/'.split('.')[1]);
//var Promise = require('bluebird');
//
//
//function cal(args,callback){
//    if(args==1){
//        callback({error:'error'})
//    }else{
//
//        callback({},'great')
//    }
//
//}
//
//let obj={cal:cal}
//
//
//console.log('obj.cal    :'+obj.cal);
//
//
//let promiseCal= Promise.promisify(obj.cal,obj);
//
//console.log('promiseCal :'+promiseCal);
//
//promiseCal(1).then(function (res) {
//    console.log('res  :'+res);
//
//}, function (error) {
//    console.log('error  :'+JSON.stringify(error));
//})

//
//String.prototype.hashCode = function(){
//    var hash = 0;
//    if (this.length == 0) return hash;
//    for (i = 0; i < this.length; i++) {
//       let  char = this.charCodeAt(i);
//        console.log('char   :'+char);
//        console.log('((hash<<5))   :'+((hash<<5)));
//        console.log('((hash<<5)-hash)   :'+((hash<<5)-hash));
//
//        hash = ((hash<<5)-hash)+char;
//        hash = hash & hash; // Convert to 32bit integer
//    }
//    return hash;
//}
//
//
//console.log("撒发生的".hashCode());
//
//
//var crypto=require('crypto'),fs =require('fs');;
//
////console.log(crypto.getHashes());
//
//const algs=['md5','sha','sha1','sha256','RSA-SHA','RSA-SHA256'];
//
//(function (hashs) {
//    hashs.forEach(function (hash) {
//
//        hashAlgom(hash);
//    })
//
//
//
//    function hashAlgom(algorithm){
//        var s1=new Date();
//        var filename='1.js'
//        var txt=fs.ReadStream(filename);
//
//        var shasum=crypto.createHash(algorithm);
//        txt.on('data', function (d) {
//            shasum.update(d)
//        })
//
//        txt.on('end', function () {
//            var d=shasum.digest('hex');
//            var s2=new Date();
//
//            console.log(algorithm+','+(s2-s1)+'ms,'+d+','+shasum.constructor)
//
//        })
//
//
//
//    }
//
//
//})(algs)

function af(){
    this._id=1;
}
af.prototype._m=2;

let a=new af();
console.log('Object.keys(a) :'+JSON.stringify(Object.keys(a)));

//for(let b in a){
//    console.log(b);
//
//}
//
//for(let b of a){
//    console.log(b);
//
//}



//let a = {
//    "_id": "589d75a0585a4d80b1fce279",
//    "blog_site": "https://segmentfault.com/news/frontend",
//    "item_node": ".news__item .news__item-info",
//    "title_node": ".news__item-title a",
//    "url_node": ".news__item-title a",
//    "from_node": "a.news__item-external-link",
//    "author_node": ".news__item-meta a.mr10",
//    "post_time": ".news__item-meta span",
//    "pagination_rule": "?page=",
//    "user_id": "5847b7d7e973d8399bb86877",
//    "__v": 0
//};

//let b= {...a}
//console.log('a._m  :'+a._m)
//
//console.log('a  :'+JSON.stringify(a))
//console.log('{...a}  :'+JSON.stringify({...a}))
//
//console.log('b  :'+JSON.stringify(b))


