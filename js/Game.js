/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game { // Declare game Class// 
    constructor() {
        this.missed = 0;
        this.phrases = [ // add 5 new phrase objects in empty array //
            new Phrase('do not pass go'),
            new Phrase('get out of jail free card'),
            new Phrase('big bucks no whammys'),
            new Phrase('Press your luck'),
            new Phrase('show me the money')
        ];
        this.activePhrase = null;
    }
    /**
     * Selects random phrase from phrases property
     * @ return{Object} Phrase object chosen to be used
     */
    getRandomPhrase() {
        const randomNum = Math.floor(Math.random() * this.phrases.length)
        return this.phrases[randomNum];
    }

    /**
     * Begins game by selecting a random phrase and displaying it to user
     */
    startGame() {
        document.getElementById("overlay").style.display = "none";
        document.body.style.background = "url('https://media.giphy.com/media/UQ3E0nDWybQmk/giphy.gif')";
        const randomPhrase = this.getRandomPhrase()
        randomPhrase.addPhraseToDisplay()
        this.activePhrase = randomPhrase;
    }
    /**
     * Checks for winning move
     * @ return {boolean} True if game has been won, false if game wasn't won
     */
    checkForWin() {
        const showLis = document.querySelectorAll('.show');
        const letterLis = document.querySelectorAll('.letter')
        if (showLis.length === letterLis.length) {
            return true;
        } else {
            return false;
        }
    };

    /**
     * Increases the value of the missed property
     * Removes a life from the scoreboard
     * Checks if player has remaining lives and ends game if player is out
     */
    removeLife() {
        const hearts = document.querySelectorAll('img');
        hearts[this.missed].src = "images/lostHeart.png";
        this.missed += 1;
        if (this.missed === 5) {
            this.gameOver(false)
        }
    };

    /**
     * Displays game over message
     * @ param {boolean} gameWon - Whether or not the user won the game
     */
    gameOver(gameWon) {
        const overlay = document.getElementById("overlay")
        const h1 = document.getElementById("game-over-message")
        overlay.style.display = "";
        if (gameWon) {
            overlay.className = "win";
            h1.innerHTML = "Congratulations! You Won";
        }
        if (this.missed === 5) {
            overlay.className = "lose";
            h1.innerHTML = "Better Luck Next Time, Try Again!"
        }
    };

    /**
     * Handles onscreen keyboard button clicks
     * @ param (HTMLButtonElement) button - The clicked button element
     * added a green border with a light green background for correct keys
     * and a solid red border for wrong gueses.
     */
    handleInteraction(button) {
        const letter = button.textContent;

        if (this.activePhrase.checkLetter(letter)) {
            button.disabled = true;
            button.style.border = '2px solid green';
            button.style.background = "lightgreen"
            button.classList.add("chosen");
            this.activePhrase.showMatchedLetter(letter);
            this.checkForWin()

        } else {
            button.style.border = '2px solid firebrick';
            button.disabled = true;
            button.classList.add("wrong");
            this.removeLife()

        }

        if (this.checkForWin()) {
            this.gameOver(true)
        }

    };

    /** 
     * Resets keyboard. Removes 'chosen' or 'wrong' class.
     * Enables all buttons again.
     */
    resetKeyboard() {
        const keys = document.getElementsByClassName("key");
        for (let key of keys) {
            key.className = "key";
            key.disabled = false;
            key.style.background = "";
            key.style.border = "";
        }
    }

    /**
     * removes the win or lose overlay
     */
    resetOverlay() {
        const overlay = document.getElementById("overlay");
        overlay.className = "start";
        document.querySelector("h1").innerHTML = "";
    }
    /**
     * Resets the hearts back to 5.
     */
    resetLife() {
        const hearts = document.querySelectorAll('img');
        hearts.forEach(heart => {
            heart.src = "images/liveHeart.png"
        })
    };
}