//Variables
const sendBtn = document.querySelector("#sendBtn"),
  mailAddress = document.querySelector("#email"),
  subject = document.querySelector("#subject"),
  message = document.querySelector("#message"),
  rstBtn = document.querySelector("#resetBtn"),
  emailForm = document.querySelector("#email-form");

//Event Listeners
evntListeners();

function evntListeners() {
  //This evntListerner will execute when the page is loaded
  document.addEventListener("DOMContentLoaded", appInit);
  //Validate Fields
  mailAddress.addEventListener("blur", validateFields);
  subject.addEventListener("blur", validateFields);
  message.addEventListener("blur", validateFields);

  //Send emails and reset button
  emailForm.addEventListener("submit", sendEmail);
  rstBtn.addEventListener("click", resetForm);
}

//Functions

//App Initialization
function appInit() {
  sendBtn.disabled = true;
}

//Field validation
function validateFields() {
  let error = document.querySelectorAll(".error");

  //Validate length of the all fields
  validateLength(this);

  //Validate email
  if (this.type === "email") {
    validateEmail(this);
  }
  //   console.log(this);

  //Check if any field value is not empty
  if (email.value !== "" && subject.value !== "" && message.value !== "") {
    if (error.length === 0) {
      sendBtn.disabled = false;
    }
  }
}

//Validate the length of the fields
function validateLength(fields) {
  if (fields.value.length > 0) {
    fields.style.borderBottomColor = "green";
    fields.classList.remove("error");
  } else {
    fields.style.borderBottomColor = "red";
    fields.classList.add("error");
  }
}

//Validate email
function validateEmail(field) {
  let fieldValue = field.value;
  if (fieldValue.indexOf("@") !== -1) {
    field.style.borderBottomColor = "green";
    field.classList.remove("error");
  } else {
    field.style.borderBottomColor = "red";
    field.classList.add("error");
  }
}

//Send Email functionality
function sendEmail(evnt) {
  event.preventDefault();

  //Show the spinner
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "block";

  //Send Email Icon
  const emailIcon = document.createElement("img");
  emailIcon.src = "./img/mail.gif";
  emailIcon.style.display = "block";

  //Show spinner after a certain time interval and show Email sending Icon
  setTimeout(() => {
    //Hide the spinner
    spinner.style.display = "none";

    document.querySelector("#loaders").appendChild(emailIcon);

    setTimeout(() => {
      //Display the Email Icon
      emailForm.reset();
      emailIcon.remove();
    }, 2000);
  }, 1500);
}

//Reset the form
function resetForm() {
  emailForm.reset();
}
