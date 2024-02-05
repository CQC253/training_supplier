
import HomePage from "pages/home/HomePage";
import LoginLayout from "shared/components/layout/LoginLayout";
import MainLayout from "shared/components/layout/MainLayout";
import { AdminGuard } from "./guards/AdminGuard";
import { GuestGuard } from "./guards/GuestGuard";
import LoginPage from "pages/login/LoginPage";
import SupplierListPage from "pages/supplier/SupplierListPage";
import SupplierListDetail from "shared/containers/supplierDetail/SupplierListDetail";
import SupplierCreate from "shared/containers/supplierCreate/SupplierCreate"
import SupplierCategory from "shared/containers/category/SupplierCategory"
import SupplierUpdate from "shared/containers/supplierUpdate/SupplierUpdate";
import { Redirect } from "react-router-dom/cjs/react-router-dom";
import RouterPath from "./RouterPath";
/**
* ****************************************************************************
* DUNGNT ADD
* Routes.js 
* 
* description		:	
* created at		:	2023-07-09 
* created by		:	DungNT 
* package			:	src/router/Routes.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/

const Routes = [
    {
        layout: LoginLayout,
        routes: [
            {
                id: 'LOGIN',
                guards: [GuestGuard],
                component: <LoginPage />,
                fallback: () => {
                    return <Redirect to={RouterPath.HOME}/>;
                }
            }
        ]
    },
    {
        layout: MainLayout,
        routes: [
            {
                id: 'SUPPLIER_LIST_DETAIL',
                guards: [AdminGuard],
                component: <SupplierListDetail />,
                fallback: () => {
                    return <Redirect to={RouterPath.LOGIN}/>;
                }
            },
            {
                id: 'SUPPLIER_LIST_UPDATE',
                guards: [AdminGuard],
                component: <SupplierUpdate />,
                fallback: () => {
                    return <Redirect to={RouterPath.LOGIN}/>;
                }
            },
            {
                id: 'SUPPLIER_LIST_CREATE',
                guards: [AdminGuard],
                component: <SupplierCreate />,
                fallback: () => {
                    return <Redirect to={RouterPath.LOGIN}/>;
                }
            },
            {
                id: 'SUPPLIER_CATEGORY',
                guards: [AdminGuard],
                component: <SupplierCategory />,
                fallback: () => {
                    return <Redirect to={RouterPath.LOGIN}/>;
                }
            },
            {
                id: 'SUPPLIER_LIST',
                guards: [AdminGuard],
                component: <SupplierListPage />,
                fallback: () => {
                    return <Redirect to={RouterPath.LOGIN}/>;
                }
            },
            {
                id: 'SUPPLIER_OVERVIEW',
                guards: [AdminGuard],
                component: <HomePage />,
                fallback: () => {
                    return <Redirect to={RouterPath.LOGIN}/>;
                }
            },
            {
                id: 'SUPPLIER_ORDER_HISTORY',
                guards: [AdminGuard],
                component: <HomePage />,
                fallback: () => {
                    return <Redirect to={RouterPath.LOGIN}/>;
                }
            },
            {
                id: 'SUPPLIER_QUOTATION',
                guards: [AdminGuard],
                component: <HomePage />,
                fallback: () => {
                    return <Redirect to={RouterPath.LOGIN}/>;
                }
            },
            {
                id: 'SUPPLIER_TRACKING_HISTORY',
                guards: [AdminGuard],
                component: <HomePage />,
                fallback: () => {
                    return <Redirect to={RouterPath.LOGIN}/>;
                }
            },
            {
                id: 'SUPPLIER',
                guards: [AdminGuard],
                component: <HomePage />,
                fallback: () => {
                    return <Redirect to={RouterPath.LOGIN}/>;
                }
            },
            {
                id: 'HOME',
                guards: [AdminGuard],
                component: <HomePage />,
                fallback: () => {
                    return <Redirect to={RouterPath.LOGIN}/>;
                }
            }
        ]
    },
];

export default Routes