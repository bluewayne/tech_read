/**
 * Created by liujinhe on 16/12/8.
 */

import React from 'react';
import {View,Text,StyleSheet,ScrollView,Alert,Image,Button,TextInput,TouchableOpacity,WebView} from 'react-native';

import Utils from '../common/utils.js'
import Twebview from '../components/twebview.js'

class article extends React.Component {
    constructor(props) {
        super(props);
        console.log('this.props.article.url :' + this.props.article.url);

        console.log('this.props.article     :' + JSON.stringify(this.props.article));

        this.state = {
            like_count: this.props.article.likeList.length,
            comment_count: this.props.article.commentList.length,
            if_star: false,
            if_like: false
        };
    }

    componentDidMount() {
        this._api('getLikeNum').call(this);

    }

    componentWillUnmount() {

    }

    _api(apiName) {

        switch (apiName) {

            case 'getLikeNum':

                return function () {
                    var that=this;

                    var article_id = this.props.article._id;
                    console.log('http://localhost:3000/articles/getLikeNum' + '?article_id=' + article_id);

                    Utils.ajax('http://localhost:3000/articles/getLikeNum' + '?article_id=' + article_id, function (res) {

                        if (res.status == 0) {

                            let content = res.content;

                            console.log('content    :'+JSON.stringify(content));
                            that.setState({like_count: content.likeNum});

                        } else {

                            console.log('error1 :' + res.errors);
                        }

                    }, function () {

                    });
                }
                break;


            case 'isLike':

                return function () {
                    Utils.ajax('http://localhost:3000/articles/isLike', function (res) {

                        if (res.status == 0) {

                            let article = res.article;
                            if (article) {
                                this.setState({if_like: true});
                            } else {

                                this.setState({if_like: false});
                            }

                        } else {

                            console.log('error1 :' + res.errors);
                        }

                    }, function () {

                    });
                }
                break;
            case 'isStar':
                return function () {
                    Utils.ajax('http://localhost:3000/articles/isStar', function (res) {

                        if (res.status == 0) {

                            let article = res.article;
                            if (article) {
                                this.setState({if_star: true});

                            } else {
                                this.setState({if_star: false});
                            }

                        } else {

                            console.log('error1 :' + res.errors);
                        }

                    }, function () {
                    });
                };
                break;


            case 'cancelStar':
                return function () {
                    Utils.ajax('http://localhost:3000/articles/cancelStar', function (res) {

                        if (res.status == 0) {

                            this.setState({if_star: !this.state.if_star});


                        } else {

                            console.log('error1 :' + res.errors);
                        }

                    }, function () {
                    });
                };

                break;
            case 'markStar':

                return function () {
                    Utils.ajax('http://localhost:3000/articles/markStar', function (res) {

                        if (res.status == 0) {

                            this.setState({if_star: !this.state.if_star});

                        } else {

                            console.log('error1 :' + res.errors);
                        }

                    }, function () {
                    });
                };
                break;
            case 'cancelLike':

                return function () {

                    var article_id = this.props.article._id;
                    console.log('article_id :' + article_id);
                    var user_id = '';


                    if (Utils.user && Utils.user._id) {
                        var user_id = Utils.user._id;

                        console.log('http://localhost:3000/articles/cancelLike' + '?article_id=' + article_id + '&user_id=' + user_id);


                        Utils.ajax('http://localhost:3000/articles/cancelLike' + '?article_id=' + article_id + '&user_id=' + user_id, function (res) {

                            if (res.status == 0) {

                                let article = res.article;
                                if (article) {
                                    this.setState({like_count: article.likeList.length, if_like: !this.state.if_like});
                                }

                            } else {

                                console.log('error1 :' + res.errors);
                            }

                        }, function () {
                        });
                    }


                };
                break;
            case 'markLike':

                return function () {

                    var article_id = this.props.article._id;
                    console.log('article_id :' + article_id);
                    var user_id = '';
                    if (Utils.user && Utils.user._id) {
                        var user_id = Utils.user._id;

                        var that=this;

                        console.log('http://localhost:3000/articles/markLike' + '?article_id=' + article_id + '&user_id=' + user_id);

                        Utils.ajax('http://localhost:3000/articles/markLike' + '?article_id=' + article_id + '&user_id=' + user_id, function (res) {

                            console.log('res.status :' + res.status);

                            if (res.status == 0) {

                                console.log('begin come to getLikeNum  ');

                                let content = res.content;

                                console.log('content :'+JSON.stringify(content));

                                that.setState({if_like: !that.state.if_like,like_count: that.state.like_count+1});

                                that._api('getLikeNum').call(that);

                            } else {

                                console.log('error1 :' + res.errors);
                            }

                        }, function () {
                        });
                    } else {

                        console.log('test 你还没登陆');


                    }

                };
                break;
        }
    }

    onChange(state) {

    }

    _clickLike() {

        console.log('come to _clickLike');

        console.log('this.state.if_like :' + this.state.if_like);

        if (this.state.if_like) {
            this._api('cancelLike').call(this);
        } else {
            this._api('markLike').call(this);
        }

    }

    _clickStar() {
        console.log('come to _clickStar');

        if (this.state.if_star) {
            this._api('cancelStar');
        } else {
            this._api('markStar');
        }

    }

    render() {

        return (

            <View style={{flexDirection:'column',flexGrow:1}}>


                <Twebview url={this.props.article.url} isMargin={1} style={{flexGrow:1}}></Twebview>
                <View style={{marginBottom:50,flexDirection:'row'}}>

                    <TouchableOpacity style={{flex:1}}
                                      onPress={()=>this._clickLike()}><Text
                        style={{alignSelf:'center'}}>点赞{this.state.like_count}</Text></TouchableOpacity>
                    <TouchableOpacity style={{flex:1}}><Text
                        style={{alignSelf:'center'}}>评论{this.state.comment_count}</Text></TouchableOpacity>
                    <TouchableOpacity style={{flex:1}}
                                      onPress={()=>this._clickStar()}><Text
                        style={{alignSelf:'center'}}>{this.state.if_star ? '已收藏' : '未收藏'}</Text></TouchableOpacity>

                </View>
            </View>



        );
    }
}

const styles = StyleSheet.create({});

export default article;