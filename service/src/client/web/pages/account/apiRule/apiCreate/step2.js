/**
 * Created by liujinhe on 17/2/13.
 */

import React from 'react';
import {Link} from 'react-router';
import { message,Spin ,Button,Card} from 'antd';

import {api} from '../../../../util'

class step2 extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {loading: false};
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {

    }

    handleClick() {
        let that = this;
        that.setState({loading: true});


        api.generateAPI(that.props.getApi(), function (res) {
            that.setState({loading: false});

            message.success('create api success');

        }, function (err) {
            that.setState({loading: false});

        })

    }

    componentWillUnmount() {

    }

    onChange(state) {

    }

    render() {

        console.log('this.props.getApi() :'+JSON.stringify(this.props.getApi()));

        return (
            <div >

                <Spin spinning={this.state.loading}>

                    <Card style={{ width: 700 }}>
                        <p>已经创建api:</p>
                        <p>{this.props.getApi()['showApiUrl']}</p>
                    </Card>
                </Spin>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>

                <Button onClick={this.handleClick}>点击生成相应api</Button>
            </div>
        );
    }
}

export default step2;