import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [hex, setHex] = useState("#000000");

  // eslint-disable-next-line no-undef
  const randomizedHex = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

    setHex(randomColor);
  };

  const quoteAPI = async () => {
    let arrayOfQuotes = [];
    try {
      const data = await axios.get("https://api.quotable.io/random");

      arrayOfQuotes = data.data;
    } catch (error) {
      console.log(error);
    }
    try {
      setQuote(arrayOfQuotes.content);
      setAuthor(arrayOfQuotes.author);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    quoteAPI();
  }, []);
  document.body.style.backgroundColor = `${hex}`;
  return (
    <div id="quote-box" className="fade-in">
      <div className="container">
        <h1 style={{ color: `${hex}` }} id="text">
          "{quote}"
        </h1>

        <p style={{ color: `${hex}` }} id="author">
          -{author}
        </p>
      </div>
      <button
        style={{ backgroundColor: `${hex}` }}
        id="new-quote"
        onClick={() => {
          // eslint-disable-next-line no-undef
          randomizedHex();
          quoteAPI();
        }}
      >
        New Quote
      </button>
      <div className="socials">
        <a id="tweet-quote" href="twitter.com/intent/tweet">
          <img
            id="twitter"
            style={{ backgroundColor: `${hex}` }}
            src="./images/twitter.png"
            alt=""
          />
        </a>
      </div>
    </div>
  );
};

export default App;
