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
