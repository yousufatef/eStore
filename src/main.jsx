import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "./assets/styles/index.css";
import "./assets/styles/bootstrap.custom.css";
import { Provider } from "react-redux";
import { store } from "./redux/app/store.js";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <App />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </StrictMode>
);
