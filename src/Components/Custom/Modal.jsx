import React from 'react'

export const Modal = ({
    props
}) => {
  return (
    <div className= {`modalOverlay ${props.isOpen ? 'open' : 'close'}`}>
        <div>
        </div>
        
    </div>
  )
}
