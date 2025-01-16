import { useState } from "react"

const ToggleAble = (props) => {
  const [visible, setVisible] = useState(false)

  const closeForm = { display: visible ? "none" : "" }
  const openForm = { display: visible ? "" : "none" }

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

export default ToggleAble
