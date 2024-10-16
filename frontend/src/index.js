import React from 'react'; // Import React library
import ReactDOM from 'react-dom/client'; // Import ReactDOM for rendering the app
import './index.css'; // Import the CSS file for styling
import App from './App'; // Import the main App component
import './App.css'; 
import reportWebVitals from './reportWebVitals'; // Import reportWebVitals for performance measurement
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling

// Create a root element to render the React app
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();