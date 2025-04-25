import { useState } from "react"
import { Link } from "react-router-dom"

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    return (
        <>
            <form>
                <label htmlFor="username" className="label">Username</label>
                <input className="input" name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label className="label" htmlFor='password'>Password</label>
                <input className='input' name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <p>Already have an account? <Link to="/login">Login</Link></p>
                <button id='register'>Register</button>
            </form>
        </>
    )
}

export default Register