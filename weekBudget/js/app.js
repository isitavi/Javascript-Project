/////////////////////////////////////////////////////////////////////////////////////
//Class
class Budget {
  constructor(budget) {
    this.budget = Number(budget);
    this.leftBudget = this.budget;
  }
  substructFromBudget(amount) {
    return (this.leftBudget -= amount);
  }
}

/////////////////////////////////////////////////////////////////////////////////////

//HTML CLASS
class HTML {
  //Insert amount for buy things form budget
  insertBudget(budgetinput) {
    totalBudget.innerHTML = `${budgetinput}`;
    leftBudget.innerHTML = `${budgetinput}`;
  }

  //Print error message for left expenseName and expenseAmount empty
  printMessage(message, className) {
    const messageWrapper = document.createElement("div");
    messageWrapper.classList.add("text-center", "alert", className);
    messageWrapper.appendChild(document.createTextNode(message));

    //Place the error message
    document
      .querySelector(".primary")
      .insertBefore(messageWrapper, addExpensesForm);

    //Remove error after 3S
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  //Displays the expenses from the form into the list
  expensessList(expName, expAmnt) {
    const expList = document.querySelector("#expenses ul");

    //Create list element
    const li = document.createElement("li");
    li.classList =
      "list-group-item d-flex justify-content-between align-items-center";

    //Create the template
    li.innerHTML = `${expName}
                    <span class='badge badge-primary badge-pill'>$ ${expAmnt}</span>
    `;
    //Insert into the HTML
    expList.appendChild(li);
  }

  //Substract amount from budget
  trackBudget(amount) {
    const remainBudget = budget.substructFromBudget(amount);
    leftBudget.innerHTML = `${remainBudget}`;

    //Check when 25% is left from total budget
    if (budget.budget / 4 > remainBudget) {
      //Add some classes and remove others
      leftBudget.parentElement.parentElement.classList.remove(
        "alert-success",
        "alert-warning"
      );
      leftBudget.parentElement.parentElement.classList.add("alert-danger");
    } else if (budget.budget / 2 > remainBudget) {
      //Add some classes and remove others
      leftBudget.parentElement.parentElement.classList.remove("alert-success");
      leftBudget.parentElement.parentElement.classList.add("alert-warning");
    }
  }
}

/////////////////////////////////////////////////////////////////////////////////////

//Variables
const addExpensesForm = document.querySelector("#add-expense");
let budget, userBudget;
const totalBudget = document.querySelector("span#total");
const leftBudget = document.querySelector("span#left");
const html = new HTML();

/////////////////////////////////////////////////////////////////////////////////////

//Event Listeners
evntListeners();

function evntListeners() {
  //Initialize the application functionality
  document.addEventListener("DOMContentLoaded", () => {
    //Ask the visitor to know his/her weekly budget
    userBudget = prompt("What's your budget for this week?");

    //Validate user budget
    if (userBudget === null || userBudget === "" || userBudget === "0") {
      window.location.reload();
    } else {
      ///////////////Budget Object ///////////////
      //When user input is valid then instanciate the budget class
      budget = new Budget(userBudget);
      ///////////////Budget Object ///////////////

      //instanciate HTML class

      html.insertBudget(budget.budget);
    }
  });

  //When new expenses and expense-cost is added!!
  addExpensesForm.addEventListener("submit", evnt => {
    evnt.preventDefault();
    //Read the input value from expenseName and expenseAmount
    const expenseName = document.querySelector("#expense").value;
    const expenseAmount = document.querySelector("#amount").value;

    if (expenseName === "" || expenseAmount === "") {
      html.printMessage(
        "There was an error, all fields are mandatory",
        "alert-danger"
      );
    } else {
      //Add the expenses to the list
      html.expensessList(expenseName, expenseAmount);

      //track budget amount
      html.trackBudget(expenseAmount);
      html.printMessage("Value has been added!", "alert-success");
    }
  });
}
/////////////////////////////////////////////////////////////////////////////////////
