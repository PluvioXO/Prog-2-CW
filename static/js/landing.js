document.addEventListener("DOMContentLoaded", function () {
    const loginBox = document.getElementById("login-box");
    const signupBox = document.getElementById("signup-box");
    const showSignupBtn = document.getElementById("show-signup");
    const showLoginBtn = document.getElementById("show-login");

    showSignupBtn.addEventListener("click", function (event) {
        event.preventDefault();
        loginBox.classList.add("hidden");
        signupBox.classList.remove("hidden");
    });

    showLoginBtn.addEventListener("click", function (event) {
        event.preventDefault();
        signupBox.classList.add("hidden");
        loginBox.classList.remove("hidden");
    });

    document.querySelector("#login-form").addEventListener("submit", function (event) {
        event.preventDefault();

        let formData = new FormData(this);

        fetch("/login", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = data.redirect;
            } else {
                alert("Login failed: " + data.error);
            }
        })
        .catch(error => console.error("Error:", error));
    });

    document.querySelector("#signup-form").addEventListener("submit", function (event) {
        event.preventDefault();

        let formData = new FormData(this);

        fetch("/register", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = data.redirect;
            } else {
                alert("Signup failed: " + data.error);
            }
        })
        .catch(error => console.error("Error:", error));
    });
});
