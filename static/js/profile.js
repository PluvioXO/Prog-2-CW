function toggler1(btn) {
    let input = document.getElementById("new-password");
    input.type = input.type === "password" ? "text" : "password";
    btn.textContent = input.type === "password" ? "Show" : "Hide";
}

function toggler_2(btn) {
    let input = document.getElementById("new-cfm-password");
    input.type = input.type === "password" ? "text" : "password";
    btn.textContent = input.type === "password" ? "Show" : "Hide";
}

document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("save-btn").addEventListener("click", async function(event){
        event.preventDefault();
        
        //Getting strings from input stuff
        const newPassword = document.getElementById("new-password").value;
        const newCFMPassword = document.getElementById("new-cfm-password").value;

        console.log(newPassword);
        console.log(newCFMPassword);

        // Posting into the backend
        const response = await fetch('/save-changes', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            new_password: newPassword,
            new_cfm_password: newCFMPassword
            })

        });
    });
});
