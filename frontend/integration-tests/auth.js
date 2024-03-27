


async function SignIn() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    console.log('from webpage', email, password);
    const response = await fetch('http://127.0.0.1:3000/api/user/loginUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }).then(response => response.json())
        .then(data => {
            // Handle the response from the backend
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

async function SignUp() {

    let Fname = document.getElementById('Fname').value;
    let Lname = document.getElementById('Lname').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    console.log('from webpage', email, password);
    const response = await fetch('http://127.0.0.1:3000/api/user/registerUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: Fname,
            lastName: Lname,
            email: email,
            password: password
        })
    }).then(response => response.json())
        .then(data => {
            // Handle the response from the backend
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


async function GetAllUsers() {
    let element = document.getElementById('add_data');
    const response = await fetch('http://127.0.0.1:3000/api/user/getAllUsers', {
        method: 'get'
    }).then(response => response.json())
        .then(data => {
            // Handle the response from the backend `
            console.log(data.data);

            data.data.forEach(eio => {

                element.innerHTML += '<div>' + eio.firstName + eio.lastName + eio.email + '</div>';
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });



}