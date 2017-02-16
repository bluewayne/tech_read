/**
 * Created by liujinhe on 17/2/15.
 */

import React from 'react';
import {Link} from 'react-router';
import { Form, Icon, Input, Button, Checkbox ,message} from 'antd';
import style from './loginPanel.scss'
const FormItem = Form.Item;

import {api} from '../../util'

class registerForm extends React.PureComponent {
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

                if (value.password !== values.confirmPassword) {
                    message.error('两次密码输入不一样')

                } else {
                    delete values.confirmPassword;

                    let result = api.register(values, function (res) {
                        console.log('res' + JSON.stringify(res));
                        message.success('注册成功');

                    });
                }


            }
        })
    }


    render() {

        const {getFieldDecorator}=this.props.form;

        let markup = (
            <div>
                <div><Link to={`/login`}>已有帐号点击登陆</Link></div>

                <Form onSubmit={this.handleSubmit} className={style.loginForm}>
                    <FormItem>
                        {getFieldDecorator('email', {
                            rules: [{required: true, message: '邮箱不能为空!'}]

                        })(
                            <Input addonBefore={<Icon type='user'/>} placeholder='请输入邮箱'/>
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
                        {getFieldDecorator('confirmPassword', {
                            rules: [{required: true, message: '确认密码不能为空!'}]
                        })(
                            <Input addonBefore={<Icon type='lock'/>} placeholder='请重复密码'/>
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
                            确认注册
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );

        return markup;
    }
}

class registerPanel extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const RegisterForm = Form.create()(registerForm)

        return (<RegisterForm/>);

    }

}


export default registerPanel;