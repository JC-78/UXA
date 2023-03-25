import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';

function Chatbot() {
  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('https://api.chatgpt.com/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input: inputText })
    });
    const json = await response.json();
    setResponse(json.output);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Type your question here:
          <input type="text" value={inputText} onChange={handleChange} />
        </label>
        <button type="submit">Ask</button>
      </form>
      {response && (
        <div>
          <p><strong>Response:</strong></p>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default Chatbot;