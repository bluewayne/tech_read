/**
 * Created by liujinhe on 16/12/2.
 */

import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

class statement extends React.Component {
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
            <View style={{marginTop:70,padding:20,color:'#5c5c5c'}}>
                <Text>Hi all,</Text>
                <Text style={{marginLeft:40,marginRight:40,marginTop:90,marginBottom:90,color:'#5c5c5c'}}>该App为独立的个人项目。旨在为学习前端的同学,爱好者和人开发人员，提供相关学习资料。
                    每篇文章都注明了作者与来源，如有相关渠道和作者对此认为有侵犯起著作权或者版权请联系ljhjay1@163.com .</Text>

                <Text>best regards{'\n'}</Text>

                <Text>bruce liu</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({});

export default statement;