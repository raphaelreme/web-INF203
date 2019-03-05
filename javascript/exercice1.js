"use strict";

function factorialIt (n) {
  var result = 1;
  for (var i = 1; i<=n; i++) {
    result *= i;
  }
  return result;
}

function factorialRec (n) {
  if (n < 0) {
    return undefined;
  }
  if (n <= 1) {
    return 1;
  }

  return n * factorialRec(n-1);
}

function factorialArray(array) {
  var result = [];

  for (var i = 0; i < array.length; i++) {
    result.push(factorialRec(array[i]));
  }
  return result;
}

function factorialMap(array) {
  return array.map(factorialRec);
}

/*console.log(factorialRec(0));
console.log(factorialRec(5));

console.log(factorialIt(0));
console.log(factorialIt(5));

console.log(factorialArray([0,1,2,3,4,5,6,7,8,9,10]));

console.log(factorialMap([0,1,2,3,4,5,6,7,8,9,10]));
*/
exports.factorialIt = factorialIt;
exports.factorialRec = factorialRec;
exports.factorialArray = factorialArray;
exports.factorialMap = factorialMap;
