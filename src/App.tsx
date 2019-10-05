import React, { FunctionComponent, Suspense, lazy } from "react";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { GlobalStyles, theme } from "./theme";
import /*styled,*/ { ThemeProvider } from "styled-components/macro";
import {
  BrowserRouter as Router,
} from "react-router-dom";

const AppContent = lazy(() => import('./AppContent'));

const App: FunctionComponent = () => {
  return (
    <React.StrictMode>
      <Provider store={store.store as any}>
        <PersistGate loading={null} persistor={store.persistor}>
          <ThemeProvider theme={theme}>
            <>
              <GlobalStyles />
              <Router>
                <Suspense fallback={<div>Loading...</div>}>
                  <AppContent />
                </Suspense>
              </Router>
            </>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>

  );
}

export default App;
