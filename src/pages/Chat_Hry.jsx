import React, { useContext } from 'react'
import { Appcontext } from '../Context/Context';

const Chat_Hry = () => {

    const {allrequesttext, allresponsetext} =useContext(Appcontext);

    const preevicesrequsttext = [];
    const preevicesresponsetext = [];

     class Hry {

        constructor(reRequestText,responceText) {
            this.reRequestText = reRequestText;
            this.responceText = responceText;
        }
    }

    window.addEventListener('beforeunload', () => {
        const hry = new Hry(allrequesttext,allresponsetext);
        localStorage.setItem('hry', JSON.stringify(hry));
    });

    window.addEventListener('load', () => {
        const hry = JSON.parse(localStorage.getItem('hry'));
        if (hry) {
            preevicesrequsttext.push(hry.reRequestText);
            console.log("Previous Request:", preevicesrequsttext);
            
            preevicesresponsetext.push(hry.responceText);
            console.log("Previous Response:", preevicesresponsetext);
        }
    });

  return (
    <div>
        <h3>Chat History</h3>
        <ul>
            {preevicesrequsttext.map((text, index) => (
                <li key={index}>
                    <strong>Request:</strong> {text}
                </li>
            ))}
            {preevicesresponsetext.map((text, index) => (
                <li key={index}>
                    <strong>Response:</strong> {text}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Chat_Hry