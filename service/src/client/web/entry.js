/**
 * Created by liujinhe on 17/2/6.
 */

import ReactDOM from 'react-dom';
import routes from './routes.js';
import React from 'react';

const render = (routes)=> {
    console.log('render.......');

    ReactDOM.render(
        <div>
            {routes}
        </div>, document.getElementById('app')
    )
}

render(routes);

if (module.hot) {
    module.hot.accept('./routes', () => {
        const newRoutes = require('./routes').default;
        render(newRoutes);
    });
}
