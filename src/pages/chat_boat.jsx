import React, { useContext, useState } from 'react'
import Stt from './stt'
import Tts from './tts'
import Chat_Hry from './Chat_Hry'
import { Appcontext } from '../Context/Context'
import {askchatboat} from '../Chat_boat_Responce'

const ChatBoat = () => {
  const {reRequestText,setresponceText ,responceText , setallresponsetext} =useContext(Appcontext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  let GerateResponce = async () =>{
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      setError(null);

      let responce = await askchatboat(reRequestText);

      if(responce.length>0){
        setresponceText(responce);
        setallresponsetext((prev) => [...prev, responce]);
        console.log(responce);
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to get response. Please try again.';
      setError(errorMessage);
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  }



  

  return (
    <div>
      <Stt />
      <Tts />

      <button onClick={GerateResponce} disabled={isLoading} className={`w-30 h-10 cursor-pointer ${isLoading ? 'bg-gray-600' : 'bg-blue-900'} text-white border-2  border-black flex items-center hover:bg-red-500 disabled:hover:bg-gray-600 disabled:cursor-not-allowed`}>{isLoading ? 'Loading...' : 'Generate Response'}</button>
      {error && <p className="text-red-600 mt-2">Error: {error}</p>}
      {responceText && <p>{responceText}</p>} 

      <div className='chat-container'>

        <Chat_Hry />

      </div>

    </div>
  )
}

export default ChatBoat