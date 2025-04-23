document.addEventListener("DOMContentLoaded", function () {
    checkIfEntryExists();
    getPoints();
    updatePointsDisplay();
});

async function checkIfEntryExists() {
    try {
        const response = await fetch("/check-entry-exists", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const data = await response.json();

        if (data.exists) {
            disableInputTab();
        }
    } catch (error) {
        console.error("Error checking entry:", error);
    }
}

function disableInputTab() {
    const inputTab = document.querySelector(".nav-link[href*='input']");

    if (inputTab) {
        inputTab.classList.add("disabled");
        inputTab.style.pointerEvents = "none";
        inputTab.style.opacity = "0.5";
    }
}

let userPoints = 0;

function getPoints() {

}

function updateUserPoints(points) {
    userPoints += points;
}

function updatePointsDisplay() {
    const pointLabel = document.getElementById("points");

    if (pointLabel) {
        pointLabel.innerHTML = userPoints;
    }
}
