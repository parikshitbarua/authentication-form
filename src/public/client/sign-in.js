let loginButton = document.getElementById("login-button");
let textArea = document.getElementById("message");

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

    await fetch(window.location.origin + '/app/signin', options).then((response) => {
        response.json().then((data) => {
            if(data.token) {
                textArea.innerText = `Welcome back, ${data.firstName}`;
            } else {
                textArea.innerText = data.message;
            }
        });
    });
})