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




render(
  <Provider store={store.store as any}>
    <PersistGate loading={null} persistor={store.persistor}>
   
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
