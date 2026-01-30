/**
 * Author - Cole Brito
 * Date started - 1/28/2026
 * This is for handling the game logic and displaying cards
 */
const streakElement = document.getElementById("streak-value");

let streak = 0;
//TODO: Manage the state of the second cards salt visibility
let isRevealed = false;
let currentSalt1 = null;
let currentSalt2 = null;

export function displayCard(card1, card2, salt1, salt2) {
    const card1Element = document.getElementById('card-1');
    const card2Element = document.getElementById('card-2');
    
    if (!card1) {
        card1Element.innerHTML = '<p>Error loading card</p>';
        return;
    }

    if (!card2) {
        card2Element.innerHTML = '<p>Error loading card</p>';
        return;
    }

    // Store salts in module variables
    currentSalt1 = salt1;
    currentSalt2 = salt2;

    const salt1Rounded = salt1.toFixed(3);
    const salt2Rounded = salt2.toFixed(3);

    card1Element.innerHTML = `
        <div class="card-display">
            <h2>${card1.name}</h2>
            ${card1.image ? `<img src="${card1.image}" alt="${card1.name}">` : '<p>No image available</p>'}
            <p class="salt-value">Salt: ${salt1Rounded}</p>
        </div>
    `;
    card2Element.innerHTML = `
        <div class="card-display">
            <h2>${card2.name}</h2>
            ${card2.image ? `<img src="${card2.image}" alt="${card2.name}">` : '<p>No image available</p>'}
            <p class="salt-value">Salt: ??? </p>
        </div>
    `;
}

export function checkIfHigher() {
    if (currentSalt1 === null || currentSalt2 === null) {
        console.log('Salts not set');
        return;
    }
    let result;
    if (currentSalt1 > currentSalt2) {
        result = 1;
    } else {
        result = 0;
    }
    console.log('Result of comparison:', result);
    if (result === 1) {
        console.log('Player guessed correctly!');
        streak++;
    } else {
        console.log('Player guessed incorrectly.');
        streak = 0;
    }

    disableGuessButtons();

    revealSalt2();
    updateStreakDisplay();
    return result;
}

export function checkIfLower() {
    if (currentSalt1 === null || currentSalt2 === null) {
        console.log('Salts not set');
        return;
    }
    let result;
    if (currentSalt1 < currentSalt2) {
        result = 1;
    } else {
        result = 0;
    }

    console.log('Result of comparison:', result);
    if (result === 1) {
        console.log('Player guessed correctly!');
        streak++;
    } else {
        console.log('Player guessed incorrectly.');
        streak = 0;
    }

    disableGuessButtons();

    revealSalt2();
    updateStreakDisplay();
    return result;
}

function updateStreakDisplay() {
    const streakElement = document.getElementById("streak-value");
    if (streakElement) {
        streakElement.textContent = streak;
    }
}

function revealSalt2() {
    const saltElement = document.getElementById("salt-2");
    if (saltElement) {
        saltElement.textContent = `Salt: ${currentSalt2.toFixed(3)}`;
    }
}

function disableGuessButtons() {
    const higher = document.getElementById("higher-btn");
    const lower = document.getElementById("lower-btn");

    if (!higher || !lower) return;

    higher.disabled = true;
    lower.disabled = true;
}

    export function enableGuessButtons() {
    const higher = document.getElementById("higher-btn");
    const lower = document.getElementById("lower-btn");

    if (!higher || !lower) return;

    higher.disabled = false;
    lower.disabled = false;
}



window.checkIfHigher = checkIfHigher;
window.checkIfLower = checkIfLower;