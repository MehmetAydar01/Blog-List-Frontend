import PropTypes from 'prop-types'
import { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const closeForm = { display: visible ? 'none' : '' }
  const openForm = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={closeForm}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={openForm}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node, // children'ın bir React node olduğunu belirtiyoruz
}

Togglable.displayName = 'Togglable'

export default Togglable
