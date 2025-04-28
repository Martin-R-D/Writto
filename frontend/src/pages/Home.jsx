import { Link } from 'react-router-dom'
import Posts from "./Posts";
import Friends from "./Friends";
import Inbox from "./Inbox";
import ProfileSettings from "./ProfileSettings";
import { useState } from "react";
import './home.css'
function Home({isLoggedIn, loggedUser}) {
    const [page, setPage] = useState(1);
    if (!isLoggedIn) return (
        <>
            <h1>Not logged in</h1>
            <Link to='/login'>Login</Link>
        </>
        );
        
    return (
        <>
       <nav>
            <div className='navElements' style={page===1 ? {backgroundColor:'grey'} : {backgroundColor:'#f5f5f5'}} onClick={() => setPage(1)}>Posts</div>
            <div className="navElements" style={page===2 ? {backgroundColor:'grey'} : {backgroundColor:'#f5f5f5'}} onClick={() => setPage(2)}>Inbox</div>
            <div className="navElements" style={page===3 ? {backgroundColor:'grey'} : {backgroundColor:'#f5f5f5'}} onClick={() => setPage(3)}>Friends</div>
            <div className="navElements" style={page===4 ? {backgroundColor:'grey'} : {backgroundColor:'#f5f5f5'}} onClick={() => setPage(4)}>Profile</div>
        </nav>
       </>
    );
}
export default Home
