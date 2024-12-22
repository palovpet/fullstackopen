import React from 'react'

const Notification = ({ message, errorMessage }) => {
  if (errorMessage !== null) {
    return (
      <div className="error" style={{ 
        color: 'black', 
        fontSize: '20px', 
        marginBottom: '10px',
        backgroundColor: 'pink',
        padding: '10px',
        borderRadius: '5px',
      }}>
        {errorMessage}
      </div>
    )
  }
  if (message === null) {
    return null
  }

  return (
    <div className="regular" style={{ 
      color: 'black', 
      fontSize: '20px', 
      marginBottom: '10px',
      backgroundColor: '#b8e0a5',
      padding: '10px',
      borderRadius: '5px',
    }}>
      {message}
    </div>
  )
}

export default Notification