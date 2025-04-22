const userGoals = {
        sleep: {goal: 100, startDate: '2025-04-10', timeframe: 14},
        screenTime: {goal: 28, startDate: '2025-04-10', timeframe: 7},
        water: {goal: 10, startDate: '2025-04-10', timeframe: 7},
        steps: {goal: 100000, startDate: '2025-04-10', timeframe: 10},
        work: {goal: 40, startDate: '2025-04-10', timeframe: 7},
        mood: {goal: 4, startDate: '2025-04-10', timeframe: 30}
    };

async function fetchGoals(){
    try {
        const response = await fetch("/get-goals", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        console.log("Data received:", data);

        // Initialize userGoals
        const userGoalss ={}

        data.forEach((goal) => {
            userGoals[goal.category] = {
                goal: goal.goal,
                startDate: goal.created_at,
                timeframe: goal.timeframe,
            };
        });

        console.log(userGoalss);


    }  catch (error) {
    console.error("Error fetching data:", error);}
}


async function fetchData() {
    try {
        const response = await fetch("/get-data", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        console.log("Data received:", data);
        loadUserData(data);
    }  catch (error) {
    console.error("Error fetching data:", error);}
}

function calculateDaysElapsed(date) {
    const currentDate = new Date();
    const goalStartDate = new Date(date);
    const diffTime = currentDate - goalStartDate;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

function calculateProgress(entries, category) {
    let total = 0;
    entries.forEach(entry => {
        total += entry[category];
    });
    return total;
}

function calculateMoodProgress(entries) {
    let total = 0;
    let length = entries.length;
    entries.forEach(entry => {
        total += entry['mood'];
    });
    return total / length;
}

function updateProgressBar(barId, goal, timeframe, currentProgress) {
    let progress = (currentProgress / goal) * 100;
    if (progress > 100) progress = 100;

    barId.style.width = `${progress}%`;
}

function updateTimeRemaining() {
    const daysElapsed = calculateDaysElapsed(userGoals.sleep.startDate);

    Object.entries(userGoals).forEach(category => {
        const timeRemaining = Math.max(0, category[1].timeframe - daysElapsed);
        document.getElementById(`${category[0]}RemainingTime`).innerHTML = `Time remaining: ${timeRemaining} days`;
    });
}

function loadUserData(entries) {
    // Load data into the goal cards
    document.getElementById("sleepText").innerText = `Current goal: ${userGoals.sleep.goal} hours in ${userGoals.sleep.timeframe} days`;
    document.getElementById("screenText").innerText = `Current goal: ${userGoals.screenTime.goal} hours in ${userGoals.screenTime.timeframe} days`;
    document.getElementById("waterText").innerText = `Current goal: ${userGoals.water.goal} liters in ${userGoals.water.timeframe} days`;
    document.getElementById("stepText").innerText = `Current goal: ${userGoals.steps.goal} steps in ${userGoals.steps.timeframe} days`;
    document.getElementById("workText").innerText = `Current goal: ${userGoals.work.goal} hours in ${userGoals.work.timeframe} days`;
    document.getElementById("moodText").innerText = `Current goal: Mood rating of ${userGoals.mood.goal} in ${userGoals.mood.timeframe} days`;

    // Calculate the progress for each goal category
    const sleepProgress = calculateProgress(entries, 'sleep');
    const screenTimeProgress = calculateProgress(entries, 'screenTime');
    const waterProgress = calculateProgress(entries, 'water');
    const stepsProgress = calculateProgress(entries, 'steps');
    const workProgress = calculateProgress(entries, 'work');
    const moodProgress = calculateMoodProgress(entries);

    // Update progress bars based on the existing data
    updateProgressBar(P1, userGoals.sleep.goal, userGoals.sleep.timeframe, sleepProgress);
    updateProgressBar(P2, userGoals.screenTime.goal, userGoals.screenTime.timeframe, screenTimeProgress);
    updateProgressBar(P3, userGoals.water.goal, userGoals.water.timeframe, waterProgress);
    updateProgressBar(P4, userGoals.steps.goal, userGoals.steps.timeframe, stepsProgress);
    updateProgressBar(P5, userGoals.work.goal, userGoals.work.timeframe, workProgress);
    updateProgressBar(P6, userGoals.mood.goal, userGoals.mood.timeframe, moodProgress);

    updateTimeRemaining();
}

var currentGoalCategory = "";

function openGoalModal(goalCategory) {
    document.getElementById("goalInput").value = '';
    document.getElementById("timeframeInput").value = '';
    currentGoalCategory = goalCategory;
    const readableName = {
        sleep: "Sleep",
        screenTime: "Screen Time",
        water: "Water Intake",
        steps: "Steps",
        work: "Work Hours",
        mood: "Mood"
    }[goalCategory];

    document.getElementById("goalMetricName").innerText = `Editing Goal for: ${readableName}`;
    document.getElementById("goalModal").style.display = "block";
}

function closeModal() {
    document.getElementById("goalModal").style.display = "none";
    currentGoalCategory = "";
}

function submitGoal() {
    const goalValueRaw = document.getElementById("goalInput").value;
    const timeframeRaw = document.getElementById("timeframeInput").value;

    if (!goalValueRaw || !timeframeRaw) {
        alert("Please enter both goal and timeframe.");
        return;
    }

    const goalValue = parseFloat(goalValueRaw);
    const timeframe = parseInt(timeframeRaw);

    if (isNaN(goalValue) || isNaN(timeframe) || goalValue < 0 || timeframe <= 0) {
        alert("Please enter valid numeric values for goal and timeframe.");
        return;
    }

    let isValid = false;
    let goalText = "";
    let progressKey = "";
    let maxGoal = 0;

    switch (currentGoalCategory) {
        case "sleep":
            maxGoal = 24 * timeframe;
            if (goalValue <= maxGoal) {
                userGoals.sleep.goal = goalValue;
                userGoals.sleep.timeframe = timeframe;
                goalText = `${goalValue} hours in ${timeframe} days`;
                document.getElementById("sleepText").innerText = `Current goal: ${goalText}`;
                updateProgressBar(P1, goalValue, timeframe, userGoals.sleep.currentProgress);
                isValid = true;
                
                //Backend stuff
                data = {"category": "sleep", "timeframe" : timeframe, "goal":goalValue, "points": timeframe }
                const response = fetch('/create-goal', {
                    method: 'POST', // Change to 'POST' if sending data
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

            }
            break;

        case "screenTime":
            maxGoal = 24 * timeframe;
            if (goalValue <= maxGoal) {
                userGoals.screenTime.goal = goalValue;
                userGoals.screenTime.timeframe = timeframe;
                goalText = `${goalValue} hours in ${timeframe} days`;
                document.getElementById("screenText").innerText = `Current goal: ${goalText}`;
                updateProgressBar(P2, goalValue, timeframe, userGoals.screenTime.currentProgress);
                isValid = true;


                //Backend stuff
                data = {"category": "screenTime", "timeframe" : timeframe, "goal":goalValue, "points": timeframe }
                const response = fetch('/create-goal', {
                    method: 'POST', // Change to 'POST' if sending data
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });


            }
            break;

        case "water":
            maxGoal = 20 * timeframe;
            if (goalValue <= maxGoal) {
                userGoals.water.goal = goalValue;
                userGoals.water.timeframe = timeframe;
                goalText = `${goalValue} litres in ${timeframe} days`;
                document.getElementById("waterText").innerText = `Current goal: ${goalText}`;
                updateProgressBar(P3, goalValue, timeframe, userGoals.water.currentProgress);
                isValid = true;

                //Backend stuff
                data = {"category": "water", "timeframe" : timeframe, "goal":goalValue, "points": timeframe }
                const response = fetch('/create-goal', {
                    method: 'POST', // Change to 'POST' if sending data
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

            }
            break;

        case "steps":
            maxGoal = 300000 * timeframe;
            if (goalValue <= maxGoal) {
                userGoals.steps.goal = goalValue;
                userGoals.steps.timeframe = timeframe;
                goalText = `${goalValue} steps in ${timeframe} days`;
                document.getElementById("stepText").innerText = `Current goal: ${goalText}`;
                updateProgressBar(P4, goalValue, timeframe, userGoals.steps.currentProgress);
                isValid = true;

                //Backend stuff
                data = {"category": "steps", "timeframe" : timeframe, "goal":goalValue, "points": timeframe }
                const response = fetch('/create-goal', {
                    method: 'POST', // Change to 'POST' if sending data
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

            }
            break;

        case "work":
            maxGoal = 24 * timeframe;
            if (goalValue <= maxGoal) {
                userGoals.work.goal = goalValue;
                userGoals.work.timeframe = timeframe;
                goalText = `${goalValue} hours in ${timeframe} days`;
                document.getElementById("workText").innerText = `Current goal: ${goalText}`;
                updateProgressBar(P5, goalValue, timeframe, userGoals.work.currentProgress);
                isValid = true;

                //Backend stuff
                data = {"category": "work", "timeframe" : timeframe, "goal":goalValue, "points": timeframe }
                const response = fetch('/create-goal', {
                    method: 'POST', // Change to 'POST' if sending data
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

            }
            break;

        case "mood":
            maxGoal = 5;
            if (goalValue <= maxGoal) {
                userGoals.mood.goal = goalValue;
                userGoals.mood.timeframe = timeframe;
                goalText = `Mood rating of ${goalValue} in ${timeframe} days`;
                document.getElementById("moodText").innerText = `Current goal: ${goalText}`;
                updateProgressBar(P6, goalValue, timeframe, userGoals.mood.currentProgress);
                isValid = true;

                //Backend stuff
                data = {"category": "mood", "timeframe" : timeframe, "goal":goalValue, "points": 10 }
                const response = fetch('/create-goal', {
                    method: 'POST', // Change to 'POST' if sending data
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
            }
            break;

        default:
            alert("Unknown goal category.");
            return;
    }

    if (isValid) {
        closeModal();
    } else {
        alert(`Goal exceeds the allowed maximum for ${currentGoalCategory}. Try a smaller number.`);
    }
}

    document.addEventListener("DOMContentLoaded", fetchData);
    document.addEventListener("DOMContentLoaded", fetchGoals);
