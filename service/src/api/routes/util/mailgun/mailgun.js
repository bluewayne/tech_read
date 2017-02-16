/**
 * Created by liujinhe on 16/12/2.
 */


var api_key = 'key-aa4a521970a29a46229414e40e2a399d';
var domain = 'mail.brusport.com';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var data = {
    from: '前端阅读器 <mailgun@mail.brusport.com>',
    to: '',
    subject: '为了确认邮箱的有效性，请点击信内连接',
    text: ''
};

module.exports= function(to,userId){

    data.to=to;
    var context='为了确认邮箱的有效性，请点击连接'+'localhost:3000/users/setIsValid?user_id='+userId
    mailgun.messages().send(data, function (error, body) {
        console.log(body);
    });
}

