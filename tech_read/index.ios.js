/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TabBarIOS
} from 'react-native';

import ReadPage from './ios_views/read/readPage.js';
import SettingPage from './ios_views/setting/settingPage.js';

var img1_base64 = 'data:image/png;base64,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JXRFWHRkYXRlOmNyZWF0ZQAyMDE1LTA3LTI1VDIxOjUwOjE1KzA4OjAwwyLYKQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNC0wNi0wOVQxNzozMTo1NCswODowMPhlmTcAAABOdEVYdHNvZnR3YXJlAEltYWdlTWFnaWNrIDYuOC44LTEwIFExNiB4ODZfNjQgMjAxNS0wNy0xOSBodHRwOi8vd3d3LmltYWdlbWFnaWNrLm9yZwUMnDUAAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADUxMo+NU4EAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgANTEyHHwD3AAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxNDAyMzA2MzE0BKkgvwAAABN0RVh0VGh1bWI6OlNpemUANy42NktCQr2aH/cAAABadEVYdFRodW1iOjpVUkkAZmlsZTovLy9ob21lL3d3d3Jvb3Qvd3d3LmVhc3lpY29uLm5ldC9jZG4taW1nLmVhc3lpY29uLmNuL3NyYy8xMTY5My8xMTY5MzI2LnBuZ+9YE8gAAAAASUVORK5CYII=';
var img4_base64 = 'data:image/png;base64,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KwM6dwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNC0wNS0wNFQyMTo0NDo1MyswODowMIRIR4gAAABOdEVYdHNvZnR3YXJlAEltYWdlTWFnaWNrIDYuOC44LTEwIFExNiB4ODZfNjQgMjAxNS0wNy0xOSBodHRwOi8vd3d3LmltYWdlbWFnaWNrLm9yZwUMnDUAAABjdEVYdHN2Zzpjb21tZW50ACBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIHILdZYAAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6SGVpZ2h0ADUzM8q8AZUAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgANTMzWU1RyAAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxMzk5MjExMDkzQpBh+QAAABN0RVh0VGh1bWI6OlNpemUAMTAuMUtCQirRrdwAAABadEVYdFRodW1iOjpVUkkAZmlsZTovLy9ob21lL3d3d3Jvb3Qvd3d3LmVhc3lpY29uLm5ldC9jZG4taW1nLmVhc3lpY29uLmNuL3NyYy8xMTYwMi8xMTYwMjA2LnBuZ2hohJkAAAAASUVORK5CYII=';


export default class tech_read extends Component {

    constructor(props) {
        super();
        this.state = {
            tabActive: 'read'
        }
    }

    _tabChange(tabName) {

        this.setState({tabActive: tabName});

    }

    render() {
        console.log('hello world!!!');

        return (
            <TabBarIOS>
                <TabBarIOS.Item title='阅读' icon={{uri:img1_base64,scale:3.5}} onPress={this._tabChange.bind(this,'read')}
                                selected={this.state.tabActive=='read'}>
                    <ReadPage/>
                </TabBarIOS.Item>
                <TabBarIOS.Item title='个人' icon={{uri:img4_base64,scale:3.5}} onPress={this._tabChange.bind(this,'setting')}
                                selected={this.state.tabActive=='setting'}>
                    <SettingPage/>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('tech_read', () => tech_read);
