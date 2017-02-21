/**
 * Created by liujinhe on 17/2/10.
 */

import React from 'react';
import {Link} from 'react-router';
import APITable from './apiTable.js'
import {message} from 'antd'
import {api} from '../../../../util'

class index extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {ds: []};
    }

    componentDidMount() {
        var that = this;
        api.getAPIList({}, function (res) {
            //console.log('res'+JSON.stringify(res));
            let i = 0;
            let apis = [];
            apis = res.content.map(function (api) {
                //console.log('rule   :'+JSON.stringify(rule));

                for (let prop in api) {
                    let obj = {value: api[prop], editable: false}
                    api[prop] = obj;
                }

                api.key = i++;

                return api;
            });

            //apis=[{
            //    "_id": {"value": "58a690f1a76aad27a1bb4514", "editable": false},
            //    "name": {"value": "afasdf", "editable": false},
            //    "encryptName": {"value": "12bca9badeb3e278fc04dcb8eb6573e26", "editable": false},
            //    "user_id": {"value": "5847b7d7e973d8399bb86877", "editable": false},
            //    "apiUrl": {"value": "2bca9badeb3e278fc04dcb8eb6573e26", "editable": false},
            //    "__v": {"value": 0, "editable": false},
            //    "ruleNameList": {"value": [], "editable": false},
            //    "showApiUrl": {
            //        "value": "http://127.0.0.1:3001/api/users/getRuleList?api_id=2bca9badeb3e278fc04dcb8eb6573e26",
            //        "editable": false
            //    },
            //    "key": 0
            //}]

            that.setState({ds: apis});

            message.success('get rule success');
        });
    }

    componentWillUnmount() {

    }

    onChange(state) {

    }

    render() {
        //console.log('this.state.ds  :'+JSON.stringify(this.state.ds));

        return (
            <APITable ds={this.state.ds}/>
        );
    }
}

export default index;