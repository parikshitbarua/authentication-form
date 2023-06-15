let loginButton = document.getElementById("login-button");

loginButton.addEventListener("click", async () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    const data = {
        email: email,
        password: password
    };

    console.log(data)

    const options = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    await fetch(window.location.origin + '/app/signin', options);
})