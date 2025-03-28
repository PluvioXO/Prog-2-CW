//Getting all the prevous entrys from a user from backend
async function fetchData() {
    try {
        const response = await fetch("/get-data", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json(); // Parse JSON response
        console.log("Data received:", data);
        return data;

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

//calling the function on dashboard load
document.addEventListener("DOMContentLoaded", function () {

    fetchData();

});