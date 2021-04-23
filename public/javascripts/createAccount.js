function createAccount(event) {      

    event.preventDefault();  

    const userData = {        
        email: document.getElementById("txtbox-username").value,        
        password: document.getElementById("txtbox-password").value,       
    }
    console.log(userData);
    if (userData.password != userData.retypePassword) { alert("The passwords do not match!") }
    else {
        fetch('/register', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData) // body data type must match "Content-Type" header
        }).then(res => res.json())
            .then(data => {
                console.log(data.err)
                if (data.Success) {
                    window.sessionStorage.accessToken = data.accessToken
                    window.location.href = '/user-records'
                    alert('Create Account Successful')
                }
                if (!data.Success) {
                    alert('Register Failed')
                }
            })
    }
}
document.getElementById('btn-sign-in').addEventListener("click", login);