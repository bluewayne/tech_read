/**
 * Created by liujinhe on 16/11/24.
 */

import React from 'react';
import {View,StyleSheet,ScrollView,ListView,TouchableOpacity,Image,RefreshControl,Text,ActivityIndicator,TextInput} from 'react-native';
import Utils from '../common/utils.js'
import Twebview from '../components/twebview.js'
import Toast from 'react-native-root-toast';
import Article from './article.js'

class list extends React.Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});

        this.state = {
            isRefreshed: false,
            dataArticles: [],
            dataSource: ds.cloneWithRows([]),
            pageNow: 1
        };

    }

    componentDidMount() {
        this._fetchData(1);

    }

    componentWillUnmount() {
    }


    _fetchData(page_now) {

        let pageNow = page_now;

        let url = 'http://localhost:3000/articles/getArticles?pageNow=' + pageNow + (this.props.keyWord ? "&keyWord=" + this.props.keyWord : "");//

        let that = this;

        if (pageNow == 1) {
            this.setState({isRefreshed: false});
        }

        Utils.ajax(url, function (data) {

            if (data.status == 0) {
                console.log('status : ' + data.status);

                let content = data.content;

                if (content.items.length < 1) {

                    Toast.show('没有更多文章了', {
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0
                    })
                } else {

                    let ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});

                    //let curArticles=this.state.dataArticles.concat(content.items) //

                    let curArticles = that.state.dataArticles;//
                    //console.log('curArticles    :'+JSON.stringify(curArticles));

                    let newArticles = curArticles.concat(content.items);
                    //console.log('newArticles    :'+JSON.stringify(newArticles));


                    pageNow++;
                    that.setState({
                        isRefreshed: true,
                        dataArticles: newArticles,
                        dataSource: ds.cloneWithRows(newArticles),
                        pageNow: pageNow
                    });
                }


            }
        }, function (err) {
            console.log('get a error1');
        });

    }


    _showDetail(rowData) {

        var article = {
            '_id':rowData._id,
            'url': rowData.url,
            'title': rowData.title,
            'from': rowData.from,
            'author': rowData.author,
            'postTime': rowData.postTime,
            'createTime': rowData.createTime,
            'starUserList': rowData.starUserList,//里面是userIname
            'likeList': rowData.likeList,
            'commentList': rowData.commentList
        }
        console.log('come to showDetail article:' + JSON.stringify(article));

        this.props.navigator.push({
            component: Article,
            title: article.title,
            barTintColor: "#fff",
            passProps: {
                article: article
            }
        })
    }

    _onReachRefresh() {
        console.log('_onReachRefresh....');
        this._fetchData(this.state.pageNow)
    }

    onChange(state) {

    }

    render() {


        return (   <ListView
                enableEmptySections={true}
                dataSource={this.state.dataSource}
                onEndReached={this._onReachRefresh.bind(this)}
                onEndReachedThreshold={1}
                refreshControl={
                                <RefreshControl
                                    refreshing={!this.state.isRefreshed}
                                    title="数据在加载中..."
                                    onRefresh={this._fetchData.bind(this,1)}
                                />
                            }

                renderRow={(rowData)=> <TouchableOpacity style={styles.list_item}  onPress={this._showDetail.bind(this,rowData)}>
                            <View style={styles.text_wrapper}>
                                <Text numberOfLines={1} style={styles.list_title}>{rowData.title}</Text>
                              </View>


                            <View style={styles.text_wrapper}>
                                <Text style={styles.list_comment}>作者: {rowData.author}</Text>
                                <Text style={styles.list_comment}>来源: {rowData.from}</Text>
                            </View>
                        </TouchableOpacity>}>
            </ListView>
        );


    }
}

const styles = StyleSheet.create({
    list_item: {
        borderBottomColor: "#EDEDED",
        borderBottomWidth: Utils.pixel,
        padding: 10,
    },

    text_wrapper: {
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row'//如果想偷懒的话，直接写flex:1,
    },
    list_title: {
        fontWeight: "600",
        fontSize: 16
    },
    list_comment: {
        flex: 1,
        fontSize: 10,
        color: '#5e5e5e'
    }
});

export default list;