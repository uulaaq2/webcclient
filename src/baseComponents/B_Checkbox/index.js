import style from 'baseComponents/B_Checkbox/style.css'
import React from 'react';

const B_Checkbox = ({
  id = '',
  label = '',
  inputRef = null
}) => {

  return (
    <div className={style.checkboxWrapper}>
      <label className={style.labelWrapper}> <input type="checkbox" ref={inputRef} style={{cursor: 'pointer', display: 'inline-block', marginTop: '0.1rem' }} /> {label} </label>      
    </div>
  );
};

export default B_Checkbox;