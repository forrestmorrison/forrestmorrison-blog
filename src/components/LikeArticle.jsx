import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebaseConfig'


const LikeArticle = ({id, likes}) => {

    const [user] = useAuthState(auth)
    
    return (
        <div>
            <i
                className={`fa fa-heart${!likes?.includes(user.uid) ? "-o" : ""} fa-lg`}
                style={{
                    cursor: "pointer",
                    color: likes?.includes(user.uid) ? "red" : null,
                }}
            />
        </div>
  )
}

export default LikeArticle