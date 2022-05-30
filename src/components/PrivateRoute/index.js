import React, {useContext, useState, useRef, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import B_Pageloading from 'baseComponents/Base_Pageloading'
import config from 'config'
import useGetUserInfo from 'functions/user/useGetUserInfo'
import AppNavbar from 'components/AppNavbar'

const index = ({ element }) => {
  const userInfo = useGetUserInfo()
  const navigate = useNavigate()
    
  useEffect(() => {
    if (userInfo.completed) {
      if (!userInfo.success) {    
        navigate(config.urls.public.path)
      }    
    }
  }, [userInfo.completed])

  return (
    <>
      { (userInfo.inProgress) && <B_Pageloading/>}
      { (userInfo.success && !userInfo.inProgress && userInfo.appStarted) && 
        <>
          <AppNavbar />
          { element }
        </>   
      }
    </>
  )

};

export default index;