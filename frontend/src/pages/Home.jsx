import { Link } from "react-router-dom";

function Home({isLoggedIn}) {
    if (!isLoggedIn) return (
        <>
            <h1>Not logged in</h1>
            <Link to='/login'>Login</Link>
        </>
        );
    return (
       <h1>Home</h1>
    );
}
export default Home
