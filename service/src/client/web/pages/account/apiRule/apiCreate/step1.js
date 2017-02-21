/**
 * Created by liujinhe on 17/2/13.
 */

import React from 'react';
import {Link} from 'react-router';

import { Checkbox ,message,Form, Icon, Input, Button} from 'antd';
const FormItem = Form.Item;

const CheckboxGroup = Checkbox.Group;

import {api} from '../../../../util'

const plainOptions = [];

const defaultCheckedList = [];

const RuleList = React.createClass({
    getInitialState() {
        return {
            checkedList: defaultCheckedList,
            valueOptions: plainOptions,
            indeterminate: true,
            checkAll: false,
        };
    }, componentDidMount(){
        let that = this;
        api.getRuleList({}, function (res) {
            let i = 0;
            let options = [];
            options = res.content.map(function (rule) {

                return {label: rule['name'], value: rule['_id'], key: i++};
            });

            console.log('options    :' + JSON.stringify(options));

            that.setState({valueOptions: options});
            console.log('options after   ');

            message.success('get rule success');
        });

    }, handleSubmit(e) {

        let that =this;
        console.log('this.state.checkedList :'+JSON.stringify(this.state.checkedList));
        api.createAPI({ruleList:this.state.checkedList,apiName:this.state.apiName}, function (res) {


            that.props.setApi(res.content);

            message.success('create api success');

        })
    },apiNameChange(e){

        this.setState({ apiName: e.target.value });

    },

    render() {
        return (
            <div>
                <span>1.请选择规则</span>
                <br/>
                <br/>
                <br/>
                <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                    <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}
                        >
                        Check all
                    </Checkbox>
                </div>
                <br />
                <CheckboxGroup options={this.state.valueOptions} defaultValue={defaultCheckedList}
                               onChange={this.onChange}/>
                <br/>
                <span>2.请输入api名字</span>
                <br/>
                <br/>
                <br/>
                <Input placeholder='输入api名字' onChange={this.apiNameChange}   />

                <br/>
                <br/>
                <br/>


                <Button type="primary" className="login-form-button" onClick={this.handleSubmit}>
                    确定选择规则
                </Button>

                <br/>
                <br/>
                <br/>
            </div>
        );
    },
    onChange(checkedList) {
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
            checkAll: checkedList.length === plainOptions.length,
        });
    },
    onCheckAllChange(e) {
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    },
});


//
//class step1 extends React.PureComponent {
//    constructor(props) {
//        super(props);
//        this.state = {};
//    }
//
//    componentDidMount() {
//
//    }
//
//    componentWillUnmount() {
//
//    }
//
//    onChange(state) {
//
//    }
//
//    render() {
//
//        return (
//            <div >
//                <RuleList/>
//            </div>
//        );
//    }
//}

export default RuleList;