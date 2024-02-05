/**
* ****************************************************************************
* DUNGNT ADD
* AdminGuard.js 
* 
* description		:	
* created at		:	2023-07-09 
* created by		:	DungNT 
* package			:	src/router/guards/AdminGuard.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/

export const AdminGuard = async (guardArgs, route) => {
    const isLogin = localStorage.getItem("token");
    if (isLogin) {
        return true;
    }
    return false;
};