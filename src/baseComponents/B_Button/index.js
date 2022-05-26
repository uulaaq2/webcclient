import React from 'react';

const B_Button = ({
  children,
  variant = 'default'
}) => {
  let buttonType = ''
  if (variant) {
    buttonType = 'btn-' + variant
  }

  return (
    <button className={`btn ${buttonType}`} type="button">{children}</button>
  );
};

export default B_Button;