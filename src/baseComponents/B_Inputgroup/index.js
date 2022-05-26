import style from 'baseComponents/B_Inputgroup/style.css'
import React from 'react'
import B_Inputwarning from 'baseComponents/B_Inputwarning'

const Inputgroup = ({ 
    id = '',
    label = '', 
    type = 'text', 
    maxLength = 255,
    errorText = '',
    autocomplete = '',
    inputRef = null,
  }) => {

  let className = style.inputgroupWrapper
  if (errorText) {
    className += ' errored'
  }

  console.log(className)

  return (
    <div className={className}>
        <label className={style.formLabel} htmlFor={id}>{label}</label>
        <input className={`form-control ${style.formInput}`} type={type} id={id} ref={inputRef} autoComplete={autocomplete} />
        {errorText && (<B_Inputwarning variant='danger'>{errorText}</B_Inputwarning>)}
    </div>
  );
};

export default Inputgroup;