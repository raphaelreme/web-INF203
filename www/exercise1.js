"use strict";

function loadDoc() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "text.txt");
  xhr.onload = function() {
    var obj = document.getElementById("textarea");
    obj.textContent += this.responseText;
  }
  xhr.send();
}

function generate_color() {
  var col = "#";
  var cols = "0123456789ABCDEF";

  for (var i = 0; i<6; i++) {
    col += cols[Math.floor(Math.random()*16)];
  }
  return col;
}


function loadDoc2() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "text.txt");
  xhr.onload = function() {
    var div = document.getElementById("textarea2");
    var lines = this.responseText.split("<br/>");
    var p;
    for (var i in lines) {
      p = document.createElement("p");
      p.textContent = lines[i];
      p.style.color = generate_color();
      console.log(p.style.color);
      div.appendChild(p);
    }
  }
  xhr.send();
}
