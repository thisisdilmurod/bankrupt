function confirmDelete(url) {
  const result = confirm("Are you sure you want to delete?");
  if (result) {
    window.location = url;
  }
}

function validateForm(event) {
  const errMsg = document.getElementById("err");
  const fields = ["name", "tel", "bank_name", "passport", "postcode", "address"];

  // TODO: Not checking for numbers
  fields.forEach(function(field) {
    var value = document.getElementById(field).value;
    if (value == "" || value.length > 100 || (field == "tel" && !(/^d{10}$/.test(userPhone)))) {
      event.preventDefault();
      var errOrigin = field.charAt(0).toUpperCase + field.slice(1);
      errMsg.innerHTML = `${errOrigin} cannot be validated!`;
      return false;
    } else {
      return true;
    }
  })
}

