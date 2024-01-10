var currentUser = JSON.parse(localStorage.getItem("currentUser"));
var currentUserName = currentUser[0].username;

function writeCurrentUser(){
    var welcomeMessageSpan = document.getElementById("isim");
    welcomeMessageSpan.innerHTML = currentUserName;
}

const saveBtn = document.getElementById("saveBtn");
const codesContainer = document.getElementById("codes");

saveBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const code = document.getElementById("code").value;
  console.log(code);
  console.log("çalıştı");

  addCodeToPage(code);

  document.getElementById("code").value = "";
});

function addCodeToPage(code) {

  var codeContainerDiv = document.createElement("div");
  codeContainerDiv.classList.add("code-container");

  // Yeni bir div oluştur
  var cardDiv = document.createElement("div");
  cardDiv.classList.add("card");
  cardDiv.style.margin = "30px";

  // Header div'i oluştur
  var headerDiv = document.createElement("div");
  headerDiv.classList.add("header");

  // Top div'i oluştur
  var topDiv = document.createElement("div");
  topDiv.classList.add("top");

  // del buton
  var delBtn = document.createElement("button");
  delBtn.innerHTML = "Delete";
  delBtn.style.backgroundColor = "black";
  delBtn.style.color = "white";
  delBtn.style.width = "300px";
  delBtn.style.borderRadius = "5px"

  delBtn.addEventListener("click", function() {
    cardDiv.remove();

    removeFromLocalStorage(code);
  })

  // Renk daireleri
  var colors = ["red", "yellow", "green"];
  colors.forEach(function (color) {
    var circleDiv = document.createElement("div");
    circleDiv.classList.add("circle");

    var span = document.createElement("button");
    span.classList.add(color);
    span.classList.add("circle2");

    circleDiv.appendChild(span);
    topDiv.appendChild(circleDiv);
  });

  // Başlık
  var titleDiv = document.createElement("div");
  titleDiv.classList.add("title");
  var titleP = document.createElement("p");
  titleP.setAttribute("id", "title2");
  titleP.textContent = "Codes";
  titleDiv.appendChild(titleP);

  // Header içine elemanları ekle
  headerDiv.appendChild(topDiv);
  headerDiv.appendChild(titleDiv);

  // Code container ve textarea oluştur
  var codeContainerDiv = document.createElement("div");
  codeContainerDiv.classList.add("code-container");
  var textArea = document.createElement("textarea");
  textArea.setAttribute("name", "code");
  textArea.setAttribute("id", "code");
  textArea.classList.add("area");
  textArea.setAttribute("placeholder", "Your text here...");
  textArea.textContent = code;
  codeContainerDiv.appendChild(textArea);


  // Kart içine header ve code container'ı ekle
  cardDiv.appendChild(headerDiv);
  cardDiv.appendChild(codeContainerDiv);
  cardDiv.appendChild(delBtn);


  // İlgili elementi belirli bir alanın içine yerleştirme
  var targetElement = document.querySelector("#codes"); 
  targetElement.appendChild(cardDiv);

  const storedCodes = localStorage.getItem(currentUserName + "userCodes");
  const codes = storedCodes ? JSON.parse(storedCodes) : [];

  const existingCodeIndex = codes.findIndex(n => n.code === code);

  if (existingCodeIndex !== -1) {
        
    codes[existingCodeIndex] = { code };
  } else {
    
    codes.push({code});
  }

  saveCodes(codes);
}

function removeFromLocalStorage(code) {
  const storedCodes = localStorage.getItem(currentUserName + "userCodes");
  if (storedCodes) {
    let codes = JSON.parse(storedCodes);

    const codeIndex = codes.findIndex((c) => c.code === code);

    if (codeIndex !== -1) {

      codes.splice(codeIndex, 1);

      saveCodes(codes);
    }
  }
}

function saveCodes(codes) {
    localStorage.setItem(currentUserName + "userCodes", JSON.stringify(codes));
}

const settingsIcon = document.querySelector('.settings-icon');
const settingsMenu = document.querySelector('.settings-menu');

settingsIcon.addEventListener('click', () => {
    settingsMenu.style.display = settingsMenu.style.display === 'none' ? 'block' : 'none';
});

function loadCodes() {
    const storedCodes = localStorage.getItem(currentUserName + "userCodes");
    if (storedCodes) {
        const codes = JSON.parse(storedCodes);
  
        for (const code of codes) {
            addCodeToPage(code.code);
        }
    }
}

window.onload = function() {
    writeCurrentUser();
    loadCodes();
}

const deleteAccountBtn = document.getElementById("deleteAccountBtn");
const forClassicBtn = document.getElementById("forClassicBtn");
const toDoListBtn = document.getElementById("toDoListBtn")

deleteAccountBtn.addEventListener('click', () => {
  const users = JSON.parse(localStorage.getItem('users'));
  const filteredUsers = users.filter(user => user.username !== currentUserName);
  localStorage.setItem('users', JSON.stringify(filteredUsers));

  console.log('Hesap silindi');

  localStorage.removeItem(currentUserName + "userNotes")
  localStorage.removeItem(currentUserName + "deletedNotes")
  localStorage.removeItem(currentUserName + "userCodes")

  localStorage.setItem("currentUser", []) 

  window.location.href = "index.html"
});

forClassicBtn.addEventListener("click", () => {

  window.location.href = "dashboard.html"
})

toDoListBtn.addEventListener("click" , () => {

  window.location.href = "todo.html";
} )

function displayTime() {
  var saatElement = document.getElementById("saat");
  var zaman = new Date();
  var saat = zaman.getHours();
  var dakika = zaman.getMinutes();
  var saniye = zaman.getSeconds();

  saat = saat < 10 ? "0" + saat : saat;
  dakika = dakika < 10 ? "0" + dakika : dakika;
  saniye = saniye < 10 ? "0" + saniye : saniye;

  var currentTime = saat + ":" + dakika + ":" + saniye;
  saatElement.textContent = currentTime;
}

setInterval(displayTime, 1000); // Her saniyede bir güncelle
displayTime(); // Sayfa yüklendiğinde saatı göster

document.addEventListener('DOMContentLoaded', function() {
  const currentDateElement = document.getElementById('currentDate');

  // API'den tarihi al
  fetch('https://worldtimeapi.org/api/ip')
    .then(response => response.json())
    .then(data => {
      const dateTime = new Date(data.datetime);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = dateTime.toLocaleDateString('tr-TR', options);
      currentDateElement.textContent = formattedDate;
    })
    .catch(error => {
      console.log('Tarih alınamadı: ', error);
      currentDateElement.textContent = 'Tarih alınamadı.';
    });
});

const darkModeToggle = document.getElementById('toggle');
let isDarkMode = JSON.parse(localStorage.getItem('isDarkMode')) || false;

function toggleDarkMode() {
  const body = document.body;
  const settingsBtn = document.getElementsByClassName("settings-icon")
  if (isDarkMode) {
    body.style.backgroundColor = 'black';
    body.style.color = 'white';
    settingsBtn.style.backgroundColor = "white";

  } else {
    body.style.backgroundColor = 'white';
    body.style.color = 'black';
  }
  localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
}

darkModeToggle.checked = isDarkMode;
toggleDarkMode();

darkModeToggle.addEventListener('change', () => {
  isDarkMode = !isDarkMode;
  toggleDarkMode();
});