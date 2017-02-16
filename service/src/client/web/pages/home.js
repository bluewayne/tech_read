/**
 * Created by liujinhe on 17/2/7.
 */

import React from 'react';
import {Link} from 'react-router';

class home extends React.PureComponent {
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

        const markup=(<div>{this.props.children}</div>)

        return markup;
    }
}

if (module.hot) {
    module.hot.accept();
}

export default home;