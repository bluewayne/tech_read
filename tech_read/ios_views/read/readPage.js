/**
 * Created by liujinhe on 16/12/1.
 */

import React from 'react';
import {View,Text,StyleSheet,NavigatorIOS,ActivityIndicator} from 'react-native';

import ArticleList from './articleList.js';
import Search from './search.js';

import Utils from '../common/utils.js'

class readView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }


    onChange(state) {

    }

    render() {

        return (
            <View style={{flex:1}}>
                <Search navigator={this.props.navigator}/>
                <ArticleList navigator={this.props.navigator} />
            </View>
        );
    }
}

const styles = StyleSheet.create({});

class readPage extends React.Component {

    render() {

        return ( <NavigatorIOS
            initialRoute={{
                    component:readView,
                    title:"阅读",
                    navigationBarHidden:true
            }}
            style={{flex:1}}
            />);

    }
}

export default readPage;