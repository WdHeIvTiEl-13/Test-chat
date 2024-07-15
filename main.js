import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, ref, set, remove, onChildAdded, onChildRemoved } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyBgM0BtknIW83Li9d-L_CoD4Gb4iF8UfYU",
  authDomain: "test-chat-242c7.firebaseapp.com",
  projectId: "test-chat-242c7",
  storageBucket: "test-chat-242c7.appspot.com",
  messagingSenderId: "932191440806",
  appId: "1:932191440806:web:beef95c0635c9e1edfc967"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
var user = document.getElementById('user');
const submit = document.getElementById('submit');
const main1 = document.querySelector('.main1');
const messages = document.querySelector('.messages');
const msgInp = document.querySelector('.msgInp');


function onSubmit() {
  if (user.value != "") {
    main1.style.display = 'none';
    messages.style.display = "block";
    msgInp.style.display ="block";

  } else{
    alert('You need to enter your name first.');
  }
}
submit.addEventListener('click', onSubmit);
//variabls
var msgTxt = document.getElementById('msgTxt');
var sender;
if (sessionStorage.getItem('sender')) {
  sender = sessionStorage.getItem('sender');
} else {
  sender = user.value;
  sessionStorage.setItem('sender', sender);
}

//To send messages
module.sendMsg = function sendMsg() {
  var msg = msgTxt.value;
  msgTxt.value = "";
  var timestamp = new Date().getTime();
  set(ref(db, "messages/" + timestamp), {
    msg: msg,
    sender: sender
  })
}

//To recive messages
onChildAdded(ref(db, "messages"), (data) => {
  if (data.val().sender == sender) {
    messages.innerHTML += "<div style=justify-content:end class=header>You</div><br><div style=justify-content:end class=outer id="+data.key+"><div id=inner class=me >"+data.val().msg+"</div></div>";
  } else {
    messages.innerHTML += "<div class=header>"+data.val().sender+"</div><br><div class=outer id="+data.key+"><div id=inner class=notMe >"+data.val().msg+"</div></div>";
  }
})
