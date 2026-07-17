import React, { useContext, useEffect, useState } from 'react'
import { Appcontext } from '../Context/Context';

const Chat_Hry = () => {
    const { allrequesttext, allresponsetext } = useContext(Appcontext);
    const [historyItems, setHistoryItems] = useState([]);

    useEffect(() => {
        try {
            const stored = localStorage.getItem('hry');
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    setHistoryItems(parsed);
                    
                }
            }
        } catch (error) {
            console.error('Failed to load history:', error);
        }
    }, []);

    useEffect(() => {
        if (allrequesttext.length === 0 && allresponsetext.length === 0) return;

        const history = allrequesttext.reduce((acc, req, index) => {
            const response = allresponsetext[index] || '';
            if (!req && !response) return acc;
            acc.push({ request: req, response });
            return acc;
        }, []);

        localStorage.setItem('hry', JSON.stringify(history));
        setHistoryItems(history);
    }, [allrequesttext, allresponsetext]);

    return (
        <div className='chat-container flex h-full w-full flex-col gap-4 overflow-y-auto p-4'>
            <div className='history-header mb-4 text-center text-lg font-semibold text-gray-700'>
                Chat History
            </div>

            {historyItems.length === 0 && (
                <div className='text-sm text-gray-400'>No saved chat history yet.</div>
            )}

            {historyItems.map((item, index) => (
                <div key={`${item.request}-${index}`} className='message-pair flex flex-col gap-2'>
                    <div className='user-message self-end rounded-lg bg-blue-100 px-4 py-2 text-blue-900 max-w-[80%]'>
                        {item.request}
                    </div>

                    {item.response && (
                        <div className='bot-message self-start max-w-[80%] whitespace-pre-wrap rounded-lg bg-gray-100 px-4 py-3 text-gray-900'>
                            {item.response}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Chat_Hry