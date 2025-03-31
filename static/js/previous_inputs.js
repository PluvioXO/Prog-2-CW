//Getting all the prevous entrys from a user from backend
async function fetchData() {
    try {
        const response = await fetch("/get-data", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json(); 
        console.log("Data received:", data);  //Just printing the data into the console for now
        return data;

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}



// Function to display JSON data in HTML
function displayData(jsonArray) {

    const container = document.getElementById('raw-data'); // Select the target div
    container.innerHTML = JSON.stringify(jsonArray, null, 2); // Clear previous content

}



//calling the function on dashboard load
document.addEventListener("DOMContentLoaded", function () {

    fetchData().then(data => {
        displayData(data);
    });

});

function editEntry(created_at, sleep, mood, screenTime, water, steps, work) {
    console.log("Editing entry:", created_at);

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

function cancelEdit() {
    document.getElementById("edit-form-container").classList.add("hidden");
    document.querySelector(".entries-container").classList.remove("hidden");
}

function confirmDelete(entryID) {
    if (confirm("Are you sure you want to delete this entry?")) {
        //code to delete/redirect
    }
}


