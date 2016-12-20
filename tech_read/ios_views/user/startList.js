/**
 * Created by liujinhe on 16/11/24.
 */

import React from 'react';
import {View,StyleSheet,ScrollView,ListView,TouchableOpacity,Image,RefreshControl,Text,ActivityIndicator,TextInput} from 'react-native';
import Utils from '../common/utils.js'
import Twebview from '../components/twebview.js'
import Toast from 'react-native-root-toast';


class startList extends React.Component {
    constructor(props) {
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});

        this.state = {
            isRefreshed: false,
            dataArticles: [],
            dataSource: ds.cloneWithRows([])};
    }

    componentDidMount() {
        this._fetchData(1);

    }

    componentWillUnmount() {
    }


    _fetchData(page_now) {


        let url = 'http://localhost:3000/users/getStarList?user_id=' + this.props.user_id;//

        let that = this;


        Utils.ajax(url, function (data) {

            if (data.status == 0) {
                console.log('status : ' + data.status);

                let articles = data.content;

                console.log('articles   :'+JSON.stringify(articles));

                if (articles.length < 1) {

                    Toast.show('没有更多文章了', {
                        position: Toast.positions.BOTTOM,
                        shadow: true,
                        animation: true,
                        hideOnPress: true,
                        delay: 0
                    })
                }

                let ds = new ListView.DataSource({rowHasChanged: (r1, r2)=>r1 !== r2});


                that.setState({
                    isRefreshed: true,
                    dataArticles: articles,
                    dataSource: ds.cloneWithRows(articles)
                });

            }
        }, function (err) {
            console.log('get a error1');
        });

    }


    _showDetail(url, name) {

        console.log('come to showDetail :' + url + '   ' + name);

        this.props.navigator.push({
            component: Twebview,
            title: name,
            barTintColor: "#fff",
            passProps: {
                url: url, isMargin: 1
            }
        })
    }

    _onReachRefresh() {
        console.log('_onReachRefresh....');
    }

    onChange(state) {

    }

    render() {

        console.log('this.state.dataSource  :' + JSON.stringify(this.state.dataSource));

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

                renderRow={(rowData)=> <TouchableOpacity style={styles.list_item}  onPress={this._showDetail.bind(this,rowData.url,rowData.title)}>
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

export default startList;