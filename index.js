var inquirer = require('inquirer');
var Word = require('./word.js');
var question = [{
  type: 'input',
  name: 'guessedLetter',
  message: 'Guess a letter!',
  validate: function(input){
    if(input.length === 1){
      return true
    }else{
      return false
    }
  }
}]
var word = new Word('book');
function guessLetter(){
  inquirer.prompt(question).then(function(response){
    var guess = response.guessedLetter;
    word.guess(guess);
    var output = word.wordDisplay();
    console.log(output.join(''))
    if(output.includes('_')){
      guessLetter()
    }else{
      console.log('YOU WIN')
      return false
    }
})}
var game = true;
while(game === true){
  game = guessLetter();
}
