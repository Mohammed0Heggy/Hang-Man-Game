//letters
const letters ="abcdefghijklmnopqrstuvwxyz";

//get array from letters
let letterarray = letters.split("")

// select letters container
let lettersContainer = document.querySelector(".letters");

//generate letters
letterarray.forEach(letter => {
  let span = document.createElement("span");
  
  //create letter text node
  let theLetter = document.createTextNode(letter);

  //apppend the letter to span
  span.appendChild(theLetter);

  //add class on span
  span.className = "letter-box";

  //append span to the letters container
  lettersContainer.appendChild(span);
});
// Object Of Words + Categories
const words = {
  programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
  movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
  people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
  // randomWord1: ["abruptly", "absurd", "abyss", "affix", "askew", "avenue", "awkward", "axiom", "azure", "bagpipes", "bandwagon", "banjo", "bayou", "beekeeper", "bikini", "blitz", "blizzard", "boggle", "bookworm", "boxcar", "boxful", "buckaroo", "buffalo", "buffoon", "buxom", "buzzard", "buzzing", "buzzwords", "caliph", "cobweb", "cockiness", "croquet", "crypt", "curacao", "cycle", "daiquiri", "dirndl", "disavow", "dizzying", "duplex", "dwarves", "embezzle", "equip", "espionage", "euouae", "exodus", "faking", "fishhook", "fixable", "fjord", "flapjack", "flopping", "fluffiness", "flyby", "foxglove", "frazzled", "frizzled", "fuchsia", "funny", "gabby", "galaxy", "galvanize", "gazebo", "giaour", "gizmo", "glowworm", "glyph", "gnarly", "gnostic", "gossip", "grogginess", "haiku", "haphazard", "hyphen", "iatrogenic", "icebox", "injury", "ivory", 'ivy', 'jackpot', 'jaundice', 'jawbreaker', 'jaywalk', 'jazziest', 'jazzy', 'jelly', 'jigsaw', 'jinx', 'jiujitsu', 'jockey', 'jogging', 'joking', 'jovial', 'joyful', 'juicy', 'jukebox', 'jumbo', 'kayak', 'kazoo', 'keyhole', 'khaki', 'kilobyte', 'kiosk', 'kitsch', 'kiwifruit', 'klutz', 'knapsack', 'larynx', 'lengths', 'lucky', 'luxury', 'lymph', 'marquis', 'matrix', 'megahertz', 'microwave', 'mnemonic', 'mystify', 'naphtha', 'nightclub', 'nowadays', 'numbskull', 'nymph', 'onyx', 'ovary', 'oxidize', 'oxygen', 'pajama', 'peekaboo', 'phlegm', 'pixel', 'pizazz', 'pneumonia', 'polka', 'pshaw', 'psyche', 'puppy', 'puzzling', 'quartz', 'queue', 'quips', 'quixotic', 'quiz', 'quizzes', 'quorum', 'razzmatazz', 'rhubarb', 'rhythm', 'rickshaw', 'schnapps', 'scratch', 'shiv', 'snazzy', 'sphinx', 'spritz', 'squawk', 'staff', 'strength', 'strengths', 'stretch', 'stronghold', 'stymied', 'subway', 'swivel', 'syndrome', 'thriftless', 'thumbscrew', 'topaz', 'transcript']
}

// Get Random Property

let allKeys = Object.keys(words);

// Random Number Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPropNumber];

// Category Words
let randomPropvalue = words[randomPropName];

// Random Number Depend On Words
let randomvaluNumber = Math.floor(Math.random() * randomPropvalue.length);

// The Chosen Word
let randomValueValue = randomPropvalue[randomvaluNumber];

//set category info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// select letters guess Element

let letterGuessContainer = document.querySelector(".letter-guess");

// convert chosen word to array
let letterAndSpace = Array.from(randomValueValue);

//create spans depend on word 
letterAndSpace.forEach(letter => {
  //create empty span
  let emptySpan = document.createElement("span");

  //if letter is space
  if (letter === " "){
    
    //add class to the span
    emptySpan.className = "with-space"
  }

  // append spans to the letters guess container
  letterGuessContainer.appendChild(emptySpan)
});

//select guess spans
let guessSpan = document.querySelectorAll(".letter-guess span")

//set wrong attempts
let wrongAttempts = 0;

//select draw element
let theDraw = document.querySelector(".hangman-drow")

//handle Clicking on Letters
document.addEventListener("click", (e) => {
  // Set The Choose Status
  let theStatus = false;
  if(e.target.className === "letter-box"){
    e.target.classList.add("clicked");

    //get clicked letter
    let theClickedLitter = e.target.innerHTML.toLowerCase();

    // the chosen word
    // let lettersCheck = 0;
    let theChosenWord = Array.from(randomValueValue.toLowerCase());
    theChosenWord.forEach((wordLetter, wordIndex) => {
      //if the clicked litter equal to one of the chosen letter
      if(theClickedLitter == wordLetter){
        //set status to correct
        theStatus = true;
        //loop on all guess spans
        guessSpan.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex){
            span.innerHTML = theClickedLitter;
          }
        });
        // lettersCheck++;
        // if(lettersCheck === theChosenWord.length){
        //   win();
        // }
        let winmessage = false;
        for(let i = 0; i < guessSpan.length; i++){
          if(guessSpan[i].innerHTML === ""){
            console.log(guessSpan[i].innerHTML, i)
            winmessage =false;
            break;
          }
          winmessage = true;
        }
        console.log(winmessage);
        if(winmessage === true){
          win();
          document.getElementById("successend").play();
          lettersContainer.classList.add("finished")
        }
        
      }
    });
    // if letter is wrong
    if(theStatus !== true){
      // increase the wrong attempts
      wrongAttempts++;

      //add class wrong on the draw element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      //play fail sound
      document.getElementById("fail").play();
      if(wrongAttempts === 8){
        endGame();
        document.getElementById("failend").play();
        lettersContainer.classList.add("finished")
      }
    }
    else{
      //play success sound
      document.getElementById("success").play();
    }
  }
});
//end game function
function endGame(){
  // creat popup div
  let div =document.createElement("div");

  // creat text
  let divText = document.createTextNode(`Game Over, The Word Is ${randomValueValue}`);

  // append text to div
  div.appendChild(divText);

  // add class to div
  div.className = "popup";

  //append to the body
  document.body.appendChild(div);
} 

//win function
function win(){
  // creat popup div
  let div =document.createElement("div");

  // creat text
  let divText = document.createTextNode(`Congratulations, Your Score Percent Is ${((8 - wrongAttempts) / 8) * 100}%`);

  // append text to div
  div.appendChild(divText);

  // add class to div
  div.className = "popup";

  //append to the body
  document.body.appendChild(div);

}