let currentForm = "login";

// SWITCH LOGIN AND SIGN UP
function showForm(type) {
    currentForm = type;

    const isSignup = type === "signup";

    document.getElementById("loginTab")
        .classList.toggle("active", !isSignup);

    document.getElementById("signupTab")
        .classList.toggle("active", isSignup);

    document.getElementById("nameGroup")
        .classList.toggle("hidden", !isSignup);

    document.getElementById("confirmGroup")
        .classList.toggle("hidden", !isSignup);

    document.getElementById("fullName").required = isSignup;

    document.getElementById("confirmPassword").required = isSignup;

    document.getElementById("formTitle").textContent =
        isSignup ? "Create Account" : "Welcome Back!";

    document.getElementById("formDescription").textContent =
        isSignup
        ? "Register for Mini Campus Event Hub"
        : "Login to your account";

    document.getElementById("submitBtn").textContent =
        isSignup ? "Create Account" : "Login";

    document.getElementById("switchText").innerHTML =
        isSignup
        ? 'Already have an account? <a href="#" onclick="showForm(\'login\'); return false;">Login</a>'
        : 'Don\'t have an account? <a href="#" onclick="showForm(\'signup\'); return false;">Sign Up</a>';

    document.getElementById("message").textContent = "";

    document.getElementById("authForm").reset();
}


// DISPLAY MESSAGE
function showMessage(text, success = false) {

    const message = document.getElementById("message");

    message.textContent = text;

    message.style.color = success ? "#176b3a" : "#c62828";

    message.style.background =
        success ? "#e8f5e9" : "#ffebee";

    message.style.padding = "12px";

    message.style.borderRadius = "8px";

    message.style.fontWeight = "bold";
}


// LOGIN AND SIGN UP FORM
document.getElementById("authForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("email")
        .value.trim().toLowerCase();

    const role = document.getElementById("accountType").value;

    const password = document.getElementById("password").value;

    const adminDomain = "@adminptc.edu.ph";

    const studentDomain = "@ptc.edu.ph";


    // CHECK ACCOUNT TYPE
    if (!role) {
        showMessage("Please select an account type.");
        return;
    }


    // CHECK ADMIN EMAIL
    if (role === "admin" && !email.endsWith(adminDomain)) {

        showMessage("Admin must use an @adminptc.edu.ph email.");

        return;
    }


    // CHECK STUDENT EMAIL
    if (
        role === "student" &&
        (!email.endsWith(studentDomain) ||
        email.endsWith(adminDomain))
    ) {

        showMessage("Student must use an @ptc.edu.ph email.");

        return;
    }


    // CHECK PASSWORD LENGTH
    if (password.length < 8) {

        showMessage("Password must be at least 8 characters.");

        return;
    }


    // SIGN UP
    if (currentForm === "signup") {

        const name = document.getElementById("fullName")
            .value.trim();

        const confirmPassword =
            document.getElementById("confirmPassword").value;


        if (!name) {

            showMessage("Please enter your full name.");

            return;
        }


        if (password !== confirmPassword) {

            showMessage("Passwords do not match.");

            return;
        }


        showMessage(
            "✓ Form validated! Account database setup is still needed.",
            true
        );

        return;
    }


    // LOGIN
    if (currentForm === "login") {

        showMessage(
            "✓ Login details validated! Connecting authentication is still needed.",
            true
        );

        // DEMO NAVIGATION ONLY
        // Actual login verification will be added with PHP and MySQL.

        setTimeout(function() {

            if (role === "admin") {

                window.location.href = "admin-dashboard.html";

            } else if (role === "student") {

                window.location.href = "student-dashboard.html";

            }

        }, 1000);

    }

});
