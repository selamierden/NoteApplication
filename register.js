$(document).ready(function() {

    $("#rlogin-btn").on("click", function(e) {
        e.preventDefault();

        window.location.href = "index.html"
    });

    $("#register-form").submit(function(event) {
        event.preventDefault();
      
        let username = $("#username").val();
        let password = $("#password").val();
      
        let userObject = {
          username: username,
          password: password
        };
      
        let users = JSON.parse(localStorage.getItem("users")) || [];
      
        users.push(userObject);
      
        localStorage.setItem("users", JSON.stringify(users));
      
        window.location.href = "index.html";
      });
      
});




  

