import React from 'react'
// 说明：react 18版本写法
// import ReactDOM from 'react-dom/client'
import ReactDOM from 'react-dom'
import App from './App.tsx'
import { StyleProvider } from '@ant-design/cssinjs';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import './index.css'

// 说明：react 18版本写法
// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <ConfigProvider locale={zhCN}>
//       <StyleProvider >
//         <App />
//       </StyleProvider>
//     </ConfigProvider>
//   </React.StrictMode>,
// )

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <StyleProvider >
        <App />
      </StyleProvider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
