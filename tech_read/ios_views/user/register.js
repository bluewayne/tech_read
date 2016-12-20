/**
 * Created by liujinhe on 16/12/5.
 */

import React from 'react';
import {View,Text,StyleSheet,Alert,Image,Button,TextInput,TouchableOpacity} from 'react-native';

import Utils from '../common/utils.js'
import SettingPage from '../setting/settingPage.js'
import Toast from 'react-native-root-toast';


class register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {capNum: '', capacha: '', inputCapNum: '', inputEmail: '', inputPassword: '', confirmPassword: ''};
    }

    componentDidMount() {
        this._getCapacha();
    }

    onChange(state) {

    }

    _register() {

        var inputEmail = this.state.inputEmail;
        var inputPassword = this.state.inputPassword;
        var confirmPassword = this.state.confirmPassword;
        var inputCapNum = this.state.inputCapNum;

        var that = this;

        if (inputCapNum != this.state.capNum) {
            Alert.alert(
                'Alert Title',
                '验证码不正确',
                [
                    {text: 'ok', onPress: () => console.log('OK Pressed!')}
                ]
            )

        } else if (confirmPassword != inputPassword) {
            Alert.alert(
                'Alert Title',
                '两次密码输入不一样',
                [
                    {text: 'ok', onPress: () => console.log('OK Pressed!')}
                ]
            )
        } else {

            var url = 'http://localhost:3000/users/register?' + 'email=' + inputEmail + '&password=' + inputPassword

            Utils.ajax(url, function (res) {

                if (res.status == 0) {
                    let user = res.content;
                    Utils.user = user;
                    Toast.show('注册成功!', {
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0
                    })

                    that.props.navigator.popToTop();
                } else {
                    console.log('get error ' + res.errors);

                    Alert.alert(
                        'Alert Title',
                        res.errors.toString(),
                        [
                            {text: 'ok', onPress: () => console.log('OK Pressed!')}
                        ]
                    )
                }
            }, function () {
                console.log('get error2 ');

            })

        }


    }

    _getCapacha() {

        var url = 'http://localhost:3000/users/getCapacha';

        var that = this;

        Utils.ajax(url, function (res) {

            if (res.status == 0) {
                let capNum = res.content.capNum;
                let capacha = res.content.capacha;

                that.setState({capNum: capNum, capacha: capacha});

                console.log('capNum :' + capNum);
                console.log('capacha :' + capacha);

            } else {

                console.log('get error ' + res.errors);
            }
        }, function () {

        })

    }


    render() {

        return (
            <View>

                <TouchableOpacity style={styles.logo_container}>
                    <Image resizeMode='contain' source={require('../assets/image/coding.jpg')}
                           style={styles.logo}/>
                </TouchableOpacity>

                <View >

                    <TextInput placeholder='请输入邮箱' placeholderTextColor="#5e6877" value={this.state.inputEmail}
                               onChangeText={(text)=>this.setState({inputEmail:text})} style={styles.textInput}
                               autoCapitalize={'none'}/>

                    <TextInput placeholder='请输入密码' placeholderTextColor="#5e6877" value={this.state.inputPassword}
                               onChangeText={(text)=>this.setState({inputPassword:text})} style={styles.textInput}
                               password={true} autoCapitalize={'none'}/>

                    <TextInput placeholder='请重复密码' placeholderTextColor="#5e6877" value={this.state.confirmPassword}
                               onChangeText={(text)=>this.setState({confirmPassword:text})} style={styles.textInput}
                               password={true} autoCapitalize={'none'}/>
                </View>

                <View style={{flexDirection:'row'}}>

                    <Image resizeMode='cover' source={{uri:this.state.capacha}} style={{height:35,flex:1}}/>

                    <TextInput placeholder='请输入验证码' value={this.state.inputCapNum}
                               onChangeText={(text) => this.setState({inputCapNum: text})}

                               placeholderTextColor="#5e6877" style={{flex:1,height:35}}/>

                </View>

                <View style={{alignItems:'center',marginBottom:30}}>
                    <TouchableOpacity
                        style={{width:150,paddingTop:10,paddingBottom:10,borderRadius:5,borderWidth:1,borderColor:'#00A0E9',backgroundColor:'#FFF'}}
                        onPress={this._register.bind(this)}>
                        <Text style={{alignSelf:'center',color:'#00A0E9',fontSize:17}}>注册</Text>
                    </TouchableOpacity>

                </View>

            </View>


        );
    }
}

const styles = StyleSheet.create({

    textInput: {
        height: 35,
        borderRadius: 3,
        borderColor: "#EEE",
        padding: 10,
        margin: 10,
        borderWidth: 1
    },
    logo_container: {
        alignItems: 'center'
    },
    logo: {
        width: 200,
        height: 250
    }

});

export default register;