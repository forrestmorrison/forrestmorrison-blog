import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { auth, db } from '../firebaseConfig'
import LikeArticle from './LikeArticle'
import Comment from './Comment'

const Article = () => {

    const { id } = useParams()
    const [article, setArticle] = useState(null)
    const [user] = useAuthState(auth)

    useEffect(() => {
        const docRef = doc(db, "Articles", id)
        onSnapshot(docRef, (snapshot) => {
            setArticle({ ...snapshot.data(), id: snapshot.id })
        })
    }, [])

    return (
        <div className="container" style={{ marginTop: 70 }}>
            {
                article && (
                    <div className="row">
                        <div className="col-3">
                            <img 
                                src={article.imageUrl} 
                                alt={article.title}
                                style={{ width: "100%", padding: 10 }}
                            />
                        </div>
                        <div className="col-9 mt-3">
                            <h2>{article.title}</h2>
                            <h5>Author: {article.createdBy}</h5>
                            <div>Posted on: {article.createdAt.toDate().toDateString()}</div>
                            <hr/>
                            <h4>{article.description}</h4>
                            <div className="d-flex flex-row-reverse">
                                { user && <LikeArticle id={id} likes={article.likes} /> }
                                <div className="pe-2">
                                    <p>{ user && article.likes.length }</p>
                                </div>
                            </div>
                            <Comment id={article.id}/>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Article