"use strict";

var slides;

function load() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "slides.json");
  xhr.onload = function() {
    slides = JSON.parse(this.responseText);
    console.log(slides);
  }
  xhr.send();
}

load();


function play_slide(url) {
  var div = document.getElementById("MAIN");
  if (div.firstChild) div.removeChild(div.firstChild);
  var frame = document.createElement("iframe");
  frame.src = url;
  frame.style.height = "100%";
  frame.style.width = "100%";
  div.appendChild(frame);
}

function play() {
  for (var i in slides.slides) {
    console.log(slides.slides[i]);
    setTimeout(play_slide, 1000 * slides.slides[i].time, slides.slides[i].url);
  }
}
