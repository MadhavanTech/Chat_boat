import React, { useContext, useEffect } from 'react'
import { Appcontext } from '../Context/Context'

const Tts = () => {
  const { responceText } = useContext(Appcontext)

  useEffect(() => {
    if (!responceText) return;

    const textToSpeak = Array.isArray(responceText)
      ? responceText.join(' ').trim()
      : String(responceText).trim();

    if (!textToSpeak) return;

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn('Speech synthesis is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.speak(utterance);
  }, [responceText])

  return null;
}

export default Tts