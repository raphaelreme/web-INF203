"use strict";

var slides;
var paused;
var current_slide;

function load() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "slides.json");
  xhr.onload = function() {
    slides = JSON.parse(this.responseText);
    slides.functions = [];
    console.log(slides);
  }
  xhr.send();
}

load();


function play_slide(slide) {
  var div = document.getElementById("MAIN");
  if (div.firstChild) div.removeChild(div.firstChild);
  var frame = document.createElement("iframe");
  frame.src = slide.url;
  frame.style.height = "100%";
  frame.style.width = "100%";
  div.appendChild(frame);
  current_slide = slide;
}

function play() {
  for (let i in slides.functions)
    clearTimeout(slides.functions[i]);
  slides.functions = []
  for (let i in slides.slides) {
    slides.functions.push(setTimeout(play_slide, 1000 * slides.slides[i].time, slides.slides[i]));
  }
  document.getElementById("PAUSE").textContent = "Pause";
  paused = false;
}

function pause() {
  if (current_slide == undefined) return;
  if (paused) {
    for (let i in slides.slides) {
      if (current_slide.time < slides.slides[i].time) {
        slides.functions.push(setTimeout(play_slide, 1000*(slides.slides[i].time - current_slide.time), slides.slides[i]));
      }
    }
    document.getElementById("PAUSE").textContent = "Pause";
    paused = false;
    return;
  }
  for (let i in slides.functions) {
    clearTimeout(slides.functions[i]);
  }
  slides.functions = [];
  document.getElementById("PAUSE").textContent = "Continue";
  paused = true;
}


function previous() {
  for (let i in slides.functions)
    clearTimeout(slides.functions[i])
  slides.functions = [];
  document.getElementById("PAUSE").textContent = "Continue";
  paused = true;

  if (current_slide == undefined) return;

  var prev;
  for (let i in slides.slides) {
    if (slides.slides[i].time < current_slide.time) {
      if (prev == undefined)
        prev = slides.slides[i];
      else if (slides.slides[i].time > prev.time)
        prev = slides.slides[i];
    }
  }
  if (prev) play_slide(prev);
}


function next() {
  for (let i in slides.functions)
    clearTimeout(slides.functions[i])
  slides.functions = [];
  document.getElementById("PAUSE").textContent = "Continue";
  paused = true;

  if (current_slide == undefined) {
    console.log("no current slide");
    return;
  }

  var next;
  for (let i in slides.slides){
    if (slides.slides[i].time > current_slide.time) {
      if (next == undefined)
        next = slides.slides[i];
      else if (slides.slides[i].time < next.time)
        next = slides.slides[i];
    }
  }
  if (next) play_slide(next);
}
