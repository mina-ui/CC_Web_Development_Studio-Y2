
const pokemonImages = {
    momo: "cat.png",
    moomin: "cat.png",
    custard: "custard.png",
    caira: "dog.png",
    nibbles: "hamsters.png",
    pinky: "hamsters.png",
    rainbow: "hamsters.png",
    alka: "hamsters.png",
    hindu: "rabbit.png",
    fulungu: "rabbit.png",
    rhubarb: "rhubarb.png",
};

// Correctly define the fetchData function
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        // Select a random Pokémon from the dataset
        const randomPokemon = data[Math.floor(Math.random() * data.length)];
        return randomPokemon;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null; // Handle errors gracefully
    }
}

// Function to build the Pokémon's description
function buildDescription(pokemon) {
    return `Name: ${pokemon.name}
Type: ${pokemon.type}
Special Move: ${pokemon["special move"]}
Biggest Weakness: ${pokemon["biggest weakness"]}`;
}

// Add event listener to the button
document.getElementById("button").addEventListener("click", async () => {
    const textElement = document.getElementById("pokemonText");
    const imageElement = document.getElementById("petPokemon");

    // Call fetchData with the URL
    const pokemon = await fetchData("https://opensheet.elk.sh/1sLhEXhX2zVdVXfOcN7dRifOTNF9Bpt1iNFeSx2DdHqU/pokedex");

    if (pokemon) {
        // Generate and display the Pokémon's description
        const description = buildDescription(pokemon);
        typeWriter(description, textElement);

        // Display the Pokémon's image if available
        const imageFile = pokemonImages[pokemon.name];
        if (imageFile) {
            imageElement.src = imageFile;
            imageElement.alt = pokemon.name;
            imageElement.style.display = "block";
        } else {
            // Hide the image if no file is found
            imageElement.style.display = "none";
        }
    } else {
        // Display error message if fetching fails
        typeWriter("Failed to fetch Pokémon data. Please try again.", textElement);
        imageElement.style.display = "none"; // Hide the image
    }
});

// Typewriter function remains unchanged
function typeWriter(text, element, speed = 50) {
    let i = 0;
    element.textContent = ""; // Clear previous text

    function addCharacter() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(addCharacter, speed);
        }
    }

    addCharacter(); // Start the typing effect
}

































