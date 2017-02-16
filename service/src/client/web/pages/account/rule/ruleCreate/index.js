/**
 * Created by liujinhe on 17/2/10.
 */

import React from 'react';
import {Link} from 'react-router';
import RulePanel from './RulePanel'
class index extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {createSuccess:true};
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
                <RulePanel/>
            </div>
        );
    }
}

export default index;