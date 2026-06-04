const transactions = [];
const t1 = {
    id: 1,
    description: "Salary",
    amount: 100,
    type: "income"
};

transactions.push(t1);


const addTransaction = (description, amount, type) => {
    const transaction = {
        id: transactions.length + 1,
        description: description,
        amount: amount,
        type: type
    };
    transactions.push(transaction);
    return transaction;
};

const t2 = addTransaction("Groceries", 50, "expense");

const t3 = addTransaction("Freelance", 200, "income");



const getBalance = () => {
    return transactions.reduce((balance, transaction) => {
        if (transaction.type === "income") {
            return balance + transaction.amount;
        } else if (transaction.type === "expense") {
            return balance - transaction.amount;
        } else {
            return balance;
        }
    }, 0);
};



const formatTransaction = (transaction) => {
    return `[${transaction.id}] ${transaction.description} | $${transaction.amount} (${transaction.type})`;
};

const validateTransaction=(description, amount, type) => {
    if(typeof description !=="string" || description.trim() === "" )
    {
    return "Description must be a non-empty string";
        }
    if (typeof amount !== "number" || amount <= 0) {
        return "Amount must be a positive number";
    }
    if(type !== "income" && type !== "expense") {
        return "Type must be either 'income' or 'expense'";
}
return null;
}

const renderTransactions = () => {
    const container = document.getElementById("transaction-list");
    container.innerHTML = "";
    transactions.forEach(transaction => {
const item = document.createElement("li");
item.textContent = formatTransaction(transaction);
container.appendChild(item);
    });
}

const renderBalance=() => {
    const balanceElement = document.getElementById("balance");
    balanceElement.textContent = `Balance: $${getBalance()}`;
}
renderTransactions();
renderBalance();

const form=document.getElementById("transaction-form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const description = document.getElementById("description").value;
    const amount=document.getElementById("amount").value;
    const type=document.getElementById("type").value;
   const result=validateTransaction(description, Number(amount), type);
    if (result !== null) {
        const errorDiv = document.getElementById("error-message");
        errorDiv.textContent = result;
    }
    else{
        addTransaction(description, Number(amount), type);
        renderTransactions();
        renderBalance();
    const errorDiv = document.getElementById("error-message");
    errorDiv.textContent = ""; 
    form.reset();
    }
    
});


