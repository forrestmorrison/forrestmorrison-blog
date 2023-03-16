import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { useEffect, useState } from "react"


const Articles = () => {
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
                    articles.map(({ id, title, description, imageUrl, createdAt }) => (
                        <div className="border mt-3 p-3 bg-light" key={id}>
                            <div className="row">
                                <div className="col-3">
                                    <img src={imageUrl} alt="title" style={{ height: 180, width: 180 }}/>
                                </div>
                                <div className="col-9 ps-3">
                                    <h2>{title}</h2>
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