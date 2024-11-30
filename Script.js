const API_URL = 'http://localhost:3000';

// Handle Create Account Form submission
document.getElementById('createForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const userId = document.getElementById('userId').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const balance = parseFloat(document.getElementById('balance').value);

  try {
    const response = await fetch(`${API_URL}/create-account`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, username, password, balance }),
    });

    const result = await response.json();

    if (!response.ok) throw new Error(result.error);

    alert(result.message);
    document.getElementById('createForm').reset();
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});

// Handle View Account Form submission
document.getElementById('viewForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const userId = document.getElementById('viewuserId').value;

  try {
    const response = await fetch(`${API_URL}/view-account/${userId}`);
    const result = await response.json();

    if (!response.ok) throw new Error(result.error);

    alert(`Account Details:\nUsername: ${result.username}\nBalance: $${result.balance.toFixed(2)}`);
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});
