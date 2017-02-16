/**
 * Created by liujinhe on 17/2/15.
 */

import React from 'react';
import {Link} from 'react-router';

import { Collapse ,Button} from 'antd';
import RuleList from './ruleList'

const Panel = Collapse.Panel;

function callback(key) {
    console.log(key);
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
                <div style={style.buttonContainer}>
                    <Button type="primary" style={style.createButton}>
                        <Link to={`/account/ruleCreate`}>创建新规则</Link>
                    </Button>
                </div>


                <br/>
                <Collapse defaultActiveKey={['1']} onChange={callback}>
                    <Panel header="查看已创建的规则" key="1">
                        <RuleList/>
                    </Panel>

                </Collapse>
            </div>
        );
    }
}

const style={
    buttonContainer:{
        padding:'20px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    createButton:{
        width:'50%',
        padding:'10px'

    }

}

export default index;