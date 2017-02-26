/**
 * Created by liujinhe on 17/1/20.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var configuration = require('../../configuration');

const routes = require('../web/routes');
import {RouterContext,match} from 'react-router'
import ReactDOM from 'react-dom/server'
import React from 'react';
import httpProxy from 'http-proxy'


var session = require('express-session');


export default  function () {

    var app = new express();
    var server = http.Server(app);


    app.use(express.static(__dirname + '/public'))

    //console.log('path   :'+path.resolve(__dirname, '..', 'src/client/web/views'));

    var proxy = httpProxy.createProxyServer({target: `http://127.0.0.1:${configuration.api.port}`});

    app.use('/api', (req, res)=> {

        return proxy.web(req, res)
    })

    app.use(session({
        secret: 'bruce', // 建议使用 128 个字符的随机字符串
        cookie: {maxAge: 300 * 1000},
        resave: false,
        saveUninitialized: true
    }));

    app.set('views', path.resolve(__dirname, '..', '..', 'src/client/web/views'));


    app.use(function (req, res) {

        match({routes, location: req.url}, (error, redirectLocation, renderProps)=> {
            if (error) {
                res.status(500).send(error.message);
            } else if (redirectLocation) {
                res.status(302).redirect(redirectLocation.pathname + redirectLoaction.search)
            } else if (renderProps) {

                const html = ReactDOM.renderToString(<RouterContext {...renderProps}/>)


                res.render("index.ejs", {app: html});


            }
        })
    })
    server.listen(configuration.client.port, function (err) {
        if (err) {
            console.error('page server got error');
            return;
        }

        console.info(`page server run on ${configuration.client.host}:${configuration.client.port}`);

    })

}


