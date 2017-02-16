/**
 * Created by liujinhe on 17/2/10.
 */

import React from 'react';
import {Link} from 'react-router';
import EditableTable from './EditableTable.js'
import {message} from 'antd'
import {api} from '../../../../util'

class index extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {ds:[]};
    }

    componentDidMount() {
        var that=this;
        api.getRuleList({}, function (res) {
            //console.log('res'+JSON.stringify(res));
            let i=0;
            let rules=[];
            rules=res.content.map(function (rule ) {
                //console.log('rule   :'+JSON.stringify(rule));

                for(let key in rule){
                    let obj ={value: rule[key],editable:false}
                    rule[key]=obj;
                }

                rule.key=i++;


                return rule;
            });

            that.setState({ds:rules});


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
            <EditableTable ds={this.state.ds}/>
        );
    }
}

export default index;