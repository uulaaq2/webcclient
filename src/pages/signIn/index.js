import style from './style.css'
import logo from 'images/logo.png'
import React from 'react'
import B_Box from 'baseComponents/B_Box'
import B_Inputgroup from 'baseComponents/B_InputGroup'
import B_Button from 'baseComponents/B_Button'
import B_Checkbox from 'baseComponents/B_Checkbox'

const SignIn = () => {
  return (
    <>
      <div className={style.page}>
          <img src={logo} className={style.logo} />
          <span className={style.title}>Sign in to IBOS</span>
          <B_Box className={style.outerWrapper}>
            <div className={style.formContent}>
              <B_Inputgroup id='email' type='text' label='Username or email address' autocomplete="none" errorText='An error occoured'></B_Inputgroup>
              <B_Inputgroup id='password' type='password' label='Password'></B_Inputgroup>
              <B_Checkbox label='Keep me signed in'></B_Checkbox>
            </div>
            <B_Button variant='primary'>Sign in</B_Button>
          </B_Box>
      </div>
    </>
  );
};

export default SignIn