import React from 'react'

const ChatMessage = ({ message }) => {
  return (
    <div key={message.createdAt}>
      <h2>{message.message}</h2>
      <h3>From: {message.address}</h3>
      <p>Date: {message.createdAt}</p>
    </div>
  )
}

export default ChatMessage