import React, { useState, useEffect } from "react";
import axios from "axios";

export default function JokeGetter() {
  const [joke, setJoke] = useState(null);
  const [showSetup, setShowSetup] = useState(true);
  const [nextJokeTrigger, setNextJokeTrigger] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    axios
      .get("https://official-joke-api.appspot.com/random_joke")
      .then((res) => {
        setJoke(res.data);
        setShowSetup(true);
        setCopied(false); 
      })
      .catch((err) => console.log("Failed to fetch joke:", err));
  }, [nextJokeTrigger]);

  const copyToClipboard = () => {
    if (joke) {
      navigator.clipboard.writeText(`${joke.setup} - ${joke.punchline}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    }
  };

  if (!joke) return <h1 className="text-center mt-20 text-2xl">Loading...</h1>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-yellow-100 via-pink-200 to-purple-300 text-white px-6">
   <div className="w-full max-w-xl flex justify-end mt-4">
  <button
    onClick={copyToClipboard}
    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-500 hover:to-green-500 text-white transition-colors duration-300 rounded-full text-lg font-semibold shadow-lg"
  >
    Copy Joke
  </button>
</div>

<div className="w-full max-w-xl flex justify-end">
      {copied && (
        <span className="text-green-800 mt-2 text-sm font-medium transition-opacity duration-300">
          ✅ Joke copied to clipboard!
        </span>
      )}
</div>
      <div
        onClick={() => setShowSetup(!showSetup)}
        className="mt-6 bg-white text-gray-800 rounded-xl shadow-2xl p-10 w-full max-w-xl text-center cursor-pointer transition-all duration-500 hover:scale-105 transform hover:shadow-3xl"
      >
        {showSetup ? (
          <p className="text-4xl font-bold">{joke.setup}</p>
        ) : (
          <p className="text-4xl font-light">{joke.punchline}</p>
        )}
        <p className="mt-4 text-base text-gray-500 italic">
          {showSetup ? "Tap to reveal punchline 😄" : "Tap to hide setup 🕵️"}
        </p>
      </div>

      <button
        onClick={() => setNextJokeTrigger(!nextJokeTrigger)}
        className="mt-8 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 hover:from-red-500 hover:to-pink-500 text-white transition-colors duration-300 rounded-full text-lg font-semibold shadow-lg cursor-pointer"
      >
        🎲 Get Another Joke
      </button>
    </div>
  );
}
