import React, { useState, useContext, useEffect, useRef } from 'react'
import { Appcontext } from '../Context/Context'

const Stt = () => {
  const { setRequestText,setallrequsttext } = useContext(Appcontext);
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
        setallrequsttext((prev) => [...prev, text]);

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
  }, [setRequestText, setallrequsttext]);

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
    <div>
      <button onClick={toggleListening} className="bg-blue-700 text-white">
        {isListening ? 'Stop Voice to Text' : 'Start Voice to Text'}
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default Stt
