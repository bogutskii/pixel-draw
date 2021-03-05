import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { Provider} from "react-redux";
import store from "./Comonents/redux/store";

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
