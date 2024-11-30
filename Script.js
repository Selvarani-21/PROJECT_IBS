// Store accounts in memory
const accounts = {};

// Create Account Form submission have to handle
document.getElementById('createForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const userId = document.getElementById('userId').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const balance = parseFloat(document.getElementById('balance').value);

  if (accounts[userId]) {
    alert('Account with this User ID already exists!');
    return;
  }

  accounts[userId] = {
    username,
    password,
    balance
  };

  alert('Account created successfully!');

  // Reset the form
  document.getElementById('createForm').reset();
});

// Handle View Account Form submission
document.getElementById('viewForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const userId = document.getElementById('viewuserId').value;

  if (!accounts[userId]) {
    alert('Account not found!');
    return;
  }

  const account = accounts[userId];

  alert(`Account Details:\nUsername: ${account.username}\nBalance: $${account.balance.toFixed(2)}`);
});
