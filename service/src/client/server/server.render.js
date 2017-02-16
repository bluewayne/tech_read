/**
 * Created by liujinhe on 17/2/7.
 */

import {server} from 'universal-webpack'
import setting from '../../../webpack/universal-webpack-settings.js'

import webpackConfig from '../../../webpack/webpack.config1.js'

server(webpackConfig,setting)