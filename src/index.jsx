import React from 'react';
import App from "./App";
import { createRoot } from "react-dom/client";
import { store } from './storage'
import { Provider } from 'react-redux';

createRoot(document.querySelector("#root")).render(
    <React.StrictMode>
        <Provider store={store} >
            <App />
        </Provider>
    </React.StrictMode>
);