/**
 * Created by liujinhe on 17/2/7.
 */

import {server_configuration} from 'universal-webpack'
import setting from '../universal-webpack-settings.js'
import webpackConfig from '../webpack.config.js'

//console.log(JSON.stringify(server_configuration(webpackConfig,setting)) )

let config=server_configuration(webpackConfig,setting);

export default config
