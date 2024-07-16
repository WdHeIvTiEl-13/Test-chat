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

// log in
var user = document.getElementById('user');
var entry = document.getElementById('Entry');
const submit = document.getElementById('submit');
const main = document.querySelector('.main');
const enter = document.querySelector('.SignIn');
const m = document.getElementById('messages');
const sendMsg = document.getElementById('sendMsg');


var msgTxt = document.getElementById('msgTxt');
var sender;

function onSubmit() {
  if (entry.value == 1437) {
    
  if (user.value != "") {
    main.style.display = 'none';
    m.style.display = 'block';
    sendMsg.style.display = 'block';

    
    
    
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
        if (data.val().msg != "") {
          messages.innerHTML += "<div style=justify-content:end class=header>You</div><div style=justify-content:end class=outer id=" + data.key + "><p id=inner class=me >" + data.val().msg + "</p></div>";
        } else {
          console.log('null');
        }
      } else {
        messages.innerHTML += "<div class=header>" + data.val().sender + "</div><div class=outer id=" + data.key + "><p id=inner class=notMe >" + data.val().msg + "</p></div>";
      }
    })
    
    
    
  } else {
    alert('You need to enter your name first.');
  }
  } else {
    alert('Invalid Entry Number');
  }
  
  
}
submit.addEventListener('click', onSubmit);
