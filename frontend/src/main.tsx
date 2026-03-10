import { createRoot } from "react-dom/client";
import "./index.css";
//import App from "./App.tsx";
import Router from "./routes/index.tsx";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

{
  /* <StrictMode> */
}
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router />
    </PersistGate>
  </Provider>,
);

{
  /* redux */
}
{
  /* </StrictMode> */
}
