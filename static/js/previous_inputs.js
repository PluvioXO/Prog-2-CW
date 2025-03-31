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


