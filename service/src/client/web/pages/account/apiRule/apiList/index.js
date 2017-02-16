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
        this.state = {ds:[]};
    }

    componentDidMount() {
        var that=this;
        api.getAPIList({}, function (res) {
            //console.log('res'+JSON.stringify(res));
            let i=0;
            let apis=[];
            apis=res.content.map(function (api ) {
                //console.log('rule   :'+JSON.stringify(rule));

                for(let prop in api){
                    let obj ={value: api[prop],editable:false}
                    api[prop]=obj;
                }

                api.key=i++;

                return api;
            });

            that.setState({ds:apis});


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