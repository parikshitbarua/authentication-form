let signUpButton = document.getElementById("sign-up-button");

console.log("Script loaded");

signUpButton.addEventListener("click", async () => {

    console.log("Button clicked");

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

    const res = await fetch(window.location.origin + '/app/signup',options);

    await fetch(window.location.origin + '/', {
        method:'GET'
    })


})