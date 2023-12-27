import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import SonPage from './SonPage'


const ChildrenPage: React.FC = (props) => {

  console.log('ChildrenPage', props)
  const theme = useContext(ThemeContext)

  return (
    <>
      <p>children: {theme}</p>
      <SonPage />
    </>
  )
}

export default ChildrenPage
