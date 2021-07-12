import React from 'react'

const Notification = ({ infoMessage, errorMessage }) => {
  if (errorMessage === null && infoMessage === null) {
    return null
  }
  return (
    <div className={errorMessage ? 'error' : 'info'}>
      {errorMessage || infoMessage}
    </div>
  )
}
export default Notification



