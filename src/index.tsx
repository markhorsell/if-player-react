import React from "react";
import { render } from "react-dom";
//import './index.css';
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import store from "./store/configureStore";
//import persistor  from './store/configureStore';
import { PersistGate } from "redux-persist/integration/react";
//const store=store.store;// = configureStore();

import { createGlobalStyle } from "styled-components/macro";
import theme from "./theme";


const GlobalStyle = createGlobalStyle`

html {
  box-sizing: border-box;
}

 
@import url(https://fonts.googleapis.com/css?family=Jacques+Francois+Shadow|Rye|Yesteryear|VT323|Lato);
body {
	font-family: 'VT323', monospace;
	font-family: 'Lato', sans-serif;
	font-size:14px;
	letter-spacing: 1px;
	line-height: 18px;
	background-color: ${props => theme.BACKGROUND_COLOR};
	color: ${props => theme.TEXT_COLOR};
	/* GOOD IDEA TO MAKE TEXT UNSELECTABLE?? */
	-webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
`;

render(
  <Provider store={store.store as any}>
    <PersistGate loading={null} persistor={store.persistor}>
      <GlobalStyle />
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
