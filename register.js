$(document).ready(function() {

  $("#rlogin-btn").on("click", function(e) {
      e.preventDefault();

      window.location.href = "index.html";
  });

  $("#register-form").submit(function(event) {
      event.preventDefault();
    
      let username = $("#username").val();
      let password = $("#password").val();
    
      // Şifre uzunluğunu kontrol et
      if (password.length < 6) {
          alert("Şifre en az 6 karakter olmalıdır.");
          return; // İşlemi durdur
      }
    
      let userObject = {
        username: username,
        password: password
      };
    
      let users = JSON.parse(localStorage.getItem("users")) || [];
    
      // Kullanıcı adı mevcut kontrolü
      let existingUser = users.find(user => user.username === username);
      if (existingUser) {
          alert("Bu kullanıcı adı zaten kullanılıyor. Başka bir kullanıcı adı seçin.");
          return; // İşlemi durdur
      }
    
      users.push(userObject);
    
      localStorage.setItem("users", JSON.stringify(users));
    
      window.location.href = "index.html";
  });
}); 





  

