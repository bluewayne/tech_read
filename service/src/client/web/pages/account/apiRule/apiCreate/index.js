/**
 * Created by liujinhe on 17/2/13.
 */

import React from 'react';
import {Link} from 'react-router';

import {Steps,Button,Message} from 'antd'
const Step = Steps.Step;

import Step1 from './step1.js'
import Step2 from './step2.js'
import Step3 from '../../../success.js'

const ruleList = (<div></div>);

const steps = [{
    title: 'First',
    content: (<Step1/>),
}, {
    title: 'Second',
    content: (<Step2/>),
}, {
    title: 'Last',
    content: (<Step3 title='成功' desc='api创建成功'  path='/account/apiRule'/>),
}];


class APISteps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
    }

    next() {
        const current = this.state.current + 1;
        this.setState({current});
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({current});
    }

    render() {
        const { current } = this.state;
        return (
            <div style={{maxWidth:'800px', margin:'0px auto 0px' }}>
                <Steps current={current}>
                    {steps.map(item => <Step key={item.title} title={item.title}/>)}
                </Steps>

                <div className="steps-content" style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <div style={{maxWidth:'600px',minHeight:'400px',display: 'flex',alignItems: 'center' }}>
                        {steps[this.state.current].content}

                    </div>
                </div>
                <div className="steps-action" style={{display:'flex',justifyContent: 'flex-end'}}>
                    {
                        this.state.current < steps.length - 1
                        &&
                        <Button type="primary" onClick={() => this.next()}>Next</Button>
                    }
                    {
                        this.state.current === steps.length - 1
                        &&
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
                    }
                    {
                        this.state.current > 0
                        &&
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            Previous
                        </Button>
                    }
                </div>
            </div>
        );
    }
}

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
                <APISteps/>
            </div>
        );
    }
}

export default index;