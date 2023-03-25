import logo from './logo.svg';
import './App.css';

//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

// import "./App.css";
// import { Configuration, OpenAIApi } from "openai";
// import { useState } from "react";

// function App() {
//   const [text, setText] = useState("");
//   const [response, setResponse] = useState("");
//   const [loading, setLoading] = useState(false);

//       const configuration = new Configuration({
//         // apiKey: process.env.OPENAI_API_KEY,
//         apiKey: process.env.REACT_APP_OPENAI_API_KEY,
//       });
//       const openai = new OpenAIApi(configuration);

//       const HandleSubmit = (e) => {
//         setLoading(true);
//         e.preventDefault();
//         openai
//           .createCompletion({
//             model: "davinci",
//             prompt: generatePrompt(text),
//             temperature: 0.6,
//             max_tokens: 100,
//           })
//           .then((res) => {
//             if (res.status === 200) {
//               setLoading(false);
//               setResponse(res?.data?.choices[0]?.text);
//             }
//           })
//           .catch((err) => {
//             console.log(err, "An error occured");
//           });
//       };

//       function generatePrompt(text) {
//         return `Generate a response to "${text}".`;
//       }

//       return (
//         <div className="container">
//   <div className="text_form">
//     <form>
//       <label>Enter your text</label>
//       <textarea
//         rows={14}
//         cols={80}
//         placeholder="Put your text"
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />
//     </form>
//   </div>
//   <div>
//     <button type="button" onClick={HandleSubmit}>
//       {loading ? "loading..." : "Get Response"}
//     </button>
//   </div>
//   <div className="summarized_text">
//     <label>ChatGPT's response</label>
//     <textarea
//       placeholder="ChatGPT's response"
//       cols={80}
//       rows={14}
//       value={response}
//       onChange={(e) => setText(e.target.value)}
//     />
//   </div>
// </div>
        
//       );
//     }

//     export default App;

import "./App.css";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const HandleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    openai
      .createCompletion({
        model: "text-davinci-002",
        prompt: text,
        temperature: 0.6,
        max_tokens: 100,
      })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setResponse(res?.data?.choices[0]?.text);
        }
      })
      .catch((err) => {
        console.log(err, "An error occured");
      });
  };

  return (
    <div className="App_">
      <div className="header">
        <h1 className="header_text">
          Chat<span className="text_active">GPT</span>
        </h1>
        <h2 className="header_summary">Get responses from ChatGPT.</h2>
      </div>
      <div className="container">
        <div className="text_form">
          <form>
            <label>Enter your text</label>
            <textarea
              rows={14}
              cols={80}
              placeholder="Put your text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </form>
        </div>
        <div>
          <button type="button" onClick={HandleSubmit}>
            {loading ? "loading..." : "Submit"}
          </button>
        </div>
        <div className="response_text">
          <label>Response from ChatGPT</label>
          <textarea
            placeholder="ChatGPT response"
            cols={80}
            rows={14}
            value={response}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default App;