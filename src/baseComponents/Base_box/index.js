import React from 'react';

const B_Box = ({ children, ...rest }) => {
  let _className = 'Box'
  const { className = '' } = {...rest}
  _className = _className + ' ' +className

  return (
    <div className={_className} >
        { children }
    </div>
  );
};

export default B_Box