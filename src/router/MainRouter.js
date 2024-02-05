import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CustomRoute from './CustomRoute';
import { ProtectedRoute } from './ProtectedRoute';
import RouterPath from "./RouterPath";
import Routes from './Routes';

const Layout = ({ layout: LayoutComponent, routes }) => {
    const paths = routes.map(x => RouterPath[x.id]);
    const layout = <LayoutComponent children={<Switch>
        {
            routes.map((route, index) => {
                route.path = RouterPath[route.id] ?? '';
                return route?.guards?.length > 0 ? <ProtectedRoute
                    key={index}
                    path={route.path}
                    route={route}
                >
                    {route.component}
                </ProtectedRoute> : <CustomRoute key={index} path={route.path} route={route}>
                    {route.component}
                </CustomRoute>
            })
        }
    </Switch>} />;
    return <Route path={paths} children={layout} exact />
}
/**
* ****************************************************************************
* DUNGNT ADD
* MainRouter.js 
* 
* description		:	
* created at		:	2023-07-09 
* created by		:	DungNT 
* package			:	src/router/MainRouter.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/ 
function MainRouter (props) {   

    return (
        <Router>
            <Suspense fallback={<div >Loading ...</div>}>
                <Route path={[...Routes].reduce((total, value) => {
                    return total.concat(value.routes);
                }, []).map(x => RouterPath[x.id])} >
                    {Routes.map((x, i) => <Layout key={i} {...x} />)}
                </Route>
            </Suspense>
        </Router>
    )
}
export default MainRouter;