document.addEventListener("DOMContentLoaded", function () {
    const loginBox = document.getElementById("login-box");
    const signupBox = document.getElementById("signup-box");
    const showSignup = document.getElementById("show-signup");
    const showLogin = document.getElementById("show-login");

    showSignup.addEventListener("click", function (e) {
        e.preventDefault();
        loginBox.classList.add("hidden");
        signupBox.classList.remove("hidden");
    });

    showLogin.addEventListener("click", function (e) {
        e.preventDefault();
        signupBox.classList.add("hidden");
        loginBox.classList.remove("hidden");
    });
});
