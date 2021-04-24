function login(event) {
    event.preventDefault();
    const userData = {
      userName: document.getElementById("txtbox-username").value,
      password: document.getElementById("txtbox-password").value,
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
        window.location.href = '/user-records'
        alert('Successfully Logged In')
      }
      if (!data.Success) {
        alert('Log In Failed')
      }
    })

}
document.getElementById('btn-log-in').addEventListener("click", login);