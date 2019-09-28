import React from "react";
import { render } from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import { PersistGate } from "redux-persist/integration/react";


render(
  <React.StrictMode>
  <Provider store={store.store as any}>
    <PersistGate loading={null} persistor={store.persistor}>
   
      <App />
    </PersistGate>
  </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
registerServiceWorker();
