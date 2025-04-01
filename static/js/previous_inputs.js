// Fetch data from the backend and display it
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
        displayData(data); // Call function to display it

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Function to display JSON data in HTML
function displayData(entries) {
    const container = document.querySelector(".entries-container");
    container.innerHTML = ""; // Clear previous entries

    if (entries.length === 0) {
        container.innerHTML = "<p>No previous submissions found.</p>";
        return;
    }

    entries.forEach(entry => {
        const entryDate = entry.created_at.substring(0, 10);
        const entryTime = entry.created_at.substring(11, 16);

        const entryDiv = document.createElement("div");
        entryDiv.classList.add("entry");

        entryDiv.innerHTML = `
            <p><strong>Date:</strong> ${entryDate}</p>
            <p><strong>Time:</strong> ${entryTime}</p>
            <p><strong>Sleep:</strong> ${entry.sleep} hrs</p>
            <p><strong>Mood:</strong> ${entry.mood}/5</p>
            <p><strong>Screen Time:</strong> ${entry.screenTime} hrs</p>
            <p><strong>Water Intake:</strong> ${entry.water} L</p>
            <p><strong>Steps:</strong> ${entry.steps}</p>
            <p><strong>Work Hours:</strong> ${entry.work} hrs</p>

            <div class="buttons">
                ${entryDate === new Date().toISOString().split('T')[0] ? 
                    `<button class="edit-btn" onclick="editEntry('${entry.entryID}', '${entry.sleep}', '${entry.mood}', '${entry.screenTime}', '${entry.water}', '${entry.steps}', '${entry.work}')">Edit</button>` 
                    : ""
                }
                <button class="delete-btn" onclick="confirmDelete(${entry.entryID})">Delete</button>
            </div>
        `;

        container.appendChild(entryDiv);
    });
}

// Edit Entry Function
function editEntry(entryID, sleep, mood, screenTime, water, steps, work) {
    document.getElementById("edit-form-container").classList.remove("hidden");
    document.querySelector(".entries-container").classList.add("hidden");

    document.getElementById("edit-entry-id").value = entryID;
    document.getElementById("edit-sleep").value = sleep;
    document.getElementById("edit-mood").value = mood;
    document.getElementById("edit-screen-time").value = screenTime;
    document.getElementById("edit-water").value = water;
    document.getElementById("edit-steps").value = steps;
    document.getElementById("edit-work").value = work;

}

//close edit window
function confirmEdit() {
    document.getElementById("edit-form-container").classList.add("hidden");
    document.querySelector(".entries-container").classList.remove("hidden");

    window.location.reload();
}

// Cancel Edit
function cancelEdit() {
    document.getElementById("edit-form-container").classList.add("hidden");
    document.querySelector(".entries-container").classList.remove("hidden");
}

// Confirm Delete
function confirmDelete(entryID) {
    if (confirm("Are you sure you want to delete this entry?")) {
        //delete the entry
        const response = fetch('/delete-entry', {
            method: 'POST', // Change to 'POST' if sending data
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'entryID':entryID})
        });

        window.location.reload();


    }
}

document.addEventListener("DOMContentLoaded", fetchData);


document.addEventListener("DOMContentLoaded", function () {

    //actually editing data
    document.getElementById("edit-entry-btn").addEventListener("click", async function(event){
        event.preventDefault();
        data = getEditedData();
        const response = await fetch('/edit-entry-data', {
            method: 'POST', // Change to 'POST' if sending data
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        

    });

});


function getEditedData(){
    entryID =document.getElementById("edit-entry-id").value
    sleep = document.getElementById("edit-sleep").value
    mood = document.getElementById("edit-mood").value
    screenTime = document.getElementById("edit-screen-time").value
    water = document.getElementById("edit-water").value
    steps = document.getElementById("edit-steps").value
    work = document.getElementById("edit-work").value

    //actually edit the entry

    const data = {
        'entryID' : parseInt(entryID),
        'sleep'   : parseFloat(sleep),
        'mood' : parseInt(mood),
        'screenTime': parseFloat(screenTime),
        'water': parseFloat(water),
        'steps': parseFloat(steps),
        'work': parseFloat(work)
    };

    return data
}



