const token = localStorage.getItem("authToken");

const usersTableBody = document.getElementById("usersTableBody");
const totalUsers = document.getElementById("totalUsers");
const apiStatus = document.getElementById("apiStatus");
const message = document.getElementById("message");

const refreshBtn = document.getElementById("refreshBtn");
const logoutBtn = document.getElementById("logoutBtn");


/* Check Login */

if (!token) {
    window.location.href = "index.html";
}


/* Fetch Users */

async function loadUsers() {

    usersTableBody.innerHTML = `
        <tr>
            <td colspan="6">Loading users...</td>
        </tr>
    `;

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/api/users/",
            {
                method: "GET",
                headers: {
                    "Authorization": `Token ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error("Unable to fetch users.");
        }

        apiStatus.textContent = "Connected";
        message.textContent = "";

        /*
         * Django API response can be either:
         * an array of users
         * or a paginated object containing results
         */

        const users = Array.isArray(data) ? data : data.results || [];

        totalUsers.textContent = users.length;

        usersTableBody.innerHTML = "";

        if (users.length === 0) {

            usersTableBody.innerHTML = `
                <tr>
                    <td colspan="6">No users found.</td>
                </tr>
            `;

            return;
        }

        users.forEach(user => {

            const row = document.createElement("tr");

            row.innerHTML = `
    <td>${user.id ?? "-"}</td>

    <td>${user.name ?? "-"}</td>

    <td>${user.email ?? "-"}</td>

    <td>${user.role ?? "-"}</td>

    <td>
        ${user.created_at
            ? new Date(user.created_at).toLocaleString()
            : "-"
        }
    </td>

    <td class="action-buttons">

        <button
            class="edit-btn"
            onclick="editUser(${user.id}, '${user.name}', '${user.email}', '${user.role}')"
        >
            Edit
        </button>

        <button
            class="delete-btn"
            onclick="deleteUser(${user.id})"
        >
            Delete
        </button>

    </td>
`;
            usersTableBody.appendChild(row);
        });

    } catch (error) {

        console.error(error);

        apiStatus.textContent = "Disconnected";
        totalUsers.textContent = "0";

        usersTableBody.innerHTML = `
            <tr>
                <td colspan="6">
                    Unable to load users.
                </td>
            </tr>
        `;

        message.textContent =
            "Could not connect to the Django API.";
    }
}


/* Refresh Users */

refreshBtn.addEventListener("click", loadUsers);


/* Logout */

logoutBtn.addEventListener("click", function () {

    localStorage.removeItem("authToken");

    window.location.href = "index.html";
});


/* Load Users When Dashboard Opens */

loadUsers();
// ===============================
// ADD USER FUNCTIONALITY
// ===============================

const addUserForm = document.getElementById("addUserForm");
const addUserMessage = document.getElementById("addUserMessage");

if (addUserForm) {

    addUserForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("newName").value.trim();
        const email = document.getElementById("newEmail").value.trim();
        const role = document.getElementById("newRole").value;

        // Get the same token used by the dashboard
        const token = localStorage.getItem("authToken");

        if (!token) {
            addUserMessage.textContent =
                "Authentication token not found.";
            addUserMessage.style.color = "red";
            return;
        }

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/api/users/",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Token ${token}`
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        role: role
                    })
                }
            );

            const data = await response.json();

            console.log("POST Response:", data);

            if (response.ok) {

                addUserMessage.textContent =
                    "User added successfully!";

                addUserMessage.style.color = "green";

                addUserForm.reset();

                // Refresh users table automatically
                loadUsers();

            } else {

                addUserMessage.textContent =
                    data.detail ||
                    data.message ||
                    "Failed to add user.";

                addUserMessage.style.color = "red";

                console.error("POST Error:", data);
            }

        } catch (error) {

            console.error("Error:", error);

            addUserMessage.textContent =
                "Could not connect to the Django API.";

            addUserMessage.style.color = "red";
        }

    });
}
// ===============================
// EDIT USER FUNCTIONALITY
// ===============================

function editUser(id, name, email, role) {

    const editSection =
        document.getElementById("editUserSection");

    document.getElementById("editUserId").value = id;
    document.getElementById("editName").value = name;
    document.getElementById("editEmail").value = email;
    document.getElementById("editRole").value = role;

    editSection.style.display = "block";

    editSection.scrollIntoView({
        behavior: "smooth"
    });
}


// ===============================
// UPDATE USER
// ===============================

const editUserForm =
    document.getElementById("editUserForm");

if (editUserForm) {

    editUserForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const id =
                document.getElementById("editUserId").value;

            const name =
                document.getElementById("editName").value.trim();

            const email =
                document.getElementById("editEmail").value.trim();

            const role =
                document.getElementById("editRole").value;

            const token =
                localStorage.getItem("authToken");

            if (!token) {

                document.getElementById(
                    "editUserMessage"
                ).textContent =
                    "Authentication token not found.";

                return;
            }

            try {

                const response = await fetch(
                    `http://127.0.0.1:8000/api/users/${id}/`,
                    {
                        method: "PUT",

                        headers: {
                            "Content-Type": "application/json",
                            "Authorization":
                                `Token ${token}`
                        },

                        body: JSON.stringify({
                            name: name,
                            email: email,
                            role: role
                        })
                    }
                );

                const data =
                    await response.json();

                console.log(
                    "UPDATE Response:",
                    data
                );

                if (response.ok) {

                    const message =
                        document.getElementById(
                            "editUserMessage"
                        );

                    message.textContent =
                        "User updated successfully!";

                    message.style.color = "green";

                    editUserForm.reset();

                    document.getElementById(
                        "editUserSection"
                    ).style.display = "none";

                    loadUsers();

                } else {

                    const message =
                        document.getElementById(
                            "editUserMessage"
                        );

                    message.textContent =
                        data.detail ||
                        data.message ||
                        "Failed to update user.";

                    message.style.color = "red";
                }

            } catch (error) {

                console.error(error);

                document.getElementById(
                    "editUserMessage"
                ).textContent =
                    "Could not connect to the Django API.";
            }
        }
    );
}


// ===============================
// CANCEL EDIT
// ===============================

const cancelEditBtn =
    document.getElementById("cancelEditBtn");

if (cancelEditBtn) {

    cancelEditBtn.addEventListener(
        "click",
        function () {

            document.getElementById(
                "editUserSection"
            ).style.display = "none";

            document.getElementById(
                "editUserForm"
            ).reset();

        }
    );
}
// ===============================
// DELETE USER FUNCTIONALITY
// ===============================

async function deleteUser(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
        return;
    }

    const token =
        localStorage.getItem("authToken");

    if (!token) {

        alert(
            "Authentication token not found."
        );

        return;
    }

    try {

        const response = await fetch(
            `http://127.0.0.1:8000/api/users/${id}/`,
            {
                method: "DELETE",

                headers: {
                    "Authorization":
                        `Token ${token}`
                }
            }
        );

        if (response.ok || response.status === 204) {

            alert(
                "User deleted successfully!"
            );

            loadUsers();

        } else {

            const data =
                await response.json();

            console.error(
                "DELETE Error:",
                data
            );

            alert(
                data.detail ||
                "Failed to delete user."
            );
        }

    } catch (error) {

        console.error(error);

        alert(
            "Could not connect to the Django API."
        );
    }
}