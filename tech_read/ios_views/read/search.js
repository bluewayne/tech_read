/**
 * Created by liujinhe on 16/11/24.
 */

import React from 'react';
import {View,StyleSheet,TextInput,AlertIOS,Text} from 'react-native';
import ArticleList from './articleList.js';

class search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {navigator: props.navigator};
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    onChange(state) {

    }

    _search(keyWord) {
        if (!keyWord) {
            AlertIOS.alert('提示', '你尚未输入搜素的信息');
        } else {
            this.state.navigator.push({
                component: ArticleList,
                barTintColor: "fff",
                title: "搜索",
                passProps: {keyWord: keyWord}
            });
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <TextInput style={styles.textInput}
                           placeholder="搜索"
                           onSubmitEditing={(event)=> {
                        this._search(event.nativeEvent.text);
                    }}
                           placeholderTextColor="#5e6877"
                           autoCapitalize={'none'}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    },
    textInput: {
        height: 35,
        borderRadius: 3,
        borderColor: "#EEE",
        padding: 10,
        margin: 10,
        borderWidth: 1

    }

});

export default search;