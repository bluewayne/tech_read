/**
 * Created by liujinhe on 16/11/29.
 */

var article = {
    name: 'article',
    model: {
        'url': {
            type: String,
            unique: true
        },
        'title': 'String',
        'from': 'String',
        'author': 'String',
        'postTime': 'String',
        'createTime':'String',
        'starUserList':[],//里面是userIname
        'likeList':[],
        'commentList':[]
    }
};

module.exports = article;