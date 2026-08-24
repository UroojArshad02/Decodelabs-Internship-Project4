const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("authToken", data.token);

            loginMessage.textContent = "Login successful! 🎉";
            loginMessage.className = "message success";

            // Dashboard page
            window.location.href = "dashboard.html";

        } else {
            loginMessage.textContent =
                data.non_field_errors?.[0] || "Invalid username or password.";
            loginMessage.className = "message error";
        }

    } catch (error) {
        console.error("Error:", error);

        loginMessage.textContent = "Could not connect to the backend.";
        loginMessage.className = "message error";
    }
});