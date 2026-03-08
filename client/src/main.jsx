import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store/store";

import "react-toastify/dist/ReactToastify.css";
import 'react-quill/dist/quill.snow.css';

import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clientId}>
    {/* <StrictMode> */}
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ToastContainer
              position="top-right"
              toastClassName="dark:bg-zinc-700 dark:text-white bg-white text-black"
            />
            <App />
          </PersistGate>
        </Provider>
      </BrowserRouter>
    {/* </StrictMode> */}
  </GoogleOAuthProvider>
);
