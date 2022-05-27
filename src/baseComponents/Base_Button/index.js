import React from 'react';

const B_Button = ({
  children,
  variant = 'default',
  className = '',
  disabled = false,
  loading = false,
  onClick = () => undefined
}) => {
  let buttonType = ''
  if (variant) {
    buttonType = 'btn-' + variant
    if (variant !== 'link') {
      buttonType = 'btn ' + buttonType
    }
  }

  return (
    <button className={`${buttonType} ${className}`} type="button" disabled={loading} onClick={onClick}>{children} {loading && ( <span className="AnimatedEllipsis"></span>)}</button>
  );
};

export default B_Button