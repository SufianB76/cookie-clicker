let count = 0;
const cookie = document.getElementById('cookie');
const counter = document.getElementById('count');
const upgradeBtns = document.querySelectorAll('.upgrade-btn');
const restartBtn = document.getElementById('restart-btn');
const message = document.getElementById('message');
const popup = document.getElementById('popup');

cookie.addEventListener('click', () => {
    count++;
    counter.textContent = count;
    message.textContent = "";
    updateBtnHighlights();
    checkForCookieMonster()

});

upgradeBtns.forEach(button => {
    button.addEventListener('click', () => {
        const costs = parseInt(button.getAttribute('cost'));
        const newImage = button.getAttribute('image');
        const cookieName = button.getAttribute('name');

        if (count >= costs) {
            count -= costs;
            counter.textContent = count;
            // Change cookie image
            cookie.style.backgroundImage = `url(${newImage})`;
            // Show the popup with the cookie name
            showPopup(cookieName);
            message.textContent = "";
        } else {
            message.textContent = `You need ${costs - count} more clicks to buy this cookie!`;
        }
        updateBtnHighlights();
    });
});

// Reset the game state when the Restart button is clicked
restartBtn.addEventListener('click', () => {
    resetGame()
});

function updateBtnHighlights() {
    upgradeBtns.forEach(button => {
        const costs = parseInt(button.getAttribute('cost'));
        if (count >= costs) {
            button.classList.add('highlight'); // Highlight if affordable
        } else {
            button.classList.remove('highlight'); // Remove highlight if not affordable
        }
    });
}

// Function to show the popup with the purchased cookie name
function showPopup(name) {
    popup.textContent = `You bought ${name}!`;
    popup.style.display = "block";

    // Hide popup after 2 seconds
    setTimeout(() => {
        popup.style.display = "none";
    }, 2000);
}

// Function to check for random loss condition
function checkForCookieMonster() {
    const lossChance = Math.random(); // Generates a random number between 0 and 1
    const threshold = 0.01; // Sets a 1% chance of losing all progress

    if (lossChance < threshold) { //checking wheter you lost or not
        resetGame()
        message.textContent = "The cookie monster stole all your cookies!"
    }
}

// Function to reset the game state
function resetGame() {
    count = 0;
    counter.textContent = count;

    cookie.style.backgroundImage = 'url(https://dj4ao97lyirny.cloudfront.net/arcfusion/skydata/arc11a011/media/apps/arcimedes/v0/img/products/50085.jpg)'
    message.textContent = ""
    popup.style.display = "none"
    updateBtnHighlights()
}