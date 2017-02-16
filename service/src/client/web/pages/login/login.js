/**
 * Created by liujinhe on 17/2/7.
 */

import React from 'react';
import {Link} from 'react-router';
import LoginPanel from './loginPanel.js'
import {Layout} from 'antd'
const {Header,Footer,Content}=Layout;

class index extends React.PureComponent {
    constructor(props) {
        super(props);
        //this.state = {isLogin:true};
        //this.onChange=this.onChange.bind(this);
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    onChange(state) {
        this.setState({isLogin:!this.state.isLogin})
    }

    render() {

        return (
            <div >
                <Layout>
                    <Header><h1>用户登录/注册</h1></Header>
                    <Content style={style.container}>
                        <LoginPanel/>
                    </Content>
                    <Footer>@copyright bruce. Email:ljhjay1@163.com</Footer>
                </Layout>
            </div>
        );
    }
}

const style = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '500px'
    }
}

if (module.hot) {
    module.hot.accept();
}

export default index;