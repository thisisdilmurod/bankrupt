// Confirm deletion
function confirmDelete(url) {
  const result = confirm("Are you sure you want to delete?");
  if (result) {
    window.location = url;
  }
}

// Validate the form
function validateForm(event) {
  const errMsg = document.getElementById("err");
  const fields = [
    "name",
    "tel",
    "bank_name",
    "passport",
    "postcode",
    "address",
  ];

  fields.forEach(function (field) {
    var value = document.getElementById(field).value;
    if (
      value == "" ||
      value.length > 100 ||
      value.length < 3 ||
      (field === "tel" && !validPhone(value))
    ) {
      event.preventDefault();
      var errOrigin = field.charAt(0).toUpperCase() + field.slice(1);
      errMsg.innerHTML = `${errOrigin} cannot be validated!`;
      return false;
    } else {
      return true;
    }
  });
}

// Validate the phone number
function validPhone(phoneNumber) {
  for (let i = 0; i < phoneNumber.length; i++) {
    if (!/\d/.test(phoneNumber[i])) {
      return false; 
    }
  }
  return true;
}
