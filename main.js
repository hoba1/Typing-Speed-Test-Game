/*
    Advices
    - Always Check The Console
    - Take Your Time To Name The Identifiers
    - DRY

    Steps To Create The Project
    [01] Create HTML Markup
    [02] Add Styling And Separate From Logic
    [03] Create The App Logic
    ---- [01] Add Levels
    ---- [02] Show Level And Seconds
    ---- [03] Add Array Of Words
    ---- [04] ِAdd Start Game Button
    ---- [05] Generate Upcoming Words
    ---- [06] Disable Copy Word And Paste Event + Focus On Input
    ---- [07] Start Play Function
    ---- [08] Start The Time And Count Score
    ---- [09] Add The Error And Success Messages
    [04] Your Trainings To Add Features
    ---- [01] Save Score To Local Storage With Date                    // done
    ---- [02] Choose Levels From Select Box                            // done
    ---- [03] Break The Logic To More Functions
    ---- [04] Choose Array Of Words For Every Level                    // done
    ---- [05] Write Game Instruction With Dynamic Values
    ---- [06] Add 3 Seconds For The First Word                         // done
*/

// Array Of Words
const Easy = [
    "Hello",
    "Code",
    "Town",
    "Scala",
    "Coding",
    "Funny",
    "Working",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
];
const Normal = [
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Paradigm",
    "Styling",
    "Cascade",
    "Working",
    "Playing"
];
const Hard = [
    "Programming",
    "Javascript",
    "Destructuring",
    "Documentation",
    "Dependencies",
];

  // Setting Levels
const lvls = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 2
};

  // Default Level
// Change Level From Here
let selectlevel = document.querySelector("#select-lvl");
let defaultLevelName = "Easy"; 
let defaultLevelSeconds = lvls[defaultLevelName];


  // Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

selectlevel.onblur = function(){
    defaultLevelName = selectlevel.value;
    defaultLevelSeconds = lvls[defaultLevelName];
    lvlNameSpan.innerHTML = defaultLevelName;
    secondsSpan.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    if(selectlevel.value == "Easy"){
        scoreTotal.innerHTML = Easy.length;
    }
    if(selectlevel.value == "Normal"){
        scoreTotal.innerHTML = Normal.length;
    }
    if(selectlevel.value == "Hard"){
        scoreTotal.innerHTML = Hard.length;
    }
};



  // Setting Level Name + Seconds + Score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = Easy.length;

  // Disable Paste Event
input.onpaste = function () {
    return false;
}

  // Start Game
startButton.onclick = function () {
    this.remove();
    input.focus();
    // Generate Word Function
    genWords();
}
let esaylength = Easy.length;
let normallength = Normal.length;
let hardlength = Hard.length;
function genWords(){
    if(selectlevel.value == "Easy"){
        // Get Random Word From Array
        let randomWord = Easy[Math.floor(Math.random() * Easy.length)];
        // Get Word Index
        let wordIndex = Easy.indexOf(randomWord);
        // Remove WordFrom Array
        Easy.splice(wordIndex, 1);
        // Show The Random Word
        theWord.innerHTML = randomWord;
        // Empty Upcoming Words
        upcomingWords.innerHTML = '';
        // Generate Words
        for (let i = 0; i < Easy.length; i++) {
        // Create Div Element
            let div = document.createElement("div");
            let txt = document.createTextNode(Easy[i]);
            div.appendChild(txt);
            upcomingWords.appendChild(div);
        }
        // Call Start Play Function
        startPlay();
    }
    if(selectlevel.value == "Normal"){
        // Get Random Word From Array
        let randomWord = Normal[Math.floor(Math.random() * Normal.length)];
        // Get Word Index
        let wordIndex = Normal.indexOf(randomWord);
        // Remove WordFrom Array
        Normal.splice(wordIndex, 1);
        // Show The Random Word
        theWord.innerHTML = randomWord;
        // Empty Upcoming Words
        upcomingWords.innerHTML = '';
        // Generate Words
        for (let i = 0; i < Normal.length; i++) {
        // Create Div Element
            let div = document.createElement("div");
            let txt = document.createTextNode(Normal[i]);
            div.appendChild(txt);
            upcomingWords.appendChild(div);
        }
        // Call Start Play Function
        startPlay();
    }
    if(selectlevel.value == "Hard"){
        // Get Random Word From Array
        let randomWord = Hard[Math.floor(Math.random() * Hard.length)];
        // Get Word Index
        let wordIndex = Hard.indexOf(randomWord);
        // Remove WordFrom Array
        Hard.splice(wordIndex, 1);
        // Show The Random Word
        theWord.innerHTML = randomWord;
        // Empty Upcoming Words
        upcomingWords.innerHTML = '';
        // Generate Words
        for (let i = 0; i < Hard.length; i++) {
        // Create Div Element
            let div = document.createElement("div");
            let txt = document.createTextNode(Hard[i]);
            div.appendChild(txt);
            upcomingWords.appendChild(div);
        }
        // Call Start Play Function
        startPlay();
    }
};



function startPlay() {
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    if(esaylength - Easy.length === 1){
        timeLeftSpan.innerHTML = defaultLevelSeconds + 5;
    }
    if(normallength - Normal.length === 1){
        timeLeftSpan.innerHTML = defaultLevelSeconds + 5;
    }
    if(hardlength - Hard.length === 1){
        timeLeftSpan.innerHTML = defaultLevelSeconds + 5;
    }
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML === "0") {
            // Stop Timer
            clearInterval(start);
            // Compare Words
            if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
            // Empty Input Field
                input.value = '';
            // Increase Score
                scoreGot.innerHTML++;
                localStorage.setItem("score",`${scoreGot.innerHTML}`);
                localStorage.setItem("date",`${new Date()}`);
                if(selectlevel.value == "Easy"){
                    if (Easy.length > 0) {
                        // Call Generate Word Function
                            genWords();
                        } else {
                        let span = document.createElement("span");
                        span.className = 'good';
                        let spanText = document.createTextNode("Congratz");
                        span.appendChild(spanText);
                        finishMessage.appendChild(span);
                        // Remove Upcoming Words Box
                        upcomingWords.remove();
                        }
                }
                if(selectlevel.value == "Normal"){
                    if (Normal.length > 0) {
                        // Call Generate Word Function
                            genWords();
                        } else {
                        let span = document.createElement("span");
                        span.className = 'good';
                        let spanText = document.createTextNode("Congratz");
                        span.appendChild(spanText);
                        finishMessage.appendChild(span);
                        // Remove Upcoming Words Box
                        upcomingWords.remove();
                        }
                }
                if(selectlevel.value == "Hard"){
                    if (Hard.length > 0) {
                        // Call Generate Word Function
                            genWords();
                        } else {
                        let span = document.createElement("span");
                        span.className = 'good';
                        let spanText = document.createTextNode("Congratz");
                        span.appendChild(spanText);
                        finishMessage.appendChild(span);
                        // Remove Upcoming Words Box
                        upcomingWords.remove();
                        }
                }
            } else {
                let span = document.createElement("span");
                span.className = 'bad';
                let spanText = document.createTextNode("Game Over");
                span.appendChild(spanText);
                finishMessage.appendChild(span);
            }
        }
    }, 1000);
}