import React from 'react';
import ReactDOM from 'react-dom';
import '../src/Styles/index.css';
import App from './App';
import { BrowserRouter} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import FirebaseProvider from "./Context/AppContext";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
