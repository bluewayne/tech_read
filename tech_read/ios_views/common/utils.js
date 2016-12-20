/**
 * Created by liujinhe on 16/11/24.
 */

import {Dimensions,PixelRatio} from 'react-native'


//tool类

module.exports = {
    user:'',
    ajax: function (url, successCallback, failCallback) {
        fetch(url).then((res)=>res.text())
            .then(function (resText) {
                successCallback(JSON.parse(resText));
            }).catch(function (err) {
                failCallback(err);
            })
    },
    size: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },

    pixel: 1 / PixelRatio.get()

}