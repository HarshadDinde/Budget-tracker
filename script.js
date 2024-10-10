// Get elements
const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expensesEl = document.getElementById('expenses');
const transactionList = document.getElementById('transaction-list');
const form = document.getElementById('transaction-form');
const clearDataButton = document.getElementById('clear-data');

// Load transactions from localStorage or create an empty array
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Add transaction
form.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent the default form submission behavior

  const type = document.getElementById('type').value;
  const description = document.getElementById('description').value;
  const amount = document.getElementById('amount').value;

  // Validate if amount is a valid number
  if (isNaN(amount) || amount.trim() === '') {
    alert('Please enter a valid number for the amount');
    return;
  }

  const transaction = { description, amount: +amount, type }; // Create the transaction object
  transactions.push(transaction); // Add the transaction to the array
  updateUI(); // Update the UI with new data
  localStorage.setItem('transactions', JSON.stringify(transactions)); // Save to localStorage
  form.reset(); // Clear the form inputs
});

// Update the user interface
function updateUI() {
  // Reset the lists and totals
  transactionList.innerHTML = '';
  let income = 0, expenses = 0;

  // Iterate over transactions
  transactions.forEach(transaction => {
    const listItem = document.createElement('li');
    listItem.textContent = `${transaction.description}: ₹${transaction.amount} (${transaction.type})`;
    transactionList.appendChild(listItem);

    // Calculate totals
    if (transaction.type === 'income') income += transaction.amount;
    else expenses += transaction.amount;
  });

  // Update the DOM with calculated values
  incomeEl.textContent = income;
  expensesEl.textContent = expenses;
  balanceEl.textContent = income - expenses;
}

// Clear all transactions
clearDataButton.addEventListener('click', function() {
  transactions = []; // Reset the transactions array
  localStorage.removeItem('transactions'); // Clear local storage
  updateUI(); // Update the UI to reflect changes
});

// Load transactions on page load
window.addEventListener('load', updateUI);
