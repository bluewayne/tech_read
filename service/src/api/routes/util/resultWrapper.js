/**
 * Created by liujinhe on 16/12/5.
 */

var Result=require('../../access/models/result');


module.exports= function(res,err,obj,successCalb){
    let result=new Result();
    if (err) {
        result.result='failed';
        result.status=1;
        result.errors.push(err);
    } else {
        result.status=0;
        result.content = obj;
        console.log('obj :'+JSON.stringify(obj));
        successCalb&&successCalb();
    }
    res.send( result);
}