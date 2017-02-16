/**
 * Created by liujinhe on 16/11/29.
 */

var mongoose = require('mongoose');
var config = require('./config');

module.exports = function () {
    mongoose.connect(config.database);
    mongoose.connection.on('error', function () {
        console.info('get error during connecting db!');
    });

}