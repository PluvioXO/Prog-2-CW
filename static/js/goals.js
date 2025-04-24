const userGoals = {
        sleep: {},
        screenTime: {},
        water: {},
        steps: {},
        work: {},
        mood: {}}

async function fetchGoals(){
    try {
        const response = await fetch("/get-data", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();
        console.log("Data received:", data);

        try {
        const response = await fetch("/get-goals", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const goalData = await response.json();

        console.log("Goal data:", goalData);
        goalData.forEach((goal) => {
            userGoals[goal.category] = {
                goalID: goal.goalID,
                goal: goal.goal,
                created_at: goal.created_at,
                timeframe: goal.timeframe,
                category: goal.category,
                points: goal.points
            };
        });

        console.log("goals", userGoals);

    }  catch (error) {
    console.error("Error fetching data:", error);}

    loadUserData(data, userGoals);

    }  catch (error) {
    console.error("Error fetching data:", error);}

}

function calculateDaysElapsed(date) {
    const currentDate = new Date();
    const goalStartDate = new Date(date);
    const diffTime = currentDate - goalStartDate;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

function calculateProgress(entries, category, goalStartDate, timeframe) {
    const currentDate = new Date();
    const startDate = new Date(goalStartDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + timeframe);

    if (currentDate > endDate) {
        return 0; // Goal timeframe has ended
    }

    let total = 0;
    entries.forEach(entry => {
        const entryDate = new Date(entry.created_at);
        if (entryDate >= startDate && entryDate <= currentDate) {
            total += entry[category];
        }
    });
    return total;
}

function calculateMoodProgress(entries, goalStartDate, timeframe) {
    const currentDate = new Date();
    const startDate = new Date(goalStartDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + timeframe);

    if (currentDate > endDate) {
        return 0; // Goal timeframe has ended
    }

    let total = 0;
    let count = 0;
    entries.forEach(entry => {
        const entryDate = new Date(entry.created_at);
        if (entryDate >= startDate && entryDate <= currentDate) {
            total += entry.mood;
            count++;
        }
    });
    return count > 0 ? total / count : 0;
}


function updateProgressBar(barIdStr, goal, currentProgress) {
    let progress = (currentProgress / goal) * 100;
    if (progress > 100) progress = 100;

    const barId = document.getElementById(barIdStr);
    barId.style.width = `${progress}%`;

}

function getCategoryIndex(category) {
    const categories = ['sleep', 'screenTime', 'water', 'steps', 'work', 'mood'];
    return categories.indexOf(category) + 1;
}

function updateTimeRemaining() {
    Object.entries(userGoals).forEach(([categoryName, goalData]) => {
        const daysElapsed = calculateDaysElapsed(goalData.created_at);
        const timeRemaining = Math.max(0, goalData.timeframe - daysElapsed);

        console.log(`${categoryName} - Time remaining: ${timeRemaining}`);

        const element = document.getElementById(`${categoryName}RemainingTime`);
        if (element) {
            element.innerHTML = `Time remaining: ${timeRemaining} days`;
        }
    });
}


function loadUserData(entries, userGoals) {
  const categoryUnits = {
    sleep: 'hours',
    screenTime: 'hours',
    water: 'liters',
    steps: 'steps',
    work: 'hours',
    mood: 'rating',
  };

  Object.entries(userGoals).forEach(([category, goalData]) => {
      const unit = categoryUnits[category] || '';
      const goalTextElement = document.getElementById(`${category}Text`);
      if (goalTextElement) {
          goalTextElement.textContent = `Current goal: ${goalData.goal} ${unit} in ${goalData.timeframe} days`;
      }

      let progressValue = 0;
      if (category === 'mood') {
          progressValue = calculateMoodProgress(entries, goalData.created_at, goalData.timeframe);
      } else {
          progressValue = calculateProgress(entries, category, goalData.created_at, goalData.timeframe);
      }

      updateProgressBar(`P${getCategoryIndex(category)}`, goalData.goal, progressValue);
  });

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
    let maxGoal = 0;

    switch (currentGoalCategory) {
        case "sleep":
            maxGoal = 24 * timeframe;
            if (goalValue <= maxGoal) {
                userGoals.sleep.goal = goalValue;
                userGoals.sleep.timeframe = timeframe;
                goalText = `${goalValue} hours in ${timeframe} days`;
                document.getElementById("sleepText").innerText = `Current goal: ${goalText}`;
                updateProgressBar('P1', goalValue, timeframe, userGoals.sleep.currentProgress);
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
                updateProgressBar("P2", goalValue, timeframe, userGoals.screenTime.currentProgress);
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
                updateProgressBar('P3', goalValue, timeframe, userGoals.water.currentProgress);
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
                updateProgressBar('P4', goalValue, timeframe, userGoals.steps.currentProgress);
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
                updateProgressBar('P5', goalValue, timeframe, userGoals.work.currentProgress);
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
                updateProgressBar('P6', goalValue, timeframe, userGoals.mood.currentProgress);
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

document.addEventListener("DOMContentLoaded", fetchGoals);
