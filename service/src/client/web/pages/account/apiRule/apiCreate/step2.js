/**
 * Created by liujinhe on 17/2/13.
 */

import React from 'react';
import {Link} from 'react-router';
import { message,Spin ,Button,Card} from 'antd';

import {api} from '../../../../util'

//
//const MyProgress = React.createClass({
//    getInitialState() {
//        return {
//            percent: 0,
//        };
//    },
//    increase() {
//        let percent = this.state.percent + 10;
//        if (percent > 100) {
//            percent = 100;
//        }
//        this.setState({percent});
//    },
//    decline() {
//        let percent = this.state.percent - 10;
//        if (percent < 0) {
//            percent = 0;
//        }
//        this.setState({percent});
//    },
//    render() {
//        return (
//            <div>
//                <Progress type="circle" percent={this.state.percent}/>
//                <ButtonGroup>
//                    <Button onClick={this.decline} icon="minus"/>
//                    <Button onClick={this.increase} icon="plus"/>
//                </ButtonGroup>
//            </div>
//        );
//    },
//});

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


        api.generateAPI({api_id: '58a2a06d4352e018fc3bbdad'}, function (res) {
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

        return (
            <div >

                <Spin spinning={this.state.loading}>

                    <Card style={{ width: 700 }}>
                        <p>已经创建api:</p>
                        <p>http://127.0.0.1:3001/api/articles/getArticles?api_id=62b6ea116736e118731d8ec86ed778aa</p>
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