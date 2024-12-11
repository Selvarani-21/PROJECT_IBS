// Helper function to display alerts
function showAlert(message, isSuccess = true) {
    alert(message);
    if (!isSuccess) {
        console.error(message); // Log errors to the console
    }
}

// Fetch User by ID and Populate Form Fields
// async function fetchUserByIdForUpdate(id) {
//     try {
//         const response = await fetch(`http://localhost:5000/users/${id}`);
//         if (response.ok) {
//             const user = await response.json();
//             document.getElementById('update-name').value = user.name;
//             document.getElementById('update-email').value = user.email;
//         } else {
//             const error = await response.json();
//             showAlert(`Error: ${error.message}`, false);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         showAlert('An unexpected error occurred', false);
//     }
// }
async function fetchUserByIdForUpdate(id) {
    try {
        const response = await fetch(`http://localhost:5000/users/${id}`);
        if (response.ok) {
            const user = await response.json();
            document.getElementById('update-name').value = user.name;
            document.getElementById('update-email').value = user.email;

            // Enable the fields for editing
            document.getElementById('update-name').disabled = false;
            document.getElementById('update-email').disabled = false;
            document.getElementById('update-password').disabled = false;
        } else {
            const error = await response.json();
            showAlert(`Error: ${error.message}`, false);
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('An unexpected error occurred', false);
    }
}

// Create User Functionality
async function createUser(name, email, password) {
    try {
        const response = await fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            showAlert('User created successfully');
        } else {
            const error = await response.json();
            showAlert(`Error: ${error.message}`, false);
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('An unexpected error occurred', false);
    }
}

// Get User by ID Functionality
async function getUserById(id) {
    try {
        const response = await fetch(`http://localhost:5000/users/${id}`);
        if (response.ok) {
            const user = await response.json();

            // Display user details on the HTML page
            const userDetails = document.getElementById('user-details');
            document.getElementById('user-name').textContent = user.name;
            document.getElementById('user-email').textContent = user.email;
            document.getElementById('user-created-at').textContent = user.createdAt || 'N/A';
            userDetails.style.display = 'block';
        } else {
            const error = await response.json();
            showAlert(`Error: ${error.message}`, false);
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('An unexpected error occurred', false);
    }
}

// Update User Functionality
async function updateUser(id, name, email, password) {
    try {
        const response = await fetch(`http://localhost:5000/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        if (response.ok) {
            const user = await response.json();
            showAlert(`User updated successfully: ${user.name}`);
        } else {
            const error = await response.json();
            showAlert(`Error: ${error.message}`, false);
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('An unexpected error occurred', false);
    }
}

// Delete User Functionality
async function deleteUser(id) {
    try {
        const response = await fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            showAlert('User deleted successfully');
        } else {
            const error = await response.json();
            showAlert(`Error: ${error.message}`, false);
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('An unexpected error occurred', false);
    }
}

// Attach Event Listeners for CRUD Operations
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    
    // Create User Event Listener
    const createUserForm = document.getElementById('create-user-form');
    if (createUserForm) {
        createUserForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            await createUser(name, email, password);
        });
    } else {
        console.error('create-user-form not found');
    }

    // Get User by ID Event Listener
    const getUserForm = document.getElementById('get-user-form');
    if (getUserForm) {
        getUserForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const id = document.getElementById('get-user-id').value;
            await getUserById(id);
        });
    } else {
        console.error('get-user-form not found');
    }

    // Fetch User by ID for Update
    const updateUserForm = document.getElementById('update-user-form');
    if (updateUserForm) {
        const userIdField = document.getElementById('update-id');
        userIdField.addEventListener('blur', async () => {
            const id = userIdField.value;
            if (id) {
                await fetchUserByIdForUpdate(id);
            }
        });

        updateUserForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const id = document.getElementById('update-id').value;
            const name = document.getElementById('update-name').value;
            const email = document.getElementById('update-email').value;
            const password = document.getElementById('update-password').value;
            await updateUser(id, name, email, password);
        });
    } else {
        console.error('update-user-form not found');
    }

    // Delete User Event Listener
    const deleteUserForm = document.getElementById('delete-user-form');
    if (deleteUserForm) {
        deleteUserForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const id = document.getElementById('delete-user-id').value;
            await deleteUser(id);
        });
    } else {
        console.error('delete-user-form not found');
    }
});
