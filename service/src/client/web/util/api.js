/**
 * Created by liujinhe on 17/2/9.
 */

import fetch from  'isomorphic-fetch'
import configuration from '../../../configuration.js'
import 'babel-polyfill'
import { message } from 'antd';

const apiPrefix = `http://${configuration.client.host}:${configuration.client.port}` //我擦，一定要叫http  (!!!!!!一定要记住，无语了)

const error = function () {
    message.error('This is a message of error');
};

export default {
    getArgsName: function (argsObj) {
        let argText = '';

        for (let pro in argsObj) {

            if (argsObj.hasOwnProperty(pro))
                argText += (argText ? '&' : '') + `${pro}=${argsObj[pro]}`
        }
        return argText;
    },
    fetchApi: function (url, success, err = error) {
        fetch(url, {credentials: 'include'}).then(function (response) { //Fetch 请求默认是不带 cookie 的，需要设置 fetch(url, {credentials: 'include'})
            return response.json();
        }).then(function (data) {

            success && success(data);

        }).catch(function (e) {
            err()

            console.log("Oops, error");

        });

    },

    login: function (argsObj, success, error) {

        let argText = this.getArgsName(argsObj);
        let url = `${apiPrefix}/api/users/login` + (argText && ('?' + argText));

        //console.log('url    :'+url);

        this.fetchApi(url, success, error)


    },register: function (argsObj, success, error) {

        let argText = this.getArgsName(argsObj);

        let url = `${apiPrefix}/api/users/register` + (argText && ('?' + argText));
        console.log('register url :' + url);
        this.fetchApi(url, success, error)
    },
    addRule: function (argsObj, success, error) {

        let argText = this.getArgsName(argsObj);

        let url = `${apiPrefix}/api/users/addRule` + (argText && ('?' + argText));
        console.log('addRule url :' + url);
        this.fetchApi(url, success, error)
    },
    getRuleList: function (argsObj, success, error) {

        let argText = this.getArgsName(argsObj);

        let url = `${apiPrefix}/api/users/getRuleList` + (argText && ('?' + argText));
        console.log('getRuleList url :' + url);
        this.fetchApi(url, success, error)
    },
    updateRule: function (argsObj, success, error) {
        let argText = this.getArgsName(argsObj);
        let url = `${apiPrefix}/api/users/updateRule` + (argText && ('?' + argText));

        console.log('updateRule url :' + url);
        this.fetchApi(url, success, error)
    },
    getAPIList:function (argsObj, success, error) {
        let argText = this.getArgsName(argsObj);
        let url = `${apiPrefix}/api/users/getAPIList` + (argText && ('?' + argText));

        console.log('getAPIList url :' + url);
        this.fetchApi(url, success, error)
    },
    createAPI: function (argsObj, success, error) {
        let argText = this.getArgsName(argsObj);
        let url = `${apiPrefix}/api/users/createAPI` + (argText && ('?' + argText));

        console.log('createAPI url :' + url);
        this.fetchApi(url, success, error)
    },
    generateAPI: function (argsObj, success, error) {
        let argText = this.getArgsName(argsObj);
        let url = `${apiPrefix}/api/users/generateAPI` + (argText && ('?' + argText));

        console.log('generateAPI url :' + url);
        this.fetchApi(url, success, error)
    },
    getArticles: function (argsObj, success, error) {
        let argText = this.getArgsName(argsObj);
        let url = `${apiPrefix}/api/articles/getArticles` + (argText && ('?' + argText));

        console.log('getArticles url :' + url);
        this.fetchApi(url, success, error)
    }

}


