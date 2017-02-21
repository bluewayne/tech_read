/**
 * Created by liujinhe on 17/2/14.
 */


//let obj={a: function () {
//
//    let c=1;
//},d:2}
//
//
//
//console.log('obj    :'+JSON.stringify(obj));


//console.log('ljhjay1@163.com'.split('@')[0]);


//console.log(1);
//
//setTimeout(function () {
//    console.log(3)
//},1000)
//
//console.log(2);

//console.log(Object instanceof Function);
//console.log(Function instanceof Object);
//

//
//Function.__proto__=Function.prototype ={}
//{}._proto_=Object.prototype

function d(){
    this.d1=2;
}

function b() {
    this.b1 = 1;
}



b.prototype=new d();
b.prototype.constructor=b;

let a = new b();
let c={};

//b.call(c)

//console.log(a instanceof  b);
console.log(typeof b);
//console.log(a.constructor);


//let s= a.constructor.toString();
//
//let reg=/function \s $1(\*)*/
//
//console.log(s)
//match()

//
//console.log(JSON.stringify(a));
//console.log(JSON.stringify(a.d1));
//
//console.log(JSON.stringify(c));
//console.log(JSON.stringify(c.d1));


//console.log(JSON.stringify(a.constructor) );

//console.log(Object.prototype.toString.call(this,a.constructor))
//console.log(Array.prototype.toString.call(this,a.constructor))
//console.log({}.toString.call(this,a.constructor))


//function type(obj) {
//    let o = {};
//    return o.toString.call(obj).replace(/\[object (\w*)\]/, '$1').toLowerCase();
//}

//console.log(type(a))




