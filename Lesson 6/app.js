// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    sendEmailVerification, signOut, onAuthStateChanged
}
    from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDUWuXGfun0dITzUvp9jn8kuZkNgvSEV8s",
    authDomain: "nevada-noname.firebaseapp.com",
    projectId: "nevada-noname",
    storageBucket: "nevada-noname.firebasestorage.app",
    messagingSenderId: "769139287445",
    appId: "1:769139287445:web:a42c7ec91ced4fdb19829c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const showMessage = (element, message, isError = true) => {
    element.style.display = 'block';
    element.textContent = message;
    element.className = isError ? 'error-message' : 'success-message';
};

const handleError = (error, errorElement) => {
    errorElement.style.display = 'block';
    const messages = {
        'auth/email-already-in-use': 'Email đã được sử dụng',
        'auth/invalid-email': 'Email không hợp lệ',
        'auth/weak-password': 'Mật khẩu phải có ít nhất 6 ký tự',
        'auth/user-not-found': 'Email hoặc mật khẩu không đúng',
        'auth/wrong-password': 'Email hoặc mật khẩu không đúng',
    };
    errorElement.textContent = messages[error.code] || 'Có lỗi xảy ra. Vui lòng thử lại';
};

export const initLogin = () => {

    // Lấy các DOM dữ liệu cần thiết
    const elements = {
        form: document.getElementById('loginForm'),
        error: document.getElementById('errorMessage'),
        succsess: document.getElementById('successMessage'),
        registerLink: document.getElementById('registerLink'),
        email: document.getElementById('email'),
        password: document.getElementById('password')
    };

    // Xử lý submit form đăng nhập
    elements.form.addEventListener('submit', async (e) => {
        e.preventDefault();
        elements.error.style.display = 'none';
        elements.succsess.style.display = 'none';

        try {
            // Đăng nhập người dùng
            const userCredential = await signInWithEmailAndPassword(
                auth,
                elements.email.value,
                elements.password.value
            );

            // Đăng nhập thành công, chuyển hướng sau 1 giây
            showMessage(elements.succsess, 'Đăng nhập thành công', false);
            setTimeout(() => window.location.href = 'dashboard.html', 1000);
        } catch (error) {
            console.log(error)
            handleError(error, elements.error);
        }
    });

    // Chuyển hướng đến trang đăng ký
    elements.registerLink.addEventListener('click', () => {
        window.location.href = 'register.html';
    });
}

export const initRegister = () => {

    // Lấy các DOM dữ liệu cần thiết
    const elements = {
        form: document.getElementById('registerForm'),
        error: document.getElementById('errorMessage'),
        succsess: document.getElementById('successMessage'),
        email: document.getElementById('email'),
        password: document.getElementById('password'),
        loginLink: document.getElementById('loginLink'),
        verificationSection: document.getElementById('verificationSection'),
        resendEmail: document.getElementById('resendemail')
    }

    // Để hiện tại khong có người dùng
    let currentUser = null;

    // Kiểm tra form
    if (elements.form) {
        elements.form.addEventListener('submit', async (e) => {
            e.preventDefault()
            try {

                // Code xử lý đăng ký
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    elements.email.value,
                    document.getElementById('password').value
                );

                currentUser = userCredential.user;
                await sendEmailVerification(currentUser);
                elements.form.style.display = 'none';
                elements.verificationSection.style.display = 'block';
                showMessage(
                    elements.succsess,
                    'Đã đăng ký thành công! Vui lòng kiểm tra email xác nhận',
                    false
                )

            } catch (error) {
                    handleError(error, elements.error);

    }
});
    }
}
