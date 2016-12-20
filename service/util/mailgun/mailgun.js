/**
 * Created by liujinhe on 16/12/2.
 */


var api_key = '';
var domain = '';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var data = {
    from: '前端阅读器 <mailgun@mail.brusport.com>',
    to: 'ljhjay1@163.com',
    subject: 'Hello',
    text: '你好!'
};

mailgun.messages().send(data, function (error, body) {
    console.log(body);
});