var Letter = require('./letter.js')
function Word(word){
  var splitword = word.split('');
  var wordArray = [];
  splitword.forEach(function(element){
    var letter = new Letter(element)
    wordArray.push(letter)
  })
  this.word = wordArray
  this.wordDisplay = function(){
    var display = [];
    this.word.forEach(function(element){
      display.push(element.display())
    })
    return display
  }
  this.guess = function(letter){
    this.word.forEach(function(element){
      element.check(letter)
    })
  }
}
module.exports = Word
