import React, { useState } from 'react'
import ChatBoat from './chat_boat'
import Stt from './stt'
import Chat_Hry from './Chat_Hry';

const Home = () => {
  const [showHistory, setShowHistory] = useState(false);
  console.log(showHistory);
  

  return (
    <div className='relative min-h-screen w-full bg-gradient-to-b from-[#0a0f1c] via-[#0e1626] to-[#0a0f1c] p-2 sm:p-3'>

      <button onClick={() => setShowHistory((prev) => !prev)}
        type='button'
        className='history-icon-btn border-blue-200/60 bg-[#071425]/90 text-blue-100 shadow-[0_0_18px_rgba(59,130,246,0.22)]'
        aria-label='History'
      >
        <svg viewBox='0 0 24 24' className='history-icon' fill='none' stroke='currentColor' strokeWidth='1.8'>
          <path d='M12 7v5l3 2' />
          <circle cx='12' cy='12' r='8' />
        </svg>
        <span className='history-label'>{showHistory ? '<-  Back' : 'History'}</span>
      </button>

      <div className='relative z-10 mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl items-center justify-center'>
        <div className='w-full rounded-[24px] border border-white/15 bg-slate-950/35 p-4 shadow-[0_30px_100px_rgba(2,8,23,0.55)] backdrop-blur-xl sm:rounded-[32px] sm:p-6 lg:p-12'>
          <div className='flex flex-col gap-6 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10'>

            {/* Left column */}
            <div className='text-center lg:text-left'>
              <p className='mb-3 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-200 sm:mb-4 sm:text-sm'>
                AI Voice Assistant
              </p>
              <h1 className='text-3xl font-black leading-tight text-white sm:text-4xl lg:text-6xl'>
                Speak naturally and let ideas flow.
              </h1>
              <p className='mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:mt-5 sm:text-base lg:mx-0 lg:text-lg'>
                Tap the button, speak your request, and see your message and the assistant reply appear in the live experience panel.
              </p>

              <div className='mt-6 flex flex-col items-center gap-4 sm:mt-8 sm:flex-row lg:items-start'>
                <Stt />
              </div>
            </div>

            {/* Right column - Live experience panel */}
            <div id='chat' className='min-h-[320px] rounded-[24px] border border-white/15 bg-slate-900/70 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:min-h-[420px] sm:p-4 lg:h-[calc(100vh-6rem)] lg:p-6' >
               
              {showHistory ? <Chat_Hry /> : <ChatBoat />}
              
            </div>



            

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home