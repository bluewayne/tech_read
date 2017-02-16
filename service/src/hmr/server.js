/**
 * Created by liujinhe on 17/1/20.
 */

var express =require('express');
var http=require('http');

var webpack=require('webpack');
var webpackConfig=require('../../webpack/webpack.config');
var webpackDevMiddleware=require('webpack-dev-middleware');
var webpackHotMiddleware=require('webpack-hot-middleware');

var configuration=require('../configuration');

var app=new express();
var server=http.Server(app);
var compiler=webpack(webpackConfig);

console.log('public :'+`${webpackConfig.output.publicPath}`);

app.use(webpackDevMiddleware(compiler,{
    publickPath:`${webpackConfig.output.publicPath}`,
    noInfo:true,
    stats:{
        colors:true
    }
}));

app.use(webpackHotMiddleware(compiler,{log:console.log,heartbeat:10*1000}))

server.listen(configuration.hmr.port, function (err) {
    if(err){
        console.error('hmr server got error!');
    }

    console.info(`hmr server running on ${configuration.hmr.host}:${configuration.hmr.port}`);


});






