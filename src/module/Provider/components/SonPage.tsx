import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

const SonPage = () => {
  const theme = useContext(ThemeContext)

  return (
    <span>son: {theme}</span>
  )
}
export default SonPage
