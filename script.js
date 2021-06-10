let registered = [];

let form = document.querySelector("#registration-form");
let table = document.querySelector(".registration-table");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.querySelector("#name");
  let email = document.querySelector("#email");

  if (name.value == "" || email.value == "") {
    alert("Please enter username and email");
    return false;
  } else {
    let registration = {
      name: name.value,
      email: email.value,
    };

    name.value = "";
    email.value = "";

    registered.push(registration);

    localStorage.setItem("registrationStorage", JSON.stringify(registered));
    addRegistration(registration);
  }
});

function addRegistration({ name, email }) {
  table.insertAdjacentHTML(
    "beforeend",
    `
          <tr>
              <td>${name}</td>
              <td>${email}</td>
          </tr>
         `
  );
}

if (localStorage.getItem("registrationStorage") !== null) {
  (function getRegistrationsFromLocalStorage() {
    let registrations = JSON.parse(
      localStorage.getItem("registrationStorage") || []
    );
    if (registrations.length > 0) {
      registered = [...registrations];
      registrations.forEach(({ name, email }) => {
        table.insertAdjacentHTML(
          "beforeend",
          `
                <tr>
                    <td>${name}</td>
                    <td>${email}</td>
                </tr>
               `
        );
      });
    }
  })();
}
