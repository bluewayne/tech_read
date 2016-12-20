/**
 * Created by liujinhe on 16/12/5.
 */


var user = {
    name:'user',
    model:{
        nick_name: 'String',
        avatar_img:'String',
        email: {
            type: 'String',
            required: true
        } ,
        password: {
            type: 'String',
            required: true
        } ,
        phone_num: 'String',
        is_valid:{type:'Boolean',default:false}
    }
}

module.exports=user