// // @ts-nocheck
// import React, { useEffect, useRef, useState } from 'react';
// import { io } from 'socket.io-client';

// const App1 = () => {
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const ws = useRef(null)
//   const socket = io("http://localhost:3000");

//   useEffect(() => {
//     const socket = new WebSocket("ws://127.0.0.1:3000")

//     socket.addEventListener("open", (event) => {
//       socket.send("Connection established")
//     })

//     ws.current = socket;

//     return () => {
//       socket.close()
//     }
//   }, [])

//   const sendMessage = () => {
//     ws.current.send(message)
//     setMessage('');
//   };

//   return (
//     <div>
//       <div>
//         <h2>Messages:</h2>
//         <ul>
//           {messages.map((msg, index) => (
//             <li key={index}>{msg}</li>
//           ))}
//         </ul>
//       </div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// };

// export default App;
