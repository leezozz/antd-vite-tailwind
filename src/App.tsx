import React from "react";
import { RouterProvider } from 'react-router-dom'
import routerConfigList from './router/index'
import './index.css'
import PubSub from "./utils/EventBus";

interface Window {
  EventBus: {
    publish: (type: string | number, ...messages: any[]) => void
    subscribe: (type: string | number, callback: any) => void
    unsubscribe: (type: string | number, callback: any) => void
  }
}

window.EventBus = new PubSub()


const App: React.FC = () => {
  return (
    <RouterProvider router={ routerConfigList } />
  );
};

export default App;
