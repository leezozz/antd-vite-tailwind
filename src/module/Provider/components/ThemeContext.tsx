import { createContext } from 'react';
/**
 * createContext 创建一个上下文
 * 在被包裹的组件内调用 useContext(SomeContext) 读取它
 */ 
export const ThemeContext = createContext('light')