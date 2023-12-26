import { createContext } from 'react';
import io, { Socket } from 'socket.io-client';
import MyComPage from '../components/MyComPage';

// const IndexPage: React.FC = () => {
//   return (
//     <>
//       <h3>socket</h3>
//     </>
//   )
// }
// export default IndexPage

const SOCKET_URL = 'ws://10.30.10.112';
export const socket = io(SOCKET_URL, {
  // namespaces: '/ecom',
  transports: ['websocket'],
});

const SocketContext = createContext<Socket>(socket);
SocketContext.displayName = 'SocketContext';

export const MyComponent = () => {
  <SocketContext.Provider value={socket}>
    <MyComPage />
  </SocketContext.Provider>
} 