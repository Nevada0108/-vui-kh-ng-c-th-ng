// This file contains JavaScript code to handle form submission and client-side validation for the login interface.
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        if (validateEmail(email) && validatePassword(password)) {
            alert('Đăng nhập thành công! (Demo)');
            // Here you can add code to handle actual login logic, such as sending a request to a server.
        } else {
            alert('Vui lòng kiểm tra thông tin đăng nhập của bạn.');
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePassword(password) {
        return password.length >= 6; // Example validation: password must be at least 6 characters long
    }
});