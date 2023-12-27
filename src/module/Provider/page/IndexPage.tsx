import { useState } from 'react';
import ChildrenPage from '../components/ChildrenPage';
import { ThemeContext } from '../components/ThemeContext';


export const IndexPage = () => {
  const [theme, setTheme] = useState('light')
  const handleClick = () => {
    setTheme('dark')
  }
  
  return (
    <ThemeContext.Provider value={theme}>
      <div>
        <h3>测试provider</h3>
        <button onClick={handleClick}>点击</button>
      </div>
      <ChildrenPage />
    </ThemeContext.Provider>  
  )
} 