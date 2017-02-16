/**
 * Created by liujinhe on 17/2/10.
 */

import React from 'react';
import {Link,browserHistory} from 'react-router';
import {api} from '../../../../util'
import Success from '../../../success.js'
import { Form, Icon, Input, Button, Checkbox ,message,Modal} from 'antd';
const confirm = Modal.confirm;

const FormItem = Form.Item;

const RuleForm = React.createClass({

    getInitialState () {
        return {};
    },
    handleSubmit(e) {
        e.preventDefault();
        let that = this;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                that.showConfirm(values);

                console.log('Received values of form: ', values);

            }
        });
    },
    ruleOnChange(e){
        console.log('e.target.value   :' + JSON.stringify(e.target.value));

        this.setState({
            ruleName: e.target.value
        });
        //console.log('ruleOnChange  :'+this.state.ruleName);

    },

    showConfirm(values) {
        let that = this;
        confirm({
            title: 'Want to delete these items?',
            content: (<Input addonBefore={<Icon type="home" />}
                             placeholder="请命名规则的名字" onChange={that.ruleOnChange}/>),
            onOk() {

                //console.log('that.state.ruleName    :'+that.state.ruleName);
                let ruleName

                that.state.ruleName && ( (ruleName = that.state.ruleName) && (ruleName = ruleName.replace(/\s/g, '')))

                if (ruleName) {
                    console.log('OK');
                    console.log('that.state.ruleName    :' + that.state.ruleName);
                    console.log(' ruleName   :' + '1' + ruleName + '1');
                    values.name = ruleName;
                    //api.addRule(values, function (res) {
                    //    console.log('res' + JSON.stringify(res));
                    //    message.success('创建规则成功');
                    //
                    //
                    //    let title='成功';
                    //    let desc=`规则${ruleName}创建成功!`
                    //    var successComponent = React.createClass({
                    //        render: function() {
                    //            return <success {{title,desc}}></success>
                    //        }
                    //    })
                    //
                    //    this.setState({successComponent:successComponent})
                    //
                    //});


                    let title = '成功';
                    let desc = `规则${ruleName}创建成功!`;

                    var successComponent = React.createClass({
                        render: function () {
                            return <Success title={title} desc={desc}  path='/account/rule'></Success>
                        }
                    })

                    message.success('创建规则成功');

                    that.setState({successComponent: successComponent})
                    //


                } else {
                    message.error('规则名字不能为空');

                }


                //let result = api.addRule(values, function (res) {
                //    console.log('res' + JSON.stringify(res));
                //    message.success('创建规则成功');
                //
                //});


                //return new Promise((resolve, reject) => {
                //    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                //}).catch(() => console.log('Oops errors!'));

            },
            onCancel() {
            },
        });
    }
    ,
    render() {
        console.log('render');
        const { getFieldDecorator } = this.props.form;

        let formMarkup = (
            <Form onSubmit={this.handleSubmit} style={style.loginForm}>


                <FormItem>
                    {getFieldDecorator('blog_site', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input addonBefore={<Icon type="home" />}
                               placeholder="请输入需收录页面网址.例如: http://blog.csdn.net/web/hotarticle.html"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('item_node', {
                        rules: [{required: true, message: '输入列表节点规则!'}],
                    })(
                        <Input addonBefore={<Icon type="tags-o" />} placeholder="输入列表节点规则"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('title_node', {
                        rules: [{required: true, message: '输入标题节点规则!'}],
                    })(
                        <Input addonBefore={<Icon type="pushpin-o" />} placeholder="输入标题节点规则"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('url_node', {
                        rules: [{required: true, message: '请输入链接节点规则!'}],
                    })(
                        <Input addonBefore={<Icon type="link" />} placeholder="请输入链接节点规则"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('from_node', {
                        rules: [{required: true, message: '请输入来源节点规则!'}],
                    })(
                        <Input addonBefore={<Icon type="link" />} placeholder="请输入来源节点规则"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('author_node', {
                        rules: [{required: true, message: '请输入作者节点规则!'}],
                    })(
                        <Input addonBefore={<Icon type="user" />} placeholder="请输入作者节点规则"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('post_time', {
                        rules: [{required: true, message: '请输入发布时间节点规则!'}],
                    })(
                        <Input addonBefore={<Icon type="clock-circle-o"/>} placeholder="请输入'发布时间'节点规则"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('pagination_rule', {
                        rules: [{required: true, message: '请输入分页规则节点规则!'}],
                    })(
                        <Input addonBefore={<Icon type="right" />} placeholder="请输入'分页规则'节点规则"/>
                    )}
                </FormItem>

                <div style={style.buttonContainer}>
                    <Button type="primary" htmlType="submit" style={style.createButton}>
                        创建规则
                    </Button>

                </div>

                <Button onClick={this.showConfirm}>
                    confirmation modal dialog
                </Button>

            </Form>
        );


        let SuccessComponent;
        if (this.state.successComponent) {
            SuccessComponent = this.state.successComponent;
        }

        console.log('this.state.successComponent    :' + this.state.successComponent);
        let markup = (SuccessComponent ? <SuccessComponent/> : formMarkup)

        return markup;

    },
})

//const RuleForm = Form.create()();


class RulePanel extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    propsToChild(isSuccess) {
        this.setState({isSuccess: isSuccess})
    }

    render() {


        let Markup = (this.state.isSuccess ? (RuleForm) : Form.create()(RuleForm))
        //const RForm = Form.create()(RuleForm)

        //
        //return (<_rulePanel/>);
        return (
            <div style={{padding: '20px', display: 'flex',justifyContent:'center'}}>
                <Markup/>
            </div>
        );
    }
}

export default RulePanel;


const style = {
    loginForm: {
        width: '500px'
    },
    FormButton: {
        width: '100%'
    },
    buttonContainer: {
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    createButton: {
        width: '50%',
        padding: '10px'

    }
}
