
async function registerUser(e) {
    e.preventDefault();
    const username = document.getElementsByClassName('inputForm')[0].value;
    const password = document.getElementsByClassName('inputForm')[1].value; 
    if (username.trim() == '') {
        alert("Please enter username!");
        return;
    } 
    if(password.trim() == '') {
        alert('Please enter password!');
        return;
    }
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