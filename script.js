// ===============================
// ACCOUNT BALANCE
// ===============================

let accountBalance = Number(localStorage.getItem("accountBalance")) || 250000;
let balanceVisible = true;

const balance = document.getElementById("account-balance");
const balanceBtn = document.getElementById("balance-btn");



// ===============================
// SHOW / HIDE BALANCE
// ===============================

balanceBtn.addEventListener("click", function () {

    balanceVisible = !balanceVisible;

    if (balanceVisible) {

        balance.textContent = `₦${accountBalance.toLocaleString("en-NG", {
            minimumFractionDigits: 2
        })}`;

        balanceBtn.textContent = "Hide Balance";

    } else {

        balance.textContent = "••••••••";
        balanceBtn.textContent = "Show Balance";

    }

});


// ===============================
// BUTTONS
// ===============================

const transferBtn = document.getElementById("transfer-btn");
const depositBtn = document.getElementById("deposit-btn");
const transactionsBtn = document.getElementById("transactions-btn");

const transactionsList = document.querySelector(".transactions-list");


// ===============================
// UPDATE BALANCE ON SCREEN
// ===============================

function updateBalance() {

    if (balanceVisible) {

        balance.textContent = `₦${accountBalance.toLocaleString("en-NG", {
            minimumFractionDigits: 2
        })}`;

    } else {

        balance.textContent = "••••••••";

    }

    localStorage.setItem("accountBalance", accountBalance);
    
}

updateBalance();

// ===============================
// ADD TRANSACTION
// ===============================

function addTransaction(name, amount, type) {

    const transaction = document.createElement("div");

    transaction.classList.add("transaction");

    const today = new Date();

    const date = today.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    });

    const sign = type === "income" ? "+" : "-";

    transaction.innerHTML = `
        <div class="transaction-info">
            <h3>${name}</h3>
            <p>${date}</p>
        </div>

        <span class="transaction-amount ${type}">
            ${sign}₦${amount.toLocaleString("en-NG", {
                minimumFractionDigits: 2
            })}
        </span>
    `;

    transactionsList.prepend(transaction);
}


// ===============================
// TRANSFER MONEY
// ===============================

const transferModal = document.getElementById("transfer-modal");
const transferAmount = document.getElementById("transfer-amount");

const closeTransferModal = document.getElementById("close-transfer-modal");
const cancelTransfer = document.getElementById("cancel-transfer");
const confirmTransfer = document.getElementById("confirm-transfer");


transferBtn.addEventListener("click", function () {

    transferModal.style.display = "flex";

    transferAmount.value = "";

    transferAmount.focus();

});


closeTransferModal.addEventListener("click", function () {

    transferModal.style.display = "none";

});


cancelTransfer.addEventListener("click", function () {

    transferModal.style.display = "none";

});


confirmTransfer.addEventListener("click", function () {

    const amount = Number(transferAmount.value);

    if (isNaN(amount) || amount <= 0) {

        alert("Please enter a valid amount.");
        return;

    }

    if (amount > accountBalance) {

        alert("Insufficient balance.");
        return;

    }

    accountBalance -= amount;

    updateBalance();

    addTransaction("Money Transfer", amount, "expense");

    transferModal.style.display = "none";

    alert(`₦${amount.toLocaleString("en-NG")} transferred successfully!`);

});




// ===============================
// TRANSACTIONS BUTTON
// ===============================

transactionsBtn.addEventListener("click", function () {

    document.querySelector(".transactions-section").scrollIntoView({
        behavior: "smooth"
    });

});

// ===============================
// PAY BILLS
// ===============================

const payBillsBtn = document.getElementById("pay-bills-btn");

payBillsBtn.addEventListener("click", function () {

    const amount = Number(prompt("Enter your bill amount:"));

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    if (amount > accountBalance) {
        alert("Insufficient balance.");
        return;
    }

    accountBalance -= amount;

    updateBalance();

    addTransaction("Bill Payment", amount, "expense");

    alert(`₦${amount.toLocaleString("en-NG")} bill paid successfully!`);

});

// ===============================
// VIEW ALL TRANSACTIONS
// ===============================

const viewTransactionsBtn = document.getElementById("view-transactions-btn");

viewTransactionsBtn.addEventListener("click", function () {

    transactionsList.classList.toggle("show-all");

    if (transactionsList.classList.contains("show-all")) {

        viewTransactionsBtn.textContent = "Hide Transactions";

    } else {

        viewTransactionsBtn.textContent = "View All Transactions";

    }

});

/// ===============================
// OPEN ACCOUNT
// ===============================

const openAccountBtn = document.getElementById("open-account-btn");

const accountModal = document.getElementById("account-modal");
const closeAccountModal = document.getElementById("close-account-modal");
const cancelAccount = document.getElementById("cancel-account");

const confirmAccount = document.getElementById("confirm-account");

const accountName = document.getElementById("new-account-name");
const accountEmail = document.getElementById("new-account-email");
const accountType = document.getElementById("new-account-type");

const accountHolder = document.getElementById("account-holder");
const accountTypeDisplay = document.getElementById("account-type");


// OPEN THE FORM

openAccountBtn.addEventListener("click", function () {

    accountModal.style.display = "flex";

});


// CLOSE WITH X

closeAccountModal.addEventListener("click", function () {

    accountModal.style.display = "none";

});


// CLOSE WITH CANCEL

cancelAccount.addEventListener("click", function () {

    accountModal.style.display = "none";

});


// CREATE ACCOUNT

confirmAccount.addEventListener("click", function () {

    const name = accountName.value.trim();
    const email = accountEmail.value.trim();
    const type = accountType.value;

    if (name === "" || email === "" || type === "") {

        alert("Please complete all the fields.");

        return;
    }

    accountHolder.textContent = name;

    accountTypeDisplay.textContent = type;

    accountModal.style.display = "none";

    accountName.value = "";
    accountEmail.value = "";
    accountType.value = "";

    alert(`Account opened successfully for ${name}!`);

});

// ===============================
// LOGIN
// ===============================

const loginBtn = document.getElementById("login-btn");

const loginModal = document.getElementById("login-modal");
const closeLoginModal = document.getElementById("close-login-modal");
const cancelLogin = document.getElementById("cancel-login");

loginBtn.addEventListener("click", function () {

    loginModal.style.display = "flex";

});

closeLoginModal.addEventListener("click", function () {

    loginModal.style.display = "none";

});

cancelLogin.addEventListener("click", function () {

    loginModal.style.display = "none";

});
// ===============================
// LOGIN VALIDATION
// ===============================

const confirmLogin = document.getElementById("confirm-login");

const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");

confirmLogin.addEventListener("click", function () {

    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    if (email === "" || password === "") {
        alert("Please enter your email and password.");
        return;
    }

    alert("Login successful!");
    loginBtn.textContent = "Logged In";
    loginModal.style.display = "none";

    loginEmail.value = "";
    loginPassword.value = "";

});
// ===============================
// GET STARTED
// ===============================

const getStartedBtn = document.getElementById("get-started-btn");

const accountSection = document.querySelector(".account-section");

getStartedBtn.addEventListener("click", function () {

    accountSection.scrollIntoView({
        behavior: "smooth"
    });

});

// ===============================
// LEARN MORE
// ===============================

const learnMoreBtn = document.getElementById("learn-more-btn");

const servicesSection = document.querySelector(".services-section");

learnMoreBtn.addEventListener("click", function () {

    servicesSection.scrollIntoView({
        behavior: "smooth"
    });

});

// ===============================
// SERVICE BUTTONS
// ===============================

const serviceButtons = document.querySelectorAll(".service-btn");

serviceButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const serviceName = button.parentElement.querySelector("h3").textContent;

        alert(`You selected ${serviceName}.`);

    });

});
