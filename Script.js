// To store account details
const accounts = [];

// Function to create an account
function createAccount(event) {
  event.preventDefault(); // Prevent form submission reload
  
  const userId = document.getElementById('userId').value; // Get the User ID
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const balance = parseFloat(document.getElementById('balance').value);

  // Check if the User ID already exists
  const existingAccount = accounts.find(acc => acc.userId === userId);
  if (existingAccount) {
    alert('User ID already exists. Please choose another User ID.');
    return;
  }

  // Add the new account to the accounts array
  const account = {
    userId: userId, // Store the User ID
    username: username,
    password: password,
    balance: balance,
  };
  accounts.push(account);

  alert('Account created successfully!');
  document.getElementById('createForm').reset(); // Reset form fields
}

// Function to view account details
function viewAccount(event) {
  event.preventDefault(); // Prevent form submission reload

  const userId = document.getElementById('viewUserId').value; // Get User ID for viewing
  const accountDetailsDiv = document.getElementById('accountDetails');

  // Find the account by User ID
  const account = accounts.find(acc => acc.userId === userId);

  if (!account) {
    accountDetailsDiv.innerHTML = '<p>No account found for the provided User ID.</p>';
    return;
  }

  // Display account details (excluding password for security)
  accountDetailsDiv.innerHTML = `
    <h3>Account Details</h3>
    <p><strong>User ID:</strong> ${account.userId}</p>
    <p><strong>Username:</strong> ${account.username}</p>
    <p><strong>Balance:</strong> $${account.balance.toFixed(2)}</p>
  `;
}

// Event listeners
document.getElementById('createForm').addEventListener('submit', createAccount);
document.getElementById('viewForm').addEventListener('submit', viewAccount);
