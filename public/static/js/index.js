document.getElementById("btn-login").onclick = function () {
    location.href = "/login";
};

function createAccount(event) {      

    event.preventDefault();  

    const userData = {        
        username: document.getElementById("txtbox-username").value,        
        password: document.getElementById("txtbox-password").value       
    }    
        fetch('/createAccount', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData) // body data type must match "Content-Type" header
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.Success) {
                    window.sessionStorage.accessToken = data.accessToken
                    alert('Create Account Successful')
                }
                if (!data.Success) {
                    alert('Register Failed')
                }
            })
    }
