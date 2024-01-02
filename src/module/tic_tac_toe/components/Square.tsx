import { createStyles } from "antd-style";

interface Props {
  value: string | null,
  onClick: () => void
}

const useStyle = createStyles({
  'square': {
    background: '#fff',
    border: '1px solid #999',
    float: 'left',
    fontSize: '24px',
    fontWeight: 'bold',
    lineHeight: '34px',
    height: '34px',
    marginRight: '-1px',
    marginTop: '-1px',
    padding: 0,
    textAlign: 'center',
    width: '34px',
    borderRadius: '1px',
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      borderColor: '#999'
    }
  }
})

const Square: React.FC<Props> = ({
  value,
  onClick
}) => {
  const { styles } = useStyle()

  return (
    <button className={styles['square']} onClick={() => onClick()}>
      { value }
    </button>
  )
}
export default Square
