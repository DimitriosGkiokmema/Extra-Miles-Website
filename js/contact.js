// User inputs
let username = '';
let email = '';
let msg = '';

function checkInput() {
  username = document.getElementById('name');
  email = document.getElementById('email');
  msg = document.getElementById('message');

  console.log(email);
}

function checkEmail() {
  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let mail = "test@example.com";

  if (regex.test(mail)) {
      console.log("Valid email address");
  } else {
      console.log("Invalid email address");
  }
}