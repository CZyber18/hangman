
const max_num_of_guesses = 7;

const keyboard = document.getElementById("keyboard");
const hangman_img = document.getElementById("hangman_img");
const game_result = document.getElementById("game_result");
const letter_display = document.getElementById("letter_display");
const hint = document.getElementById("hint");
const status_message = document.getElementById("status_message");
const new_game_btn = document.getElementById("new_game_btn");

let incorrect_count = 0;
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
    btn.id = `${char}`;
    btn.addEventListener("click", letterClicked);
    keyboard.appendChild(btn);
}



function startGame() {
    random_index = Math.floor(Math.random() * (amount_of_words + 1));
    current_word = new Word(word_bank[random_index].word, word_bank[random_index].hint);
    //
    console.log(amount_of_words);
    console.log(current_word);
    console.log(current_word.getWord());
    console.log(current_word.getHint());
    console.log(current_word.getLength());
    //

    hangman_img.src = `images/snoopy${incorrect_count}.png`;
    letter_display.innerHTML = `<span>${current_word.getProgress().join(" ")}</span>`;
    hint.innerHTML = `<p> Hint: ${current_word.getHint()}</p>`

}

function letterClicked(event) {
    let current_letter = event.target.textContent
    let current_letter_btn = document.getElementById(`${current_letter}`);

    if (!current_letter_btn.classList.contains("btn_disabled") && incorrect_count != max_num_of_guesses) {
        let match_indices = [];
        for (let i = 0; i < current_word.getLength(); i++) {
            if (current_word.getWord()[i].toUpperCase() === current_letter) {
                match_indices.push(i);
            }
        }

        if (match_indices.length > 0) {
            for (let i = 0; i < match_indices.length; i++) {
                current_word.getProgress()[match_indices[i]] = current_letter;
            }

            letter_display.innerHTML = `<span>${current_word.getProgress().join(" ")}</span>`;
            if(current_word.getProgress().includes("_") === false){

            }

        }
        else {
            incorrect_count++;
            hangman_img.src = `images/snoopy${incorrect_count}.png`;
            status_message.innerHTML = `Incorrect Guesses: ${incorrect_count} / ${max_num_of_guesses}`;

            if (incorrect_count == max_num_of_guesses) {
                game_result.innerHTML = "<span>Game Over!</span>";
                letter_display.innerHTML = `The word was: ${current_word.word}`;
                new_game_btn.innerHTML = "Play Again";
            }

        }

        current_letter_btn.classList.add("btn_disabled");
    }

}
