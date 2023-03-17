import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig'

const LikeArticle = ({id, likes}) => {

    const [user] = useAuthState(auth)
    
    return (
        <div>
        </div>
  )
}

export default LikeArticle