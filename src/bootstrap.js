/**
* ****************************************************************************
* DUNGNT ADD
* bootstrap.js 
* 
* description		:	
* created at		:	2023-07-09 
* created by		:	DungNT 
* package			:	src/bootstrap.js  
* copyright			:	Copyright (c) DungNT 
* version			:	1.0.0 
* ****************************************************************************
*/ 
import App from 'App';
import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    reportWebVitals(console.log)
}
