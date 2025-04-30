import {useState} from 'react'

function Friends() {
    const [search, setSearch] = useState('');
    async function lookForUser() {
        const response = await fetch(`http://127.0.0.1:8000/api/users/${search}`);
    }
    return (
        <>
        <form onSumblit={(e) => {
            e.preventDefault()
            
            }}>
         <label for='search'>Look for a user</label>
         <input id='search' type='text' value={search} onChange={(e) => setSearch(e.target.value)}/>
         <button type='submit'>Search</button>
         </form>
        </>
    )
}

export default Friends