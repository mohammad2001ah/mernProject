var loginForm = document.getElementById('loginForm');
var email = document.getElementById('email');
var password = document.getElementById('password');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var loginData = {
        email: email.value,
        password: password.value
    };

    console.log('Login data:', loginData);

    fetch("http://127.0.0.1:8000/api/user/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);

        if (data.token) {
            alert("Login successful");
            window.location.href = "taskView.html"; 
        } else {
            alert("Invalid email or password");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    });
});
