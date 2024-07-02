const passwordInputEye = document.querySelector(".toggle-password");
const passwordInput = document.querySelector(".login__input-password");
const usernameInput = document.querySelector(".login__input-username");
const loginForm = document.querySelector(".login__form");

const API_URL = "https://dummyjson.com/auth/login";

function togglePassword() {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    passwordInputEye.textContent = type === "password" ? "👁️" : "🙈";
}

async function getLogin(userData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        const res = await response.json();
        console.log(res);
        localStorage.setItem("x-auth-token", res.token);
        window.open("/page/admin.html", "_self");
    } catch (error) {
        alert(error.message);
    }
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = {
        username: usernameInput.value,
        password: passwordInput.value
    };
    getLogin(user);
});
