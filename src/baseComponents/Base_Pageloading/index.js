import React from 'react'
import style from './style.css'

const B_Pageloading = ({ message = '' }) => {
  if (message === '') {
    message = 'Loading'
  }

  return (
    <div className={style.page}>
      <h2><span className='Label'>{message}<span className="AnimatedEllipsis"></span></span></h2>
    </div>
  );
};

export default B_Pageloading