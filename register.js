$(document).ready(function() {

    $("#rlogin-btn").on("click", function(e) {
        e.preventDefault();

        window.location.href = "index.html"
    });
});

document.getElementById("register-form").addEventListener("submit", function() {
 
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  let userObject = {
      username: username,
      password: password
  };

  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.push(userObject);

  localStorage.setItem("users", JSON.stringify(users));
});



  

