/**
 * Created by liujinhe on 16/11/29.
 */

var mongoose=require('mongoose');
var Schema=mongoose.Schema;
///

function daoCreator(obj){


    var modelSchema=new Schema(obj.model);

    var objModel=mongoose.model(obj.name,modelSchema);
    return objModel;
}


module.exports=daoCreator;


