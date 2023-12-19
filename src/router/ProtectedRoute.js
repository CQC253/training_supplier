import { useEffect, useState } from 'react';
import {
    matchPath
} from 'react-router-dom';
import CustomRoute from './CustomRoute';
/**
* ****************************************************************************
* DUNGNT ADD
* ProtectedRoute.js 
* 
* description		:	
* created at		:	2023-07-09 
* created by		:	DungNT 
* package			:	src/router/ProtectedRoute.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/ 
export const ProtectedRoute = ({
    fallback,
    route,
    guards,
    ...rest
}) => {
    const [canAccess, setCanAccess] = useState(true)
    useEffect(() => {
        checkAsync()
    }, [])

    const checkAsync = async () => {
        const {
            pathname,
        } = window.location;
        const matchResult = matchPath(pathname, rest);
        const hasMatchedRoute = !!matchResult;
        if (hasMatchedRoute) {
            const guardArgs = rest;
            const canBeRendered = await asyncEvery(route?.guards, async (guard) => await guard(guardArgs, route));
            if (route?.guards?.length && !canBeRendered) {
                setCanAccess(false)
            } else {
                setCanAccess(true)
            }
        }
    }
    // Handle callback if can not pass
    if (!canAccess) {
        const fallbackArgs = rest;
        return route?.fallback(fallbackArgs);
    }
    const asyncEvery = async (arr, predicate) => {
        for (let e of arr) {
            if (!(await predicate(e))) {
                return false;
            }
        }
        return true;
    };

    return (
        <CustomRoute path={route.path} exact Layout={route.layout} route={route} >
            {route.component}
        </CustomRoute>
    );
};