const signInBtn = document.getElementById('sign-in-btn');
const userNameInput = document.getElementById('username-input');
const passwordInput = document.getElementById('password-input');

signInBtn.addEventListener('click',()=>{
    if(userNameInput.value=='admin' && passwordInput.value=='admin123'){
        alert("Sign In Success 👍");
        window.location.assign('home.html');
    }
    else{
        alert("Sign In Failed 😭");
    }
});


