import React from "react";
import { render } from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import { PersistGate } from "redux-persist/integration/react";


render(
  
   
      <App />
   ,
  document.getElementById("root")
);
registerServiceWorker();
