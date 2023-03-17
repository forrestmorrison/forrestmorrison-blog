import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { auth, db } from "../firebaseConfig"
import { useEffect, useState } from "react"
import DeleteArticle from "./DeleteArticle"
import { useAuthState } from "react-firebase-hooks/auth"


const Articles = () => {
    const [user] = useAuthState(auth)

    const [articles, setArticles] = useState([])

    useEffect(() => {
        const articleRef = collection(db, "Articles")
        const q = query(articleRef, orderBy("createdAt", "desc"))
        onSnapshot(q, (snapshot) => {
            const articles = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setArticles(articles)
            console.log(articles)
        })
    }, [])

    return (
        <div>
            {
                articles.length === 0 ? (
                    <p>no articles found</p>
                ) : (
                    articles.map(({ 
                        id, 
                        title, 
                        description, 
                        imageUrl, 
                        createdAt,
                        createdBy,
                        userId,
                        likes,
                        comments 
                    }) => (
                        <div className="border mt-3 p-3 bg-light" key={id}>
                            <div className="row">
                                <div className="col-3">
                                    <img src={imageUrl} alt="title" style={{ height: 180, width: 180 }}/>
                                </div>
                                <div className="col-9 ps-3">
                                    <div className="row">
                                        <div className="col-6">
                                            { createdBy && (
                                                <span className="badge bg-primary">{createdBy}</span>
                                            )}
                                        </div>
                                        <div className="col-6 d-flex flex-row-reverse">
                                            { user && user.uid === userId && (
                                                <DeleteArticle id={id} imageUrl={imageUrl}/>
                                            )}
                                        </div>
                                    </div>
                                    <h3>{title}</h3>
                                    <p>{createdAt.toDate().toDateString()}</p>
                                    <h6>{description}</h6>
                                </div>
                            </div>
                        </div>
                    ))
                    
                )
            }
        </div>
    )
    }

export default Articles