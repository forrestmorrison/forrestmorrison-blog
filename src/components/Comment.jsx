import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../firebaseConfig'
import { v4 as uuidv4 } from 'uuid'

const Comment = ({id}) => {

    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    const [currentlyLoggedinUser] = useAuthState(auth)
    const commentRef = doc(db, "Articles", id)

    useEffect(() => {
        const docRef = doc(db, "Articles", id)
        onSnapshot(docRef, (snapshot) => {
            setComments(snapshot.data().comments)
        })
    }, [])

    const handleChangeComment = (e) => {
        if(e.key === "Enter") {
            updateDoc(commentRef, {
                comments: arrayUnion({
                    user: currentlyLoggedinUser.uid,
                    userName: currentlyLoggedinUser.displayName,
                    comment: comment,
                    createdAt: new Date(),
                    commentId: uuidv4()
                })
            })
            .then(
                () => {
                    setComment("")
                }
            )
        }
    }

    const handleDeleteComment = (comment) => {
        console.log(comment)
        updateDoc(commentRef, {
            comments: arrayRemove(comment)
        })
        .then((e) => {
            console.log(e)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className="container">
            {
                comments !== null &&
                comments.map(
                    ({ commentId, user, comment, userName, createdAt }) => (
                        <div key={commentId}>
                            <div className="border p-2 mt-2 row">
                                <div className="col-11">
                                    <span className=
                                        {`badge ${ 
                                            user === currentlyLoggedinUser.uid
                                            ? "bg-success mx-3"
                                            : "bg-primary mx-3"
                                        }`}
                                    >
                                        { userName }
                                    </span>
                                    { comment }
                                </div>
                                <div className="col-1">
                                    {
                                        user === currentlyLoggedinUser.uid && (
                                            <i 
                                                className="fa fa-times" 
                                                style={{ cursor: "pointer"}} 
                                                onClick={() => handleDeleteComment({ commentId, user, comment, userName, createdAt })}
                                            />
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )
                )
            }
            {
                currentlyLoggedinUser && (
                    <input 
                        type="text" 
                        className="form-control mt-4 mb-5" 
                        value={comment} 
                        placeholder="Add a comment"
                        onChange={(e) => {
                            setComment(e.target.value)
                        }}
                        onKeyUp={(e) => {handleChangeComment(e)}}
                    />
                )
            }
        </div>
    )
}

export default Comment