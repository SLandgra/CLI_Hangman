var inquirer = require('inquirer');
var Word = require('./word.js');
var randomWords = require('./list.js');

var question = [{
  type: 'input',
  name: 'guessedLetter',
  message: 'Guess a letter!',
  validate: function(input){
    if((input.length === 1) && !(Number(input))){
      return true
    }else{
      console.log('\n')
      return false
    }
  }
}]
var guessedLetters = [];
var word = randomWord()
var guesses = 7;
function guessLetter(){
  inquirer.prompt(question).then(function(response){
    if(guessedLetters.includes(response.guessedLetter)){
      console.log('---------------------------------------------------')
      console.log('You already guessed ' + response.guessedLetter + '!')
      console.log('---------------------------------------------------')
      console.log(word.wordDisplay().join(' '))
      console.log('You have: ' + guesses + ' guesses remaining. \n')
      guessLetter()
    }else{
      guessedLetters.push(response.guessedLetter)
      var guess = response.guessedLetter;
      var found = word.guess(guess);
      var output = word.wordDisplay();
      console.log(output.join(' '))
      if(!found){
        guesses--
      }
      if((guesses === 0)&& (output.includes('_'))){
        console.log('-----------------------------------')
        console.log('YOU LOSE!')
        console.log('The answer was: ' + word.stringWord)
        console.log('-----------------------------------')
        playAgain()
      }else if(output.includes('_')){
        console.log('You have: ' + guesses + ' guesses remaining. \n')
        guessLetter()
      }else{
        console.log('-------')
        console.log('YOU WIN')
        console.log('-------')
        playAgain()
      }
    }})}

console.log("\nWelcome to CLI-Hangman!")
console.log(word.wordDisplay().join(' '))
console.log('You have: ' + guesses + ' guesses remaining. \n')
guessLetter()


function randomWord(){
  var indexOfWord = Math.floor(Math.random() * randomWords.length);
  return new Word(randomWords[indexOfWord])
}
function playAgain(){
  inquirer.prompt([{
    type: 'confirm',
    name: 'gameStatus',
    message: 'Play again?'
  }]).then(function(response){
    if(response.gameStatus === true){
      word = randomWord();
      guesses = 7;
      guessedLetters = [];
      console.log(word.wordDisplay().join(' '))
      console.log('You have: ' + guesses + ' guesses remaining. \n')
      guessLetter()
    }else{
      console.log('-------------------')
      console.log('Thanks for playing!')
      console.log('-------------------')
    }
  })
}
