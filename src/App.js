//import logo from './logo.svg';

// import "./App.css";
// import { Configuration, OpenAIApi } from "openai";
// import { useState } from "react";

// function App() {
//   const [inputTexts, setInputTexts] = useState(["", "", ""]);
//   const [response, setResponse] = useState("");
//   const [loading, setLoading] = useState(false);

//   const configuration = new Configuration({
//     apiKey: process.env.REACT_APP_OPENAI_API_KEY,
//   });
//   const openai = new OpenAIApi(configuration);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const prompt = inputTexts.join(" "); // concatenate input texts into a single string
//     openai
//       .createCompletion({
//         model: "text-davinci-002",
//         prompt,
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
//         console.log(err, "An error occurred");
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
//             {/* Add multiple input textboxes */}
//             <label>Enter text:</label>
//             <br />
//             <textarea
//               rows={3}
//               cols={80}
//               placeholder="What kind of vibe are you going for with your colours?        "
//               value={inputTexts[0]}
//               onChange={(e) =>
//                 setInputTexts([e.target.value, inputTexts[1], inputTexts[2]])
//               }
//             />
//             <br />
//             <textarea
//               rows={3}
//               cols={80}
//               placeholder="Describe what you would want from your logo"
//               value={inputTexts[1]}
//               onChange={(e) =>
//                 setInputTexts([inputTexts[0], e.target.value, inputTexts[2]])
//               }
//             />
//             <br />
//             <textarea
//               rows={3}
//               cols={80}
//               placeholder="What kind of vibe/ambiance do you want with your text?              "
//               value={inputTexts[2]}
//               onChange={(e) =>
//                 setInputTexts([inputTexts[0], inputTexts[1], e.target.value])
//               }
//             />
//           </form>
//         </div>
//         <div>
//           <button type="button" onClick={handleSubmit}>
//             {loading ? "Loading..." : "Submit"}
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
import logo from "./logo.svg";
import "./App.css";
import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

function App() {
  const [inputTexts, setInputTexts] = useState(["", "", ""]);
  const [responses, setResponses] = useState(["", "", ""]);
  const [loading, setLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const handleSubmit = (index) => {
    setLoading(true);
    const prompt = inputTexts[index]; // get prompt for the input at the given index
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
          setResponses((prevResponses) =>
            prevResponses.map((response, i) =>
              i === index ? res?.data?.choices[0]?.text : response
            )
          );
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
            {[0, 1, 2].map((i) => (
              <div key={i}>
                <label>Enter text:</label>
                <br />
                <textarea
                  rows={3}
                  cols={80}
                  placeholder={`Input ${i + 1}`}
                  value={inputTexts[i]}
                  onChange={(e) => {
                    const newInputTexts = [...inputTexts];
                    newInputTexts[i] = e.target.value;
                    setInputTexts(newInputTexts);
                  }}
                />
                <div>
                  <button
                    type="button"
                    onClick={() => handleSubmit(i)}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Submit"}
                  </button>
                </div>
                <div className="response_text">
                  <label>Response from ChatGPT</label>
                  <textarea
                    placeholder={`Response ${i + 1}`}
                    cols={80}
                    rows={4}
                    value={responses[i]}
                    readOnly
                  />
                </div>
              </div>
            ))}
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;