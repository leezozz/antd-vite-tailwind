import React, { createContext, useEffect, useState } from "react"
import MyComPage from "../components/MyComPage"
import { useWebSocket } from "ahooks"
import { Button } from "antd"
import { io } from 'socket.io-client';

const MyContext = createContext(0)
console.log('MyContext', MyContext)

/**
 * 测试 Provider
 */
const MyComponent: React.FC = () => {

  const [count, setCount] = useState(111)
  const [result, setResult] = useState()


  const SOCKET_URL = 'http://10.30.0.16/ecom';
  
  
  const customSocket = io(SOCKET_URL, {
    transports: ['websocket'],
    autoConnect: false
  });


  useEffect(
    () => {
      customSocket.open()

      customSocket.emit(
        'join',
        {
          'project_id': '654d8d609e42f77c46fcc743',
          'token': '1125d56a-956d-11ee-a43c-02420c0b0406',
          'event_type': 'create_table',
        },
      );

      customSocket.on('join', (arg, callback) => {
        callback('321000')
      });
      console.log('**************************', customSocket.listeners('join'))
    },
    [customSocket]
  )
  

  const handleClick = async () => {
    console.log('handleClick --------+++++++', customSocket)
  }

  customSocket.on("disconnect", () => {
    customSocket.connect();
  });

  


  // 组件销毁时，断开连接
  // socket.on("disconnect", (reason) => {
  //   // ...
  // });

  return (
    <>
      <h1>Provider</h1>
      <MyContext.Provider value={count}>
        {/* <MyComPage /> */}
        <Button onClick={handleClick}>连接</Button>
        {JSON.stringify(result)}
      </MyContext.Provider>
    </>
  )
}

export default MyComponent



