


const keyboard = document.getElementById("keyboard");
const hangman_img = document.getElementById("hangman_img");
const letter_display = document.getElementById("letter_display");
const hint = document.getElementById("hint");
const status_message = document.getElementById("status_message");
const new_game_btn = document.getElementById("new_game_btn");

let incorrect_count = 0;
let hangman_img_count = 1;
let word_bank;
let amount_of_words;
let current_word;
let current_word_index;
let random_index;

const fetch_file_location = "data/word_list.json"; //needs to be relative path needs fixing

fetch(fetch_file_location)
    .then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            console.log("Error: Fetch failed");
        }
    })
    .then(function (data) {
        word_bank = data;
        amount_of_words = Object.keys(data).length;
        startGame();
    })
    .catch(function (error) {
        console.error(error);
    });



for (let asciiCode = 65; asciiCode <= 90; asciiCode++) {
    const char = String.fromCharCode(asciiCode);
    const btn = document.createElement("button");
    btn.textContent = char;
    btn.addEventListener("click", function () {
        console.log("Pressed:", char);
    });
    keyboard.appendChild(btn);
}

function startGame() {
    random_index = Math.floor(Math.random() * (amount_of_words + 1));
    current_word = new Word(word_bank[random_index].word, word_bank[random_index].hint);
    console.log(amount_of_words);
    console.log(current_word);
    console.log(current_word.getWord());
    console.log(current_word.getHint());
    console.log(current_word.getLength());

    hangman_img.src = `../hangman/images/snoopy${hangman_img_count}.png`;
    var blanks = "";
    for(let i = 1; i < current_word.getLength(); i++){
        blanks += "_ ";
    }
    letter_display.innerHTML = `<p>${blanks}</p>`;

    hint.innerHTML = `<p> Hint: ${current_word.getHint()}</p>`

}

