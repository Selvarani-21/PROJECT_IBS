document.getElementById('createForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const balance = document.getElementById('balance').value;
  
    fetch('/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password,
        balance
      })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
  });
  
  document.getElementById('viewForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const userId = document.getElementById('userId').value;
  
    fetch(`/user/${userId}`)
      .then(response => response.json())
      .then(data => {
        const accountDetails = document.getElementById('accountDetails');
        if (data.username) {
          accountDetails.innerHTML = `
            <h3>User Details</h3>
            <p>Username: ${data.username}</p>
            <p>Balance: $${data.balance}</p>
          `;
        } else {
          accountDetails.innerHTML = `<p>${data.message}</p>`;
        }
      })
      .catch(error => console.error('Error:', error));
  });
  



  // To store account details
const accounts = [];

// Function to create an account
function createAccount(event) {
  event.preventDefault(); // Prevent form submission reload
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const balance = parseFloat(document.getElementById('balance').value);

  // Check if user ID already exists
  const existingAccount = accounts.find(acc => acc.username === username);
  if (existingAccount) {
    alert('User ID already exists. Please choose another User ID.');
    return;
  }

  // Add the new account to the accounts array
  const account = {
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

  const userId = document.getElementById('userId').value;
  const accountDetailsDiv = document.getElementById('accountDetails');

  // Find the account by user ID
  const account = accounts.find(acc => acc.username === userId);

  if (!account) {
    accountDetailsDiv.innerHTML = '<p>No account found for the provided User ID.</p>';
    return;
  }

  // Display account details (excluding password for security)
  accountDetailsDiv.innerHTML = `
    <h3>Account Details</h3>
    <p><strong>User ID:</strong> ${account.username}</p>
    <p><strong>Balance:</strong> $${account.balance.toFixed(2)}</p>
  `;
}

// Event listeners
document.getElementById('createForm').addEventListener('submit', createAccount);
document.getElementById('viewForm').addEventListener('submit', viewAccount);
