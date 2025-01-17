import PropTypes from 'prop-types'

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

NotificationMsg.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string.isRequired,
}

export default NotificationMsg
