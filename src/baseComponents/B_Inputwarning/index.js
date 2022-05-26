import React from 'react';

const B_Inputwarning = ({
  children,
  variant = 'Label--accent'
}) => {
  let className = 'Label'
  if (variant) {
    className += ' Label--' + variant
  }
  return (
    <div>
      <span className={className} style={{display: 'block', border: 'none', marginTop: '-0.2rem'}}>{children}</span>
    </div>
  );
};

export default B_Inputwarning