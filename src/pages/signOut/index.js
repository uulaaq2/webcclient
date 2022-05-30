import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import config from 'config'
import B_Pageloading from 'baseComponents/Base_Pageloading'

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'

const index = () => {
  
  const globalServices = useContext(GlobalStateContext)  
  const { send } = globalServices.authService
  const [ state  ] = useActor(globalServices.authService)    

  const navigate = useNavigate()

  useEffect(() => {
    send('SIGN_OUT')
  }, [])

  useEffect(() => {
    if (state.context.userInfo.status === '') {
      navigate(config.urls.public.path)
    }
  }, [state.context.userInfo])

  return (
    <B_Pageloading message='Please wait' />
  )
};

export default index;