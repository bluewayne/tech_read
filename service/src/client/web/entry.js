/**
 * Created by liujinhe on 17/2/6.
 */

import ReactDOM from 'react-dom';
import routes from './routes.js';
import React from 'react';

ReactDOM.render(
    <div>
        {routes}
    </div>, document.getElementById('app')
)

if (module.hot) {
    module.hot.accept();
}
