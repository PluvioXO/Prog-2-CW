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
