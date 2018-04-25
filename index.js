var inquirer = require('inquirer');
var Word = require('./word.js');
var guessWordList = require('./list.js');

var question = [{
  type: 'input',
  name: 'guessedLetter',
  message: 'Guess a letter!',
  validate: function(input){
    if((input.length === 1) && !(Number(input))){
      return true
    }else{
      return false
    }
  }
}]
var guessedLetters = [];
var word = new Word('book');
var guesses = 7;
function guessLetter(){
  inquirer.prompt(question).then(function(response){
    if(guessedLetters.includes(response.guessedLetter)){
      console.log('---------------------------------------------------')
      console.log('You already guessed ' + response.guessedLetter + '!')
      console.log('---------------------------------------------------')
      console.log(word.wordDisplay().join(' '))
      console.log('You have: ' + guesses + ' guesses remaining.')
      guessLetter()
    }else{
      guessedLetters.push(response.guessedLetter)
      var guess = response.guessedLetter;
      var found = word.guess(guess);
      var output = word.wordDisplay();
      console.log(output.join(' '))
      if((guesses === 0)&& (output.includes('_'))){
        console.log('-----------------------------------')
        console.log('YOU LOSE!')
        console.log('The answer was: ' + word.stringWord)
        console.log('-----------------------------------')
      }else if(output.includes('_')){
        if(!found){
          guesses--
        }
        console.log('You have: ' + guesses + ' guesses remaining.')
        guessLetter()
      }else{
        console.log('-------')
        console.log('YOU WIN')
        console.log('-------')
        inquirer.prompt([{
          type: 'confirm',
          name: 'gameStatus',
          message: 'Play again?'
        }]).then(function(response){
          if(response.gameStatus === true){
            word = new Word('random')
            guesses = 7;
            guessedLetters = [];
            console.log(word.wordDisplay().join(' '))
            console.log('You have: ' + guesses + ' guesses remaining.')
            guessLetter()
          }else{
            console.log('-------------------')
            console.log('Thanks for playing!')
            console.log('-------------------')
          }
        })
      }
    }})}
    console.log("Welcome to CLI-Hangman!")
    console.log(word.wordDisplay().join(' '))
    console.log('You have: ' + guesses + ' guesses remaining.')
    guessLetter()
