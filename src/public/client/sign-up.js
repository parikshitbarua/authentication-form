let signUpButton = document.getElementById("sign-up-button");
let textArea =  document.getElementById("message");

signUpButton.addEventListener("click", async () => {

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(window.location.origin + '/app/signup',options).then((response) => {
        response.json().then((data) => {
            if (data.token) {

                textArea.textContent = "Welcome " + data.firstName;
            } else {
                textArea.textContent = data.message;
            }

        })
    })


})