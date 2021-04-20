function login(event) {
    event.preventDefault();
    const userData = {
      userName: document.getElementById("usernameInput").value,
      password: document.getElementById("passwordInput").value,
    }
fetch('/login', {
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
        window.location.href = '/'
        alert('Successfully Logged In')
      }
      if (!data.Success) {
        alert('Log In Failed')
      }
    })

}