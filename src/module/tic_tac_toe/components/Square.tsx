import { createStyles, cx } from "antd-style";
interface Props {
  value: string | null,
  highLight: boolean,
  onClick: () => void
}

const useStyle = createStyles({
  'square': {
    background: '#fff',
    border: '1px solid #999',
    float: 'left',
    fontSize: '24px',
    fontWeight: '700',
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
  },
  'highLight-square-item': {
    backgroundColor: '#dfe3e7'
  }
})

const Square: React.FC<Props> = ({
  value,
  highLight = false,
  onClick
}) => {
  const { styles } = useStyle()

  return (
    <button className={cx({
      [styles['square']]: true,
      [styles['highLight-square-item']]: highLight
    })} onClick={() => onClick()}>
      {value}
    </button>
  )
}
export default Square
