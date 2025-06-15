
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App';

    const MOUNT_POINT_ID = 'root'; // Changed to 'root'

    const rootElement = document.getElementById(MOUNT_POINT_ID);

    if (!rootElement) {
      console.error(`Error: Could not find the mount point element with ID '${MOUNT_POINT_ID}'. Make sure this element exists in your HTML file.`);
      // You could throw an error, or just log and let the page render without the app
      // For a critical app, throwing might be better:
      // throw new Error(`Could not find root element with ID '${MOUNT_POINT_ID}' to mount to.`);
    } else {
      const root = ReactDOM.createRoot(rootElement);
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    }