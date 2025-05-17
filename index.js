import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorBoundary from './ErrorBoundary'; // ✅ Make sure this matches your file path
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ErrorBoundary> {/* ✅ Wrap your App */}
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();
