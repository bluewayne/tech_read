/**
 * Created by liujinhe on 16/11/24.
 */

import React from 'react';
import {View,StyleSheet} from 'react-native';

import Utils from '../common/utils.js'

class hr extends React.Component {
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
            <View style={styles.hr}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    hr:{
        height:1,
        backgroundColor:"#EEE",
        marginTop: 10,
        marginBottom: 10,
    }


});

export default hr;