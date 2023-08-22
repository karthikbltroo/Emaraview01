import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import theme from './theme.js'
import { ThemeProvider } from "@mui/material";
import {BrowserRouter} from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme = {theme}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ThemeProvider>
)
