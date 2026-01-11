import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Removed service worker registration
/*
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Construct the service worker URL relative to the current module's URL.
    // This can help resolve origin mismatch issues in certain hosting environments
    // where the perceived origin of the script might differ from the document's root.
    const swUrl = new URL('./service-worker.js', import.meta.url).href;

    navigator.serviceWorker.register(swUrl, { scope: '/' })
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
*/

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);