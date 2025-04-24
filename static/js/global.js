document.addEventListener("DOMContentLoaded", function () {
    checkIfEntryExists();
    getPoints();
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

async function getPoints() {
    try {
        const response = await fetch("/get-points", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        data = await response.json();

        userPoints = data[0].totalPoints;

        console.log('userpoints', userPoints);
        updatePointsDisplay();
    }  catch (error) {
    console.error("Error fetching points:", error);}
}

function updateUserPoints(points) {
    //backend
    data = {'totalPoints': points};
    const response = fetch("/add-points", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

    getPoints();
}

function updatePointsDisplay() {
    const pointLabel = document.getElementById("points");

    if (pointLabel) {
        pointLabel.innerHTML = userPoints;
    }
}

// Function to handle the completion of a goal
function handleGoalCompletion(points) {
    updateUserPoints(points);
    updatePointsDisplay();
    alert("Well done! You've completed your goal! Start a new goal.");
}

// Update points display and add the functionality for goal completion
function handleGoalCompletionWithCategory(category) {
    const goalData = userGoals[category];
    if (!goalData) return;

    // Calculate points based on category and the timeframe
    const points = goalData.points; // Adjust this logic as needed based on your backend
    handleGoalCompletion(points);
}

