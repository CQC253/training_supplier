const prefix = "/";
/**
* ****************************************************************************
* DUNGNT ADD
* RouterPath.js 
* 
* description		:	
* created at		:	2023-07-09 
* created by		:	DungNT 
* package			:	src/router/RouterPath.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/ 
export default class RouterPath {
    static HOME = prefix + '';
    static LOGIN = '/login';

    static getRouteWithId (path, id) {
        return path.replace(":id", id)
    }

    static SUPPLIER = '/supplier'
    static SUPPLIER_OVERVIEW = '/supplier/overview'
    static SUPPLIER_CATEGORY = '/supplier/category'
    static SUPPLIER_LIST = '/supplier/list'
    static SUPPLIER_ORDER_HISTORY = '/supplier/order_history'
    static SUPPLIER_QUOTATION = '/supplier/quotation'
    static SUPPLIER_TRACKING_HISTORY = '/supplier/tracking_history'
}