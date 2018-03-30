

import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import configureStore from './store/configureStore';
const store = configureStore();

render(
   
    <Provider store={store}>
       
            <App/>
       
    </Provider>, document.getElementById('root'));
registerServiceWorker();

