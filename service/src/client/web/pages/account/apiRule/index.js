/**
 * Created by liujinhe on 17/2/17.
 */

import React from 'react';
import {Link} from 'react-router';

import { Collapse ,Button} from 'antd';
import APIList from './apiList'

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
                        <Link to={`/account/apiCreate`}>创建新API</Link>
                    </Button>
                </div>


                <br/>
                <Collapse defaultActiveKey={['1']} onChange={callback}>
                    <Panel header="查看已创建的API" key="1">
                        <APIList/>
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