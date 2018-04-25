var Letter = require('./letter.js')
function Word(word){
  var splitword = word.split('');
  var wordArray = [];
  splitword.forEach(function(element){
    var letter = new Letter(element)
    wordArray.push(letter)
  })
  this.stringWord = word
  this.word = wordArray
  this.wordDisplay = function(){
    var display = [];
    this.word.forEach(function(element){
      display.push(element.display())
    })
    return display
  }
  this.guess = function(letter){
    var found = false;
    this.word.forEach(function(element){
      if(element.check(letter)){
        found = true;
      }
    })
    return found
  }
}
module.exports = Word
