/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */
class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }
  /**
   * Display phrase on game board
   */
  addPhraseToDisplay() {
    const ul = document.getElementById("phrase");
    ul.innerHTML = "";
    const splitPhrase = this.phrase.split("");
    splitPhrase.forEach(letter => {
    const li = document.createElement('li');
      ul.append(li);
      if (letter === " ") {
        li.classList.add("space");
      } else {
        li.innerHTML = letter;
        li.classList.add('letter', `${letter}`);
      }
    });
  }
  /**
   * Checks if passed letter is in phrase
   * @ param (string) letter - Letter to check
   */
  checkLetter(letter) {
    if (this.phrase.includes(letter)) {
      return true;
    } else {
      return false;
    }
  };
  /**
   * Displays passed letter on screen after a match is found
   * @ param (string) letter - Letter to display
   */
  showMatchedLetter(letter) {
    if (this.checkLetter(letter)) {
      document.querySelectorAll(`.${letter}`).forEach(li => li.classList.add('show'))
    };
  };
}