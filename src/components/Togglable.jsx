import React, { useImperativeHandle, useState } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}>{props.btnName}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
      </div>
      <div style={showWhenVisible}>
        <button onClick={() => setVisible(false)}>cancel</button>
      </div>
    </>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable