import React from 'react';
import {Route,IndexRoute,Redirect} from 'react-router'

import App from './component/App'
import Index from './component/Index'
import NotFound from './component/404'

export default()=>
    <Route path="/" component={App}>
        <IndexRoute component={Index}/>
        <Route path="*" component={NotFound}></Route>
    </Route>
