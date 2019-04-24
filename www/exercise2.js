"use strict";

function send() {
  var xhr = new XMLHttpRequest();
  var req = document.getElementById("textedit").value;
  console.log(req);
  if (req == "") return;
  req = "chat.php?phrase="+req;
  xhr.open("GET", req);
  xhr.onload = function() {
    console.log(this.responseText);
  }
  xhr.send();
}


function reload(){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "chatlog.txt");
  xhr.onload = function() {
    var div = document.getElementById("textarea");
    var lines = this.responseText.split("\n").reverse();
    let n = div.childElementCount;
    for (let i=0; i<n; i++)
      div.removeChild(div.firstChild);
    var p;
    for (let i in lines) {
      if (lines[i] == "") continue;
      p = document.createElement("p");
      p.textContent = lines[i];
      div.appendChild(p);
      if (div.childElementCount == 10) break;
    }
  }
  xhr.send();
}

setInterval(reload, 1000);

