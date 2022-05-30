import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import config from 'config'

import B_Button from 'baseComponents/Base_Button'
import { TriangleDownIcon, PersonIcon, SignOutIcon } from '@primer/octicons-react'

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'

const index = () => {
  
  const globalServices = useContext(GlobalStateContext)  
  const { send } = globalServices.authService
  const [ state  ] = useActor(globalServices.authService)    

  const navigate = useNavigate()

  const userAvatarFilePath = state.context.userInfo.status === 'ok' ? config.api.urls.user.userProfile + '/' + state.context.userInfo.user.Email + '/' + state.context.userInfo.user.Avatar : ''

  function handleRedirectToSignin() {
    navigate(config.urls.user.signIn.path)
  }

  function handleSignOut() {
    navigate(config.urls.user.signOut.path)
  }

  return (
    <div className="Header p-2">
      <div className="Header-item ml-auto">
        
       
        { state.context.userInfo.status === 'ok' &&          
          <div>
            <details className="dropdown details-reset details-overlay d-inline-block">
              <summary className="color-fg-muted d-inline" aria-haspopup="true">
                <span className='tooltipped tooltipped-w' aria-label={state.context.userInfo.user.Name} style={{cursor: 'pointer'}}> 
                    <img className="avatar avatar-5" alt="@octocat" src={userAvatarFilePath} width="20" />
                </span>
                <div className="dropdown-caret ml-2"></div>
              </summary>

              <ul className="dropdown-menu dropdown-menu-sw mr-3 mt-3 box-shadow-none">
                <li><a className="dropdown-item" href="#url">My Profile</a></li>
                <li className="dropdown-divider" role="separator"></li>
                <li><a className="dropdown-item" onClick={handleSignOut}>Sign out</a></li>
              </ul>
            </details>
          </div>
        }

        { state.context.userInfo.status !== 'ok' &&
          <B_Button variant='primary' onClick={handleRedirectToSignin}>Sign in</B_Button>
        }

        
      </div>
    </div>
  )

}

export default index