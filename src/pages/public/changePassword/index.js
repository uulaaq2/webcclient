import React, { useState, useRef, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import logo from 'images/logo.png'
import config from 'config'
import pageInitial from 'functions/pageInitial'
import style from './style.css'
import { validateInputFields } from 'functions/validateInputFields'
import B_Button from 'baseComponents/Base_Button'
import B_Formerror from 'baseComponents/Base_Formerror'
import B_Inputgroup from 'baseComponents/Base_Inputgroup'

const getToken = (token) => token.substring(0, token.length - 2)
const getShowCurrentPassword = (token) => token.charAt(token.length - 2) === '1' ? true : false
const getRedirectToUsersHomePage = (token) => token.charAt(token.length - 1) === '1' ? true : false

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'
import useGetUserInfo from 'functions/user/useGetUserInfo'

const ChangePassword = () => {
  pageInitial( {pageName: 'user.changePassword'} )
  
  const { token } = useParams()
  const navigate = useNavigate()  

  const globalServices = useContext(GlobalStateContext)  
  const { send } = globalServices.authService
  const [ state  ] = useActor(globalServices.authService)  
  const [showPasswordIsChanged, setShowPasswordIsChanged] = useState(false)
 
  const currentPasswordRef = useRef()
  const newPasswordRef = useRef()
  const confirmNewPasswordRef = useRef()  
  
  const [erroredInputs, setErroredInputs] = useState([])  
  const [inputs] = useState({
    currentPassword: {    
      id: 'currentPassword',
      label: 'Current password',
      type: 'password',
      errorText: '',
      ref: currentPasswordRef,
      required: getShowCurrentPassword(token),
      validate: getShowCurrentPassword(token)
    },    
    newPassword: {      
      id: 'newPassword',
      label: 'New password',
      type: 'password',
      errorText: '',
      ref: newPasswordRef,
      required: true,
      validate: true
    },
    confirmNewPassword: {
      id: 'confirmNewPassword',
      label: 'Confirm new password',
      type: 'password',
      errorText: '',
      ref: confirmNewPasswordRef,
      match: newPasswordRef,
      matchLabel: 'New Password',
      required: true,
      validate: true
    },
    inputErors: 0,
    setErroredInputs: setErroredInputs,
  })  

  useEffect(() => {
    const fieldToFocus = getShowCurrentPassword(token) ? currentPasswordRef : newPasswordRef    

    fieldToFocus.current.focus()
  }, [])

  useEffect(() => {    
    if (erroredInputs[0]) {
      erroredInputs[0].focus()
    }
  }, [erroredInputs])

  useEffect(() => {
    console.log(state.value)
    console.log(state.context.userInfo)
    if (state.value === 'finished' && state.context.userInfo.status === 'ok') {
      setShowPasswordIsChanged(true)
      console.log('aaa')
    }
  }, [state.value])

  const handleChangePassword = async () => {
    try {
      const validateInputFieldsResult = validateInputFields(inputs)
      if (validateInputFieldsResult.status === 'error') { 
        throw new Error(validateInputFieldsResult.message) 
      }
      if (validateInputFieldsResult.status !== 'ok') return

      send('SIGN_IN', {    
        requestType: 'changeUserPassword',
        token: getToken(token),
        password: newPasswordRef.current.value
      })    
      
    } catch (error) {
    }
  }
  return (
    <>
      <div className={style.page}>
          <img src={logo} className={style.logo} />
          {!showPasswordIsChanged && <h1 className="f2-light mb-4">Change your password</h1> }
          
          { !showPasswordIsChanged &&
            <form className='color-bg-inset p-3 border rounded-3'>
              <div className='mb-4'>
                { getShowCurrentPassword(token) && 
                  <B_Inputgroup id={inputs.currentPassword.id} type={inputs.currentPassword.type} label={inputs.currentPassword.label} autocomplete="none" errorText={inputs.currentPassword.errorText} inputRef={currentPasswordRef}></B_Inputgroup>
                }
                <B_Inputgroup id={inputs.newPassword.id} type={inputs.newPassword.type} label={inputs.newPassword.label} autocomplete="none" errorText={inputs.newPassword.errorText} inputRef={newPasswordRef}></B_Inputgroup>              
                <B_Inputgroup id={inputs.confirmNewPassword.id} type={inputs.confirmNewPassword.type} label={inputs.confirmNewPassword.label} autocomplete="none" errorText={inputs.confirmNewPassword.errorText} inputRef={confirmNewPasswordRef}></B_Inputgroup>                            
              </div>
                <B_Button variant='primary' loading={state.context.inProgress} className='btn-block' onClick={handleChangePassword}>Save</B_Button>

                { (state.context.userInfo.status === 'accountIsExpired' || state.context.userInfo.status === 'warning' || state.context.userInfo.status === 'error') &&
                  <>
                    <B_Formerror message={state.context.userInfo.message} />
                  </>
                }
            </form>
          }
          { showPasswordIsChanged && <PasswordIsChanged countDownFrom={10} redirectTo={config.urls.home} />}
      </div>
    </>
  );
}

const PasswordIsChanged = ({ countDownFrom, redirectTo }) => {
  const [counter, setCounter] = useState(countDownFrom)
  const navigate = useNavigate()
  
  useEffect(() => {

  }, [])

  useEffect(() => {
    if (countDownFrom === null) return

    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      handleRedirect()
    }
    return () => clearInterval(timer);    
  }, [counter]);

  function handleRedirect() {
    if (!redirectTo)  {
      navigate('/')
    } else {
      navigate(redirectTo.path)
    }
  }
  
  return (
    <div class="blankslate">
      <img src="https://ghicons.github.com/assets/images/blue/png/Pull%20request.png" alt="" class="blankslate-image" />
      <h3 class="blankslate-heading">Your new password has been set</h3>
      <div class="blankslate-action">
        <B_Button variant='primary' onClick={handleRedirect}>Go to {redirectTo.name} {counter} </B_Button>
      </div>
    </div>
  )
}

export default ChangePassword;