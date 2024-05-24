import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { requstToGroqAI } from "./utils/groq";
import { Light as SyntaxHighlight } from "react-syntax-highlighter";
import { darcula, docco } from "react-syntax-highlighter/dist/cjs/styles/prism";
import "./App.css";
import { UilMoon } from '@iconscout/react-unicons';
import { UilSun } from '@iconscout/react-unicons';

const App = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [content, setContent] = useState("");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handleSubmit = async () => {
    setLoading(true);
    const ai = await requstToGroqAI(content);
    setData(ai);
    setLoading(false);
  };

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <main className="max-w-xl mx-auto w-full flex flex-col justify-center items-center h-screen px-8">
        <button onClick={toggleMode} className="mb-4 p-2 rounded-md border absolute top-1 right-1">
          {isDarkMode ? <UilSun size="20" color="#FFFFFF" /> : <UilMoon size="20" color="#424242" />}
        </button>
        <h1 className="text-3xl font-medium mb-4 mt-5 text-center">
          Welcome to Mezz AI-Chat
        </h1>
        <form className='w-full flex flex-col gap-4 py-4' onSubmit={(e) => e.preventDefault()}>
          <input 
            type="text" 
            className='p-2 rounded-md border border-slate-900 text-slate-500'
            placeholder='Ketik Permintaan disini...'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button 
            className={`bg-blue-500 p-2 rounded-md text-white font-semibold ${loading ? 'cursor-not-allowed' : ''}`}
            type='button'
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Kirim'}
          </button>
        </form>
        <div className="answer-box max-w-xl w-full mx-auto flex justify-center items-center">
          {loading ? (
            <div className="text-center p-4">
              <div className="loader"></div>
            </div>
          ) : (
            data && (
              <div className="syntax-highlighter-wrapper">
                <SyntaxHighlight language='swift' style={isDarkMode ? darcula : docco} wrapLongLines={true}>
                  {data}
                </SyntaxHighlight>
              </div>
            )
          )}
        </div>
        <footer className='w-full text-center p-4'>
          <h6 className='text-center font-mono'>
            &copy; Made by Rizky Ryan Sahadha, All Rights Reserved {currentYear}
          </h6>
        </footer>
      </main>
    </div>
  );
}

export default App;
