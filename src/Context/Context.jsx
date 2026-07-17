import React, { createContext, useState } from 'react'

const Appcontext = createContext();

const Context = ({ children }) => {

    const [reRequestText, setRequestText] = useState('');
    const [responceText, setresponceText] = useState([]);
    const [requstSound , setrequestSound] = useState(null);
    const [audioURL, setaudioURL] = useState(null);
    const [responceSound, setresponceSound] = useState(null);
    const [isRecording, setisRecording] = useState(false);

    const [allrequesttext,setallrequsttext] = useState([])
    const [allresponsetext,setallresponsetext] = useState([])

    console.log("request: " + reRequestText);
    console.log("all requests: " + allrequesttext);
    console.log("all responses: " + allresponsetext);
    console.log("response: " + responceText);
    console.log("request sound: " + requstSound);

  return (

    <Appcontext.Provider 
      value={{

        reRequestText,
        setRequestText,
        responceText,
        setresponceText,
        requstSound,
        setrequestSound,
        responceSound,
        setresponceSound,
        isRecording,
        setisRecording,
        audioURL,
        setaudioURL,
        allrequesttext,
        setallrequsttext,
        allresponsetext,
        setallresponsetext

     }}
    >
     {children}
     </Appcontext.Provider>
 ) 
  
}

export { Appcontext }
export default Context