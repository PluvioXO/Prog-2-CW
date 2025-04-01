document.addEventListener("DOMContentLoaded", function () {
    checkIfEntryExists();
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
