import React, { useContext } from 'react'
import { Appcontext } from '../Context/Context'

const Tts = () => {
  const { responceText } = useContext(Appcontext)

  const renderMessages = () => {
    if (!responceText) return <p>No response yet.</p>

    if (Array.isArray(responceText)) {
      return responceText.length > 0
        ? responceText.map((item, index) => <p key={index}>{item}</p>)
        : <p>No response yet.</p>
    }

    return <p>{responceText}</p>
  }

  return (
    <div>
      <h3>Response</h3>
      {renderMessages()}
    </div>
  )
}

export default Tts