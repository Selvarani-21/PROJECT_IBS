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
  document.getElementById('createForm').reset(); // Reset form fields
}

// Function to view account details
function viewAccount(event) {
  event.preventDefault(); // Prevent form submission reload

  const userId = document.getElementById('viewuserId').value;

  if (!accounts[userId]) {
    alert('Account not found!');
    return;
  }

  const account = accounts[userId];

  alert(`Account Details:\nUsername: ${account.username}\nBalance: $${account.balance.toFixed(2)}`);
});
