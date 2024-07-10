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

//variabls
var msgTxt = document.getElementById('msgTxt');
var sender;
if (sessionStorage.getItem('sender')) {
  sender = sessionStorage.getItem('sender');
} else {
  sender = prompt('Please enter your name..');
  sessionStorage.setItem('sender', sender);
}

//To send messages
module.sendMsg = function sendMsg() {
  var msg = msgTxt.value;
  var timestamp = new Date().getTime();
  set(ref(db, "messages/" + timestamp), {
    msg: msg,
    sender: sender
  })
}

//To recive messages
onChildAdded(ref(db, "messages"), (data) => {
  if (data.val().sender == sender) {
    messages.innerHTML += "<div style=justify-content:end class=outer id="+data.key+"><div id=inner class=me >You : <br>"+data.val().msg+"</div></div>";
  } else {
    messages.innerHTML += "<div class=outer id="+data.key+"><div id=inner class=notMe >"+data.val().sender+" : <br>"+data.val().msg+"</div></div>";
  }
})
