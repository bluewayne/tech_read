/**
 * Created by liujinhe on 17/2/10.
 */

import React from 'react';
import {Link} from 'react-router';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
import { Row, Col } from 'antd';
class index extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    onChange(state) {

    }

    render() {

        return (
            <div >
                <Layout>
                    <Header><Row>
                        <Col span={8}><h1 style={style.white}>用户中心</h1></Col>
                        <Col span={4}></Col>
                        <Col span={12}><h1 style={style.center}>bruce,早上好</h1></Col>
                    </Row></Header>
                    <Content>
                        <Layout>
                            <Sider>
                                <Menu theme='dark'
                                      mode="inline"
                                      defaultSelectedKeys={['1']}
                                      defaultOpenKeys={['sub1']}
                                    >

                                    <SubMenu key="sub1" title={<span><Icon type="user" />用户中心</span>}>
                                        <Menu.Item key="1"><Link to='/account/rule'>规则管理</Link></Menu.Item>
                                        <Menu.Item key="2"><Link to='/account/api'>接口(API)管理</Link></Menu.Item>
                                    </SubMenu>
                                    <Menu.Item key='5'>用户中心</Menu.Item>
                                    <Menu.Item key='6'>安全设置</Menu.Item>

                                </Menu>

                            </Sider>
                            <Content style={{ padding: '24px', minHeight: 280,background:'white', minHeight:'400px'}}>
                                {this.props.children}
                            </Content>

                        </Layout>

                    </Content>
                    <Footer>@copyright bruce. Email:ljhjay1@163.com</Footer>

                </Layout>


            </div>
        );
    }
}

const style = {
    white: {color: 'white'},
    center: {textAlign: 'center'}
}


export default index;