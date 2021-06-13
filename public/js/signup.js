// Getting references to our form and input
const $signUpForm = document.querySelector('form.signup');

// When the signup button is clicked, we validate the email and password are not blank
$signUpForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = document.querySelector('#email').value;
    const name = document.querySelector('#name').value;
    const password = document.querySelector('#password').value;

    if (!name || !email || !password) {
        return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser({ name, email, password });
    event.target.reset();
});

// Does a post to the signup route. If successful, we are redirected to the members page
// Otherwise we log any errors
function signUpUser({ name, email, password }) {
    fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({
            email,
            name,
            password,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((r) => r.json())
        .then(() => {
            window.location.replace('/dashboard');
        })
        .catch((err) => console.log(err.responseText));
}
