/**
 * Created by liujinhe on 16/11/28.
 */

import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import serviceData from '../assets/data/service.js';


class service extends React.Component {
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

        let c=1;
        let serviceArray=[];
        serviceData.forEach(function (e) {
            let view =<Text style={styles.text} key={c}>{e}</Text>
            serviceArray.push(view);
            c++;
        });


        return (
            <View >
                {serviceArray}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text:{
        padding:10
    }

});

export default service;