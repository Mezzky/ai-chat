// eslint-disable-next-line no-unused-vars
import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { requstToGroqAI } from "./utils/groq"
import { Light as SyntaxHighlight } from "react-syntax-highlighter"
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism"
import "./App.css";

const App = () => {
  const [data, setData] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true);
    // eslint-disable-next-line no-undef
    const ai = await requstToGroqAI(content.value);
    setData(ai);
    setLoading(false);
  }

  return (
    <main className='max-w-xl mx-auto w-full flex flex-col justify-center items-center min-h-[80vh]'>
      <h1 className="text-3xl font-medium text-blue-500 mb-4">
        Welcome to AI-Chat
      </h1>
      <form action="" className='w-full flex flex-col gap-4 py-4'>
        <input 
          type="text" 
          className='p-2 rounded-md'
          placeholder='Ketik Permintaan disini...'
          id='content'
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
      <div className="max-w-xl w-full mx-auto flex justify-center items-center">
        {loading ? (
          <div className="text-center p-4">
            <div className="loader"></div>
          </div>
        ) : (
          data && (
            <SyntaxHighlight language='swift' style={darcula} wrapLongLines={true}>
              {data}
            </SyntaxHighlight>
          )
        )}
      </div>
    </main>
  )
}

export default App
