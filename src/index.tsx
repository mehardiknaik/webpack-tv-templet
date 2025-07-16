import './polyfills';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router';
import './index.css';

const root = document.getElementById('root');

root?.setAttribute('data-platform', __PLATFORM__);
root?.setAttribute('data-build-date', __BUILD_DATE__);
root?.setAttribute('data-public-path', __webpack_public_path__);

ReactDOM.createRoot(root!).render(
  <HashRouter>
    <App />
  </HashRouter>
);
