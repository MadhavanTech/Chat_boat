import React, { useContext, useEffect, useRef, useState } from 'react'
import Tts from './tts'
import { Appcontext } from '../Context/Context'
import { askchatboat } from '../Chat_boat_Responce'
import { sanitizeResponseText } from '../utils/responseSanitizer'

const ChatBoat = () => {
  const {
    reRequestText,
    setRequestText,
    responceText,
    setresponceText,
    allrequesttext,
    setallrequsttext,
    allresponsetext,
    setallresponsetext
  } = useContext(Appcontext);

  const [isLoading, setIsLoading] = useState(false);
  const isProcessingRef = useRef(false);

  useEffect(() => {
    const GerateResponce = async () => {
      if (!reRequestText || isProcessingRef.current) return;

      isProcessingRef.current = true;

      try {
        setIsLoading(true);

        setallrequsttext((prev) => (prev[prev.length - 1] === reRequestText ? prev : [...prev, reRequestText]));

        const prompt = reRequestText;

        async function MeaningfulResponse() {
          try {
            return await askchatboat(prompt);
          } catch (error) {
            const cleanedError = sanitizeResponseText(error?.message || error || 'Unknown error');
            return `maddy_Chatboat is temporarily unavailable. Please try again later. Error: ${cleanedError}`;
          }
        }

        let responce = await MeaningfulResponse();

        if (responce.length > 0) {
          responce = sanitizeResponseText(responce);

          setresponceText(responce);
          setallresponsetext((prev) => {
            if (prev[prev.length - 1] === responce) {
              return prev;
            }
            return [...prev, responce];
          });
        }

        setRequestText('');
      } catch (err) {
        const errorMessage = sanitizeResponseText(err?.message || 'Failed to get response. Please try again.');
        const finalError = `maddy_Chatboat is temporarily unavailable. Please try again later. Error: ${errorMessage}`;
        setresponceText(finalError);
        setallresponsetext((prev) => {
          if (prev[prev.length - 1] === finalError) return prev;
          return [...prev, finalError];
        });
        console.error('maddy_Chatboat error:', err);
      } finally {
        setIsLoading(false);
        isProcessingRef.current = false;
      }
    };

    GerateResponce();
  }, [reRequestText, setRequestText, setallrequsttext, setresponceText, setallresponsetext]);

  return (
    <div className='chat-container flex h-full w-full flex-col gap-4 overflow-y-auto p-4'>
      {allrequesttext.map((req, index) => (
        <div key={`${req}-${index}`} className='message-pair flex flex-col gap-2'>
          <div className='user-message self-end rounded-lg bg-blue-100 px-4 py-2 text-blue-900 max-w-[80%]'>
            {req}
          </div>

          {allresponsetext[index] && (
            <div className='bot-message self-start max-w-[80%] whitespace-pre-wrap rounded-lg bg-gray-100 px-4 py-3 text-gray-900'>
              {allresponsetext[index]}
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className='self-start italic text-gray-500'>Thinking...</div>
      )}

      <div className='sr-only' aria-hidden='true'>
        <Tts />
      </div>
    </div>
  )
}

export default ChatBoat
