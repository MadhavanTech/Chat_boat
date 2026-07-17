import React, { useState, useContext, useEffect, useRef } from 'react'
import { Appcontext } from '../Context/Context'

const Stt = () => {
  const { setRequestText } = useContext(Appcontext);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const text = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(' ')
        .trim();

      if (text) {
        setTranscript(text);
        setRequestText(text);
      }

      setIsListening(false);
    };

    recognition.onerror = (event) => {
      setIsListening(false);
      setError(`Speech recognition error: ${event.error}`);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [setRequestText]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    setError('');
    setTranscript('');
    recognitionRef.current.start();
    setIsListening(true);
  };

  return (
   <div className='flex flex-col items-center gap-4'>
  <button
    onClick={toggleListening}
    className={`group relative flex items-center gap-3 rounded-full px-8 py-4 text-base font-semibold text-white shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 ${
      isListening
        ? 'bg-gradient-to-r from-rose-500 to-red-600 shadow-[0_0_30px_rgba(244,63,94,0.5)]'
        : 'bg-gradient-to-r from-cyan-400 to-blue-600'
    }`}
  >
    {isListening && (
      <span className='absolute inset-0 animate-ping rounded-full bg-rose-400/30' />
    )}
    <svg
      viewBox='0 0 24 24'
      className='relative h-5 w-5'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
    >
      <path d='M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z' />
      <path d='M19 10v2a7 7 0 0 1-14 0v-2' />
      <line x1='12' y1='19' x2='12' y2='23' />
    </svg>
    <span className='relative'>{isListening ? 'Stop Voice to Text' : 'Start Voice to Text'}</span>
  </button>

  <p className='min-h-[1.5rem] max-w-md rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-center text-sm text-slate-200 backdrop-blur-md'>
    {transcript || 'Your speech will appear here...'}
  </p>
</div>
  );
};

export default Stt
