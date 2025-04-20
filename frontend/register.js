
async function registerUser(e) {
    const username = document.getElementsByClassName('inputForm')[0].value;
    const password = document.getElementsByClassName('inputForm')[1].value; 
    e.preventDefault();
    try {
        const response = await fetch('http://127.0.0.1:8000/api/register/', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                'username':username,
                'password':password
            })
        })
        if(response.status != 201) {
            const error = await response.json();
            throw new Error("Error, ", error);
        } else window.location.href="login.html";
    } catch(err) {
        alert(err);
    }
}

document.getElementById('registerButton').addEventListener('click', registerUser);