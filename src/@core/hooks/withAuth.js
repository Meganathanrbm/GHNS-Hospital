// src/@core/hooks/withAuth.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useRecoilValue } from 'recoil'
import {currentUserState} from '../store/details.store'

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter()
    const currentUser = useRecoilValue(currentUserState)

    useEffect(() => {
      if (!currentUser.isLoggedIn && router.pathname !== '/') {

        router.replace('/')
        console.log('go to login');
      }
      // } else if (currentUser.isLoggedIn && router.pathname === '/') {
      //   router.replace('/account-settings')
      //   console.log('go to home');
      // }

    }, [currentUser, router])

    if (!currentUser.isLoggedIn && router.pathname !== '/') {
      return null
    }

    return <WrappedComponent {...props} />
  }
}

export default withAuth
