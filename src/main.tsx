import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { StyleProvider } from '@ant-design/cssinjs';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <StyleProvider ><App /></StyleProvider>
    </ConfigProvider>
  </React.StrictMode>,
)
