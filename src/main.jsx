import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Importação local do Bootstrap (garante 100% de funcionamento sem internet)
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
