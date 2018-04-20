function Letter(letter){
  this.letter = letter
  this.guessed = false
  this.display = function(){
    if(this.guessed === false){
      return '_'
    }else{
      return this.letter
    }
  }
  this.check = function(value){
    if(value === this.letter){
      this.guessed = true
    }
  }
}

module.exports = Letter;
