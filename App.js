import logo from './logo.svg';
// import './App.css';

// import "./App.css";
// import { Configuration, OpenAIApi } from "openai";
// import { useState } from "react";

// function App() {
//   const [text, setText] = useState("");
//   const [response, setResponse] = useState("");
//   const [loading, setLoading] = useState(false);

//   const configuration = new Configuration({
//     apiKey: process.env.REACT_APP_OPENAI_API_KEY,
//   });
//   const openai = new OpenAIApi(configuration);

//   const HandleSubmit = (e) => {
//     setLoading(true);
//     e.preventDefault();
//     openai
//       .createCompletion({
//         model: "text-davinci-002",
//         prompt: text,
//         temperature: 0.6,
//         max_tokens: 100,
//       })
//       .then((res) => {
//         if (res.status === 200) {
//           setLoading(false);
//           setResponse(res?.data?.choices[0]?.text);
//         }
//       })
//       .catch((err) => {
//         console.log(err, "An error occured");
//       });
//   };

//   return (
//     <div className="App_">
//       <div className="header">
//         <h1 className="header_text">
//           Chat<span className="text_active">GPT</span>
//         </h1>
//         <h2 className="header_summary">Get responses from ChatGPT.</h2>
//       </div>
//       <div className="container">
//         <div className="text_form">
//           <form>
//             <label>What kind </label>
//             <textarea
//               rows={14}
//               cols={80}
//               placeholder="Put your text"
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//             />
//           </form>
//         </div>
//         <div>
//           <button type="button" onClick={HandleSubmit}>
//             {loading ? "loading..." : "Submit"}
//           </button>
//         </div>
//         <div className="response_text">
//           <label>Response from ChatGPT</label>
//           <textarea
//             placeholder="ChatGPT response"
//             cols={80}
//             rows={14}
//             value={response}
//             readOnly
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;



import "./App.css";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

function App() {
  const [inputTexts, setInputTexts] = useState(["", "", ""]);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const prompt = inputTexts.join(" "); // concatenate input texts into a single string
    openai
      .createCompletion({
        model: "text-davinci-002",
        prompt,
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
        console.log(err, "An error occurred");
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
            {/* Add multiple input textboxes */}
            <label>Enter text:</label>
            <br />
            <textarea
              rows={3}
              cols={80}
              placeholder="Describe what kind of "
              value={inputTexts[0]}
              onChange={(e) =>
                setInputTexts([e.target.value, inputTexts[1], inputTexts[2]])
              }
            />
            <br />
            <textarea
              rows={3}
              cols={80}
              placeholder="Text 2"
              value={inputTexts[1]}
              onChange={(e) =>
                setInputTexts([inputTexts[0], e.target.value, inputTexts[2]])
              }
            />
            <br />
            <textarea
              rows={3}
              cols={80}
              placeholder="Text 3"
              value={inputTexts[2]}
              onChange={(e) =>
                setInputTexts([inputTexts[0], inputTexts[1], e.target.value])
              }
            />
          </form>
        </div>
        <div>
          <button type="button" onClick={handleSubmit}>
            {loading ? "Loading..." : "Submit"}
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