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

  const errored = errorText ? 'errored' : ''

  return (
    
        <div className={`form-group ${errored}`}>
          <div className='form-group-header'>
            <label htmlFor={id} className='text-normal'>{label}</label>
          </div>
          <div className='form-group-body'>
            <input className={`form-control color-bg-default`} type={type} id={id} ref={inputRef} autoComplete={autocomplete} />
            {errorText && (<div className='mt-1'><B_Inputwarning variant='danger'>{errorText}</B_Inputwarning></div>)}
          </div>
        </div>
    
  );
};

export default Inputgroup;