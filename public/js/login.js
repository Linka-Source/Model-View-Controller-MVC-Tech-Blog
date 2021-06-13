// Getting references to our form and inputs
const $loginForm = document.querySelector('form.login');

// When the form is submitted, we validate there's an email and password entered
$loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    if (!email || !password) {
        return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser({ email, password });
    event.target.reset();
});

// loginUser does a post to our "api/login" route and if successful, redirects us the the members page
function loginUser({ email, password }) {
    fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
            email,
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
        .catch((err) => {
            console.error(err.responseText);
        });
}
