/**
 * Created by liujinhe on 17/2/15.
 */

import React from 'react';
import {Link,browserHistory} from 'react-router';
import {Alert,Progress} from 'antd'
class success extends React.PureComponent {
    constructor(props) {
        super(props);
        this.countDown=this.countDown.bind(this);
        this.state={secs:(this.props.secs||5)};

        console.log();

    }

    componentDidMount() {
        //this.timeOut(this.props.secs||5)

        this.countDown(this.state.secs);
    }

    componentWillUnmount() {

    }


    onChange(state) {

    }

    countDown(secs){

        let that=this;

        setTimeout(function () {
            that.setState({secs:--secs});
            if(secs==0){
                console.log('that.props.path    :'+that.props.path);
                browserHistory.push(that.props.path);

                return;

            }
            that.countDown(secs)

        },1000)
    }


    render() {

        console.log('this.state.secs    :'+this.state.secs);
        return (
            <div style={{ display: 'flex',flexDirection: 'column', alignItems: 'center'}}>

                <Alert
                    message={this.props.title?this.props.title:"Success Text"}
                    description={this.props.desc?this.props.desc:"Success Description Success Description Success Description"}
                    type="success"
                    style={{ minWidth:'600px'}}
                    />
                <Progress type="circle" percent={this.state.secs*20} format={()=>this.state.secs} />

            </div>
        );
    }
}

export default success;