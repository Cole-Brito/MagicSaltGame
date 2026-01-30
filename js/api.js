/**
 * Author - Cole Brito
 * Date started - 1/28/2026
 * This is for querying the edhrec and scryfall APIs
 * example - https://json.edhrec.com/cards/sol-ring
 {
  name: ,
  salt: ,
  image: 
}

Scryfall random card API reference (GET): https://api.scryfall.com/cards/random
 */

// TODO: Check if commander legal
export async function fetchCard() {
    const response = await fetch('https://api.scryfall.com/cards/random');
    try {

        if (!response.ok) {
            throw new Error('Scryfall response not ok');
        }

        const data = await response.json();

        // breaking down the json into the needed compoents 
        const card = {
            name: data.name,
            image: data.image_uris?.normal || null,
            leagalities: data.legalities.commander
        };

        console.log(card);
        return card;

    } catch (error) {
        console.error('problem fetching -- Scryfall');
    }
}

export async function fetchSalt(cardName) {
    try {

        // formatting for the EDHREC URL
        const formattedName = cardName
            .toLowerCase()
            .replace(/[^a-z0-9 ]/g, "")
            .replace(/\s+/g, "-");
        
        const response = await fetch(`https://json.edhrec.com/cards/${formattedName}`);

        if (!response.ok) {
            throw new Error('EDHREC response not ok');
        }

        const data = await response.json();

        console.log(data.salt);
        return data.salt;

    } catch (error) {
        console.error('problem fetching -- EDHREC');
    }
}