/**
 * Author - Cole Brito
 * Date started - 1/28/2026
 * Main entry point for the Game
 */

import { fetchCard, fetchSalt } from "./api.js";
import { displayCard, enableGuessButtons } from "./game.js";

async function startRound() {
    const card1 = await fetchCard();
    const salt1 = await fetchSalt(card1.name);

    const card2 = await fetchCard();
    const salt2 = await fetchSalt(card2.name);

    displayCard(card1, card2, salt1, salt2);
    enableGuessButtons();
}

startRound();

document.getElementById("next-btn").addEventListener("click", startRound);


