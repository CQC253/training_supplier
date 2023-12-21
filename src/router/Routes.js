
import HomePage from "pages/home/HomePage";
import LoginLayout from "shared/components/layout/LoginLayout";
import MainLayout from "shared/components/layout/MainLayout";
import { AdminGuard } from "./guards/AdminGuard";
import { GuestGuard } from "./guards/GuestGuard";
import LoginPage from "pages/login/LoginPage";
import SupplierListPage from "pages/supplier/SupplierListPage";
import SupplierListDetail from "shared/containers/supplier_detail/SupplierListDetail";
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
        layout: MainLayout,
        routes: [
            {
                id: 'HOME',
                guards: [AdminGuard],
                component: <HomePage />,
                fallback: () => {
                    return null;
                }
            }
        ]
    },
    {
        layout: LoginLayout,
        routes: [
            {
                id: 'LOGIN',
                guards: [GuestGuard],
                component: <LoginPage />,
                fallback: () => {
                    return null;
                }
            }
        ]
    },
    {
        layout: MainLayout,
        routes: [
            {
                id: 'SUPPLIER',
                guards: [GuestGuard],
                component: <HomePage />,
                fallback: () => {
                    return null;
                }
            }
        ]
    },
    {
        layout: MainLayout,
        routes: [
            {
                id: 'SUPPLIER_OVERVIEW',
                guards: [GuestGuard],
                component: <HomePage />,
                fallback: () => {
                    return null;
                }
            }
        ]
    },
    {
        layout: MainLayout,
        routes: [
            {
                id: 'SUPPLIER_CATEGORY',
                guards: [GuestGuard],
                component: <HomePage />,
                fallback: () => {
                    return null;
                }
            }
        ]
    },
    {
        layout: MainLayout,
        routes: [
            {
                id: 'SUPPLIER_LIST',
                guards: [GuestGuard],
                component: <SupplierListPage />,
                fallback: () => {
                    return null;
                }
            }
        ]
    },
    {
        layout: MainLayout,
        routes: [
            {
                id: 'SUPPLIER_LIST_DETAIL',
                guards: [GuestGuard],
                component: <SupplierListDetail />,
                fallback: () => {
                    return null;
                }
            }
        ]
    },
    {
        layout: MainLayout,
        routes: [
            {
                id: 'SUPPLIER_ORDER_HISTORY',
                guards: [GuestGuard],
                component: <HomePage />,
                fallback: () => {
                    return null;
                }
            }
        ]
    },
    {
        layout: MainLayout,
        routes: [
            {
                id: 'SUPPLIER_QUOTATION',
                guards: [GuestGuard],
                component: <HomePage />,
                fallback: () => {
                    return null;
                }
            }
        ]
    },
    {
        layout: MainLayout,
        routes: [
            {
                id: 'SUPPLIER_TRACKING_HISTORY',
                guards: [GuestGuard],
                component: <HomePage />,
                fallback: () => {
                    return null;
                }
            }
        ]
    },
];

export default Routes