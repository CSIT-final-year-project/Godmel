import React from "react";
import ReactDOM from "react-dom/client";
import { Routing } from "./router/routing.config";
import ThemeProvider from "./config/theme.context";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <ThemeProvider>
            <Routing/>
        </ThemeProvider>
    </React.StrictMode>
)