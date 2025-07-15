var registerForm=document.getElementById("registerForm");
var fullname = document.getElementById('fullname');
var email = document.getElementById('email');
var password = document.getElementById('password');
alert("Register page loaded successfully");

registerForm.addEventListener('submit',function(event){
  event.preventDefault();
  console.log("Register form submitted");
  var registerData={
    name:fullname.value,
    email:email.value,
    password:password.value
  };
  console.log('Register data:', registerData);

  var url = "http://127.0.0.1:8000/api/user/create"
  fetch(url,{
    method:'POST',
    headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(registerData)
  })
  .then(res=>res.json())
  .then(data=>{
    console.log(data);
    if(data.user){
      alert("User Created Successfully");
      window.location.href="login.html";
    }
    else{
      alert("Error creating user: " + data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert("An error occurred while creating the user.");
});
})