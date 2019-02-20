"use strict";

function countWords(s) {
  var result = {};
  s = s.replace(/[,:;.?!'*/+|$%&^_()[\]]|\n/g, " ");

  var tab = s.split(" ");

  for (var i in tab) {
    var word = tab[i].toLowerCase();
    if (word != "") {
      if (result[word])
        result[word] += 1;
      else
        result[word] = 1;
    }
  }
  return result;
}


function WordList(s) {
  this.words = countWords(s);

  this.maxCountWord = function () {
    var word_max = Object.keys(this.words)[0];
    var max = this.words[word_max];
    for (var word in this.words) {
      var val = this.words[word];
      if (val > max || (val == max && word < word_max)) {
        max = this.words[word];
        word_max = word;
      }
    }

    return word_max;
  }

  this.minCountWord = function () {
    var word_min = Object.keys(this.words)[0];
    var min = this.words[word_min];
    for (var word in this.words) {
      var val = this.words[word];
      if (val < min || (val == min && word < word_min)) {
        min = this.words[word];
        word_min = word;
      }
    }

    return word_min;
  }

  this.getWords = function () {
    var result = [];
    for (var word in this.words) {
      result.push(word);
    }
    return result.sort();
  }

  this.getCount = function (word) {
    return this.words[word.toLowerCase()];
  }

  this.applyWordFunc = function (f) {
    return this.getWords().map(f);
  }
}

var obj = new WordList("Salut les tocards !! Je suis trop chaud. Mais il faudrait grandir. Je pense que les arbres sont beaux. Beaux comme moi. Qu'en penses tu ?");

console.log(obj.words)
console.log(obj.getWords());
console.log(obj.maxCountWord());
console.log(obj.minCountWord());
console.log(obj.getCount("Je"));

function f (word) {return word.length;}
console.log(obj.applyWordFunc(f));

exports.countWords = countWords;
exports.WordList = WordList;
