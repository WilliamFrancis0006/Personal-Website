// Orginal Code Adapted from (https://www.geeksforgeeks.org/design-a-typing-speed-test-game-using-javascript/)

// Time Limit
let TIME_LIMIT = 45;

// Text that the user will type
let quotes_array = [
  "In order to complete this challenge you must be able to type at super human speeds. Unless you are a robot or some kind of program I doubt that you will be able to complete it."
];

let timer_text = document.querySelector(".curr_time");
let error_text = document.querySelector(".curr_errors");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");

  
let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

let flagcheck = 0;

function updateQuote() {
    quote_text.textContent = null;
    current_quote = quotes_array[quoteNo];
    
    // Seperates each character and makes each character a <span> html element to style correct/incorrect
    current_quote.split('').forEach(char => {
      const charSpan = document.createElement('span')
      charSpan.innerText = char
      quote_text.appendChild(charSpan)
    })
    
    // Go to the next quote
    if (quoteNo < quotes_array.length - 1)
      quoteNo++;
    else
      quoteNo = 0;
  }




  function processCurrentText() {
  
    // get current input text and split it
    curr_input = input_area.value;
    curr_input_array = curr_input.split('');
    
    // increment total characters typed
    characterTyped++;
    
    errors = 0;
    
    quoteSpanArray = quote_text.querySelectorAll('span');
    quoteSpanArray.forEach((char, index) => {
      let typedChar = curr_input_array[index]
    
      // character not currently typed
      if (typedChar == null) {
        char.classList.remove('correct_char');
        char.classList.remove('incorrect_char');
    
        // correct character
      } else if (typedChar === char.innerText) {
        char.classList.add('correct_char');
        char.classList.remove('incorrect_char');
    
        // incorrect character
      } else {
        char.classList.add('incorrect_char');
        char.classList.remove('correct_char');
    
        // increment number of errors
        errors++;
      }
    });
    
    // if current text is completely typed (irrespective of errors)
    if (curr_input.length == current_quote.length) {

      // update total errors
      total_errors += errors;

      if (total_errors == 0) {
        flagcheck = 1;
        
        // clear the input area
        input_area.value = "";
        finishGame();
      }
      else {
        input_area.value = "";
        updateQuote();
      }

    }
  }

  function startGame() {
  
    resetValues();
    updateQuote();
    
    // clear old and start a new timer
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
  }
    
  function resetValues() {
    timeLeft = TIME_LIMIT;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    characterTyped = 0;
    quoteNo = 0;
    input_area.disabled = false;
    
    flagcheck = 0;

    input_area.value = "";
    quote_text.textContent = 'Click Below 2 Start';
    timer_text.textContent = timeLeft;
    restart_btn.style.display = "none";

  }

  
function updateTimer() {
    if (timeLeft > 0) {
      // decrease the current time left
      timeLeft--;
    
      // increase the time elapsed
      timeElapsed++;
    
      // update the timer text
      timer_text.textContent = timeLeft;
    }
    else {
      // finish the game
      finishGame();
    }
  }



  function finishGame() {
    // stop the timer
    clearInterval(timer);
    
    // disable the input area
    input_area.disabled = true;
    if (flagcheck == 1) {
      // show winning text
      quote_text.textContent = "Congrats!!! The Flag is TyperHer0123";
    }
    else {
      // show failure text
      quote_text.textContent = "Ha Ha Ha!! What a slow poke... ";
    }
    
    
    // display restart button
    restart_btn.style.display = "block";
    
  }