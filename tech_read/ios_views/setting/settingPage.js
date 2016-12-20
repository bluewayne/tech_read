/**
 * Created by liujinhe on 16/11/25.
 */



import React from 'react';
import {View,StyleSheet,Image,Text,TouchableOpacity,NavigatorIOS,Alert,Button} from 'react-native';

import HR from '../components/hr.js'

import Utils from '../common/utils';
import Statement from './statement.js'
import Register from '../user/register.js'
import Login from '../user/login.js'
import StartList from '../user/startList.js'

class settingView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: Utils.user
        };
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    onChange(state) {

    }

    _showDetail(module, title, args) {

        this.props.navigator.push({
            component: module,
            title: title,
            barTintColor: '#fff',
            passProps: args || {}
        });
    }

    render() {
        var loginPanel = [];
        var exitPanel = [];

        console.log('settingPage :' + Utils.user);

        if (Utils.user) {
            loginPanel = (<View>
                    <Text style={{alignSelf:'center',color:'#00A0E9',fontSize: 17}}>hello, {Utils.user.email}</Text>
                    <HR/>
                    <TouchableOpacity onPress={()=>{this._showDetail(StartList,'你的收藏',{user_id:Utils.user._id})}}><Text
                        style={{marginTop: 10,marginBottom: 10,marginLeft: 20,fontSize: 17,color: '#00A0E9'}}>你的收藏(未开发)</Text></TouchableOpacity>
                </View>
            );

            exitPanel = (
                <View style={{alignItems:'center',marginTop:30}}><TouchableOpacity
                    style={{width:200,paddingTop:10,paddingBottom:10,borderRadius:5,borderWidth:1,borderColor:'#FF6100',backgroundColor:'#FFF'}}
                    onPress={()=>{Utils.user='';this.setState({user:''})}}>
                    <Text style={{alignSelf:'center',color:'#FF6100',fontSize:17}}>退出</Text>
                </TouchableOpacity></View>
            );
        } else {

            loginPanel = (
                <View style={{alignItems:'center',marginBottom:30}}><TouchableOpacity
                    style={{width:200,paddingTop:10,paddingBottom:10,borderRadius:5,borderWidth:1,borderColor:'#00A0E9',backgroundColor:'#FFF'}}
                    onPress={()=>this._showDetail(Login,'登陆')}>
                    <Text style={{alignSelf:'center',color:'#00A0E9',fontSize:17}}>登陆</Text>
                </TouchableOpacity></View>
            )
        }

        return (
            <View >
                <TouchableOpacity style={styles.logo_container}>
                    <Image resizeMode='cover' source={require('../assets/image/coding.jpg')}
                           style={styles.logo}/>
                </TouchableOpacity>
                {loginPanel}
                <HR/>

                <TouchableOpacity onPress={()=>{this._showDetail(Statement,'app说明')}}><Text
                    style={styles.text_layout}>说明</Text></TouchableOpacity>
                <HR/>


                <TouchableOpacity onPress={()=>{Alert.alert('邮箱地址','ljhjay1@163.com',[{text: '好的'} ])}}><Text
                    style={styles.text_layout}>关于</Text></TouchableOpacity >
                <HR/>

                {exitPanel}

            </View >
        );
    }
}


class settingPage extends React.Component {

    render() {
        return (
            <NavigatorIOS
                initialRoute={{
                component: settingView,
                title: '设置',
                navigationBarHidden: true
            }} style={{flex:1}}/>
        );
    }

}

const styles = StyleSheet.create({
    container: {},
    logo_container: {
        alignItems: 'center'
    },
    logo: {
        width: 200,
        height: 250
    },
    text_layout: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 20,
        fontSize: 17,
        color: '#5e5e5e'
    }

});

export default settingPage;