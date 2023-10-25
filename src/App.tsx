import React from "react";
import { RouterProvider } from 'react-router-dom'
import routerConfigList from './router/index'
import './index.css'


const App: React.FC = () => {
  return (
    <RouterProvider router={ routerConfigList } />
  );
};

export default App;
