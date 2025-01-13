const NotificationMsg = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div
      className={`${type === 'error' ? 'error' : ''} ${
        type === 'success' ? 'success' : ''
      }`}
    >
      {message}
    </div>
  )
}

export default NotificationMsg
