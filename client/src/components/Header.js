import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { increaseCount, getCount } from "../features/posts/postsSlice"

const Header = () => {
    const dispatch = useDispatch()

    return (
        <header className="Header">
            <h1>Forrest's Blog</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="post">Post</Link></li>
                    <li><Link to="user">Users</Link></li>
                </ul>
                <button
                    onClick={() =>
                        dispatch(increaseCount())
                    }
                >{count}</button>
            </nav>
        </header>
    )
}

export default Header