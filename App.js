  // client/src/App.js

  import React, { useState, useEffect } from 'react';
  import io from 'socket.io-client';

  const socket = io('http://localhost:3001'); // Replace with your socket.io server's domain

  function App() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
      socket.on('chat message', (msg) => {
        setMessages([...messages, msg]);
      });
    }, []);

    const sendMessage = () => {
      socket.emit('chat message', message);
      setMessage('');
    };

    return (
      <div>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    );
  }

  export default App;