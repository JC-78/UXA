

//three input text boxes and output text boxes

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
                  placeholder={i === 0 ? "What colour" : i === 1 ? "What logo?" : "What font?"}
                  
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
