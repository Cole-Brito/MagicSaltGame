/**
 * Author - Cole Brito
 * Date started - 1/28/2026
 * Main entry point for the Game
 * 
 * https://cole-brito.github.io/MagicSaltGame/
 */

import { fetchCard, fetchSalt } from "./api.js";
import { displayCard, enableGuessButtons, disableNextButton } from "./game.js";

// var slider = document.getElementById("myRange");
// // display element in HTML showing the current slider value
// var output = document.getElementById("slider-value");
// output.innerHTML = slider.value;

// // Update the current slider value (each time you drag the slider handle)
// slider.oninput = function() {
//     output.innerHTML = this.value;
// };

async function startRound() {
    const card1 = await fetchCard();
    const salt1 = await fetchSalt(card1.name);
    
    const card2 = await fetchCard();
    const salt2 = await fetchSalt(card2.name);

    displayCard(card1, card2, salt1, salt2);
    enableGuessButtons();
    disableNextButton();
}

startRound();

document.getElementById("next-btn").addEventListener("click", startRound);


