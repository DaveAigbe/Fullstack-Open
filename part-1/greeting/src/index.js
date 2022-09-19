import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

const name = <App name="Dave" />;
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(name);