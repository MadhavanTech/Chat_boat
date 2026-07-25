import React, { useContext, useEffect, useRef, useState } from 'react'
import Tts from './tts'
import { Appcontext } from '../Context/Context'
import { askchatboat } from '../Chat_boat_Responce'

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

        const prompt = `Answer this question clearly and briefly: ${reRequestText}`;

        function Ownarbio(request) {
          if (!request || typeof request !== 'string') return request;

          const req = request.toLowerCase();
          const mentionsMaddy = req.includes("maddy") && req.includes("ownar");
          const asksForBio = req.includes("bio") || req.includes("biography") || req.includes("background");
          const asksAbout = req.includes("about");

          const pernalperson = (req.includes("sha")|| req.includes("thangapulla")||req.includes("shakthi")) && req.includes("name");

          if ((mentionsMaddy && asksForBio) || asksAbout) {
            return `About Madhavan:

                     Madhavan is a dedicated Java Full Stack Developer with hands-on expertise in building robust, scalable web applications. Skilled in backend technologies such as Java, J2EE, Spring, Spring Boot, Hibernate, and JDBC, he brings strong problem-solving abilities to designing efficient server-side logic and RESTful APIs. On the database side, he works confidently with SQL and MySQL to manage and optimize data-driven applications. On the frontend, Madhavan crafts clean, responsive user interfaces using HTML, CSS, JavaScript, Tailwind CSS, and React. Combining a solid grasp of both frontend and backend development, he is passionate about delivering end-to-end solutions that are functional, maintainable, and user-friendly.

                    About Maddy Chatbot:

                     Maddy is a highly skilled and innovative AI voice assistant developed by Ownar. It is designed to understand natural language and provide accurate, context-aware responses to user queries. Maddy leverages advanced machine learning algorithms and state-of-the-art natural language processing techniques to deliver a seamless conversational experience. With its ability to learn and adapt over time, Maddy continues to improve its performance, making it an invaluable tool for users seeking information, assistance, or engaging interactions.`;
          }else if (pernalperson) {
            return `About Thangapulla💖:

                   Just wanted to say — you crossed my mind today, like you always do, and it made me smile without even trying. I don't need a reason to tell you this: being with you is the best part of my ordinary days. You make simple moments feel like something worth remembering. I love you, just because you're you. ❤️
                    
                   `

          }

          return '';
        }

        let responce1 = Ownarbio(reRequestText);

        let responce = responce1.length > 0 ? responce1 : await askchatboat(prompt);

        if (responce && responce.length > 0) {

          responce = RemoveGemininame(responce);

          responce = RemoveGoogle(responce);


          setresponceText(responce);
          setallresponsetext((prev) => {
            if (prev[prev.length - 1] === responce) {
              return prev;
            }
            return [...prev, responce];
          });
        }

        function RemoveGemininame(requst) {
          if (!requst || typeof requst !== 'string') return requst;
          return requst.replace(/gemini/gi, 'maddy_Chatboat');
        }

        function RemoveGoogle(requst) {
          if (!requst || typeof requst !== 'string') return requst;
          return requst.replace(/google/gi, 'maddy');
        }


        setRequestText('');
      } catch (err) {
  let errorMessage = err?.message || 'Failed to get response. Please try again.';
  errorMessage = errorMessage.replace(/gemini/gi, 'maddy_Chatboat').replace(/google/gi, 'maddy');
  console.error('maddy_Chatboat error:', err);

  setresponceText(errorMessage);
  setallresponsetext((prev) =>
    prev[prev.length - 1] === errorMessage ? prev : [...prev, errorMessage]
  );

  setRequestText('');
}  finally {
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