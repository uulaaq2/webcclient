import style from './style.css'
import logo from 'images/logo.png'
import React, {useContext, useState, useRef, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import B_Inputgroup from 'baseComponents/B_InputGroup'
import B_Button from 'baseComponents/B_Button'
import B_Checkbox from 'baseComponents/B_Checkbox'

import config from 'config'
import pageInitial from 'functions/pageInitial'
import { validateInputFields } from 'functions/validateInputFields'

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'

const SignIn = () => {
  pageInitial( {pageName: 'user.signIn'} )

  const globalServices = useContext(GlobalStateContext)  
//  const isLoggedIn = useSelector(globalServices.authService, loggedInSelector);
  const { send } = globalServices.authService
  const [ state  ] = useActor(globalServices.authService)  

  const emailRef = useRef()
  const passwordRef = useRef()
  const rememberMeRef = useRef()  
  const navigate = useNavigate()
  
  const [erroredInputs, setErroredInputs] = useState([])  
  const [inputs] = useState({
    email: {      
      id: 'email',
      label: 'Email or user name',
      type: 'text',
      errorText: '',
      ref: emailRef,
      required: true,
      validate: true
    },
    password: {
      id: 'password',
      label: 'Password',
      type: 'password',
      errorText: '',
      ref: passwordRef,
      required: true,
      validate: true
    },
    inputErors: 0,
    setErroredInputs: setErroredInputs,
  })  

  useEffect(() => {    
    inputs.email.ref.current.focus()
  }, [])

  useEffect(() => {    
    if (erroredInputs[0]) {
      erroredInputs[0].focus()
    }
  }, [erroredInputs])

  async function handleSignin() {

    const validateInputFieldsResult = validateInputFields(inputs)
    if (validateInputFieldsResult.status === 'error') { 
      throw new Error(validateInputFieldsResult.message) 
    }
    if (validateInputFieldsResult.status !== 'ok') return
  
    send('SIGN_IN', {    
      requestType: 'signInWihCredentials',
      email: emailRef.current.value, 
      password: passwordRef.current.value, 
      rememberMe: rememberMeRef.current.checked
    })

  }

  return (
    <>
      <div className={style.page}>
          <img src={logo} className={style.logo} />
          <form className='color-bg-inset p-3 border rounded-3'>
            <div className='mb-4'>
              <B_Inputgroup id={inputs.email.id} type={inputs.email.type} label={inputs.email.label} autocomplete="none" errorText={inputs.email.errorText} inputRef={emailRef}></B_Inputgroup>
              <B_Inputgroup id={inputs.password.id} type={inputs.password.type} label={inputs.password.label} errorText={inputs.password.errorText} inputRef={passwordRef}></B_Inputgroup>
              <B_Checkbox label='Keep me signed in' inputRef={rememberMeRef}></B_Checkbox>
            </div>
              <B_Button variant='primary' loading={state.context.inProgress} className='btn-block' onClick={handleSignin} disabled={state.context.inProgress}>Sign in</B_Button>
          </form>
      </div>
    </>
  );
};

export default SignIn