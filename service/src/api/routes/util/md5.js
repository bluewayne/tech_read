/**
 * Created by liujinhe on 17/2/14.
 */


let crypto = require('crypto');

module.exports = function (data) {

    let md5Sum = crypto.createHash('md5');

    md5Sum.update(data);

    return md5Sum.digest('hex')

}