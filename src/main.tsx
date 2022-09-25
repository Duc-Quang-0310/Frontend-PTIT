import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import VietNam from 'antd/lib/locale/vi_VN';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'antd/dist/antd.min.css';
import { persistor, store } from 'global/store';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider locale={VietNam}>
          <App />
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
