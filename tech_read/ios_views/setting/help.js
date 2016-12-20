/**
 * Created by liujinhe on 16/11/28.
 */

import React from 'react';
import {View,StyleSheet,Text} from 'react-native';

import qa from '../assets/data/QA.js'

class help extends React.Component {
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

        var qaArray = [];
        let a=1;
        qa.forEach(function (e) {
            console.log('e  :'+JSON.stringify(e));
            let view = (<View key={a}>
                <Text style={styles.qa_text}>{e.q}</Text>
                <Text style={styles.qa_text}>{e.a}</Text>
            </View>);
            a++;
            qaArray.push(view);
        });


        return (
            <View >
                {qaArray}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    qa_view:{

    },
    qa_text:{
        padding:10,
        fontSize:20
    }

});

export default help;