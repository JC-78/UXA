import "./App.css";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";
import { useState,createRef } from "react";
import DOMPurify from "dompurify";


function App() {
  const [inputTexts, setInputTexts] = useState(["", "", ""]);
  const [responses, setResponses] = useState(["", "", ""]);
  const [loading, setLoading] = useState(false);
  const responseRefs = [createRef(), createRef(), createRef()]; //contains response text

  const REACT_APP_OPENAI_API_KEY = "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";

  const configuration = new Configuration({
    apiKey: REACT_APP_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  function generateFontCategory(categoryprompt) {
    const [category, setCategory] = useState("");
    async function fetchData() {
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: prompt })
        };
        const category = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', requestOptions);
        const data = await category.json();
        setCategory(data.choices[0].text);
      } catch (error) {
        console.log(error);
      }
    }
  
    fetchData();

    return category;
    /* const requestBody = {
      prompt: categoryprompt,
      max_tokens: 100, // number of tokens to generate in the response
      temperature: 0.5, // controls the creativity of the response
      n: 1, // number of responses to generate
      stop: '\n', // stop generating response after reaching this string
    }; */

  }

  const handleSubmit = (index) => {
    setLoading(true);
    let prompt = inputTexts[index]; // get prompt for the input at the given index
    if (index === 0) {
      prompt = "I want colours that will evoke " + prompt+".";
    }
    if (index === 2) {
      prompt = "I want fonts that will evoke " + prompt+". Provide me links to corresponding fonts in Google Fonts.";
    }

    openai
      .createCompletion({
        model: "text-davinci-003",
        prompt,
        temperature: 0.6,
        max_tokens: 100,
      })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setResponses((prevResponses) =>
            prevResponses.map((response, i) =>
              i === index
                ? index === 1
                  ? "Generating image..."
                  : res?.data?.choices[0]?.text
                : response
            )
          );
          if (index === 1) {
            axios
              .post("https://api.openai.com/v1/images/generations", {
                model: "image-alpha-001",
                prompt: `${inputTexts[0]} ${inputTexts[1]}`,
                size: "512x512",
                response_format: "url",
              }, {
                headers: {
                  "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                  "Content-Type": "application/json",
                },
              })
              .then((res) => {
                if (res.status === 200) {
                  setResponses((prevResponses) =>
                    prevResponses.map((response, i) =>
                      i === index ? res?.data?.data[0]?.url : response
                    )
                  );
                }
              })
              .catch((err) => {
                console.log(err, "An error occurred");
              });
          }
        }
      })
      .catch((err) => {
        console.log(err, "An error occurred");
      });
  };

  // function to sanitize HTML
  const sanitizeHTML = (html) => {
    return { __html: DOMPurify.sanitize(html) };
  };

  return (
    <div className="App_">
      <div className="header">
        <h1 className="header_text">
          <span className="text_active">AI UX Design</span>
        </h1>
        <h2 className="header_summary">Get your AI-driven consultations.</h2>
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
                  // rows={3}
                  // cols={80}
                  rows={4}
                  cols={200}
                  placeholder={
                    i === 0 ? "List the feelings do you want to evoke with colours" : i === 1 ? "What kind of logo do you envision?" : "List the emotions and vibe you want to evoke with your font"
                  }
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
                  <label>
                    {i === 1 ? "Response from DALL-E" : "Response from ChatGPT"}
                  </label>
                  <br />


                  {i === 1 && responses[i] ? (
                    <img src={responses[i]} alt="Generated image" />
                  ) :(i==0?  <textarea
                    placeholder={`Response ${i + 1}`}
                    cols={80}
                    rows={4}
                    value={responses[i]}
                    readOnly
                  />
                    : 
                    <div dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          responses[i]
                            .split('\n')
                            .map(line => {
                              if (/^\d+\.\s/.test(line)) {
                                const [numberAndText, link] = line.split(/:\s+/);
                                return `${numberAndText}: <a href="${link}">${link}</a><br>`;
                              }
                              return line;
                            })
                            .join('\n')
                        )
                      }}
                    />
                    )}

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
