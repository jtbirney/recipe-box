import React from 'react'

const FormField = props => {
  return(
    <span>
      <input type={props.type} id={props.name} name={props.name} onChange={props.handleChange} value={props.value} placeholder={props.label}/>
    </span>
  )
}

export default FormField
