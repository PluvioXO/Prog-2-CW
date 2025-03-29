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
    const emailElement = document.getElementById("masked-email");

    if (emailElement) {
        const email = emailElement.textContent.trim();
        emailElement.dataset.fullEmail = email;
        emailElement.textContent = maskEmail(email);
    }

    document.getElementById("save-btn").addEventListener("click", async function(event){
        event.preventDefault();

        const newPassword = document.getElementById("new-password").value;
        const newCFMPassword = document.getElementById("new-cfm-password").value;

        console.log(newPassword);
        console.log(newCFMPassword);

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

function maskEmail(email) {
    const [localPart, domain] = email.split("@");
    return "*".repeat(localPart.length) + "@" + domain;
}

function toggleEmail() {
    const emailElement = document.getElementById("masked-email");
    const currentEmail = emailElement.textContent;

    if (currentEmail.includes("*")) {
        emailElement.textContent = emailElement.dataset.fullEmail;
        document.getElementById("show-eml-button").innerHTML = "Hide";
    } else {
        emailElement.textContent = maskEmail(emailElement.dataset.fullEmail);
        document.getElementById("show-eml-button").innerHTML = "Show";
    }
}
