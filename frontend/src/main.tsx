import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import "./index.css";
import { store } from "./statemanagement/store";
createRoot(document.getElementById("root")!).render(
  <>
    {/* <StrictMode> */}
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
    {/* </StrictMode> */}
  </>
);