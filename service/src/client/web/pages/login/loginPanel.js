/**
 * Created by liujinhe on 17/2/7.
 */

import React from 'react';
import {Link,browserHistory} from 'react-router';
import { Form, Icon, Input, Button, Checkbox ,message} from 'antd';
import style from './loginPanel.scss'
const FormItem = Form.Item;

import {api} from '../../util'

class loginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values)=> {
            if (!err) {
                console.log('Received values of form    :', values);

                let result = api.login(values, function (res) {
                    console.log('res' + JSON.stringify(res));
                    message.success('登陆成功');
                    browserHistory.push('/account');
                });

            }
        })
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    onChange(state) {

    }

    render() {

        const {getFieldDecorator}=this.props.form;

        let markup = (
            <Form onSubmit={this.handleSubmit} className={style.loginForm}>
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{required: true, message: '用户名不能为空!'}]

                    })(
                        <Input addonBefore={<Icon type='user'/>} placeholder='请输入用户名'/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '密码不能为空!'}]
                    })(
                        <Input addonBefore={<Icon type='lock'/>} placeholder='请输入密码'/>
                    )}
                </FormItem>

                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className={style.loginFormForgot}>Forgot password</a>
                    <Button type='primary' htmlType='submit' className={style.loginFormButton}>
                        Log in
                    </Button>
                    Or <Link to={`/register`}>立马注册</Link>
                </FormItem>
            </Form>
        );

        return markup;
    }
}

class loginPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const _loginPanel = Form.create()(loginForm)

        return (<_loginPanel/>);

    }

}


export default loginPanel;