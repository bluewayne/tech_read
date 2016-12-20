/**
 * Created by liujinhe on 16/11/23.
 */

import React from 'react';
import {StyleSheet,View,WebView,Text} from 'react-native';


class twebview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.url,
            isError: false,
            isMargin: this.props.isMargin
        };

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    onChange(state) {

    }

    _showError() {
        this.setState({
            isError: true
        })
    }

    render() {
        let viewContent;

        if (this.state.isError) {
            viewContent = <View style={styles.errorInfo}>
                <Text style={styles.text}>网络出现问题...</Text>
            </View>;
        } else {
            viewContent = <WebView
                source={{uri:this.state.url}}
                startInLoadingState={true}
                onError={this._showError.bind(this)}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                scalesPageToFit={true}
                style={{marginTop: this.state.isMargin || -20}}/>;
        }


        return (
            <View style={styles.container}>
                {viewContent}
            </View>

        );
    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    errorInfo: {
        flex: 1,
        justifyContent: 'center',//justify-content属性定义了项目在主轴上的对齐方式。
        alignItems: 'center'//align-items属性定义项目在交叉轴上如何对齐。
    },
    text: {
        fontSize: 16,
        fontWeight: '600'//给字体加粗,http://www.w3school.com.cn/cssref/pr_font_weight.asp
    }

});


export default twebview;
