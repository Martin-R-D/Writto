import { Link } from "react-router-dom";

function Home({isLoggedIn, loggedUser}) {
    if (!isLoggedIn) return (
        <>
            <h1>Not logged in</h1>
            <Link to='/login'>Login</Link>
        </>
        );
        
    return (
       <h1>Hello, {loggedUser}!</h1>
    );
}
export default Home
