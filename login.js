$(document).ready(function() {

    $("#register-btn").click(function(e) {
        e.preventDefault();
        window.location.href = "register.html";
    });
    
    $("#login-form").submit(function(e) {
        e.preventDefault();

        var username = $("#username").val();
        var password = $("#password").val();
        
        var users = JSON.parse(localStorage.getItem("users")) || [];
       
        var foundUser = users.filter(function(user) {
            return user.username === username && user.password === password;
        });

        if (foundUser.length > 0) {
            localStorage.setItem("currentUser", JSON.stringify(foundUser));
            window.location.href = "dashboard";
        } else {
            alert("Hatalı kullanıcı adı veya şifre. Lütfen tekrar deneyin.");
        }
    });
});







