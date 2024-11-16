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
  