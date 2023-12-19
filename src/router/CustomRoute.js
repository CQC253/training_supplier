import { Route } from 'react-router-dom';
/**
* ****************************************************************************
* DUNGNT ADD
* CustomRoute.js 
* 
* description		:	
* created at		:	2023-07-09 
* created by		:	DungNT 
* package			:	src/router/CustomRoute.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/ 
function CustomRoute (props) {
    return (
        <Route path={props.route.path} exact {...props.rest}>
            {props.children}
        </Route>
    )
}
export default CustomRoute;