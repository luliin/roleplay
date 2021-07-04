let registerFirstname = $("#register-firstname");
let registerLastname = $("#register-lastname");
let registerUsername = $("#register-username");
let registerEmail = $("#register-email");
let registerPassword = $("#register-password");
let confirmPassword = $("#confirm-password");
let register = $("#create-account")

$(function(){

    register.click(createNewAccount)
})

const createNewAccount = () => {

     let emailPattern =
       /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    

    let newUser = {
        firstName: registerFirstname.val(),
        lastName: registerLastname.val(),
        email: registerEmail.val(),
        username: registerUsername.val(),
        password: registerPassword.val()
    }

    let confirmedPassword = confirmPassword.val()

    if(newUser.password == confirmedPassword) {
        
        if(validateUser(newUser)) {
          if(emailPattern.test(newUser.email)) {
              axios.post(addAccount, newUser)
              .then(resp => {
                logInNewUser(resp.data.email, newUser.password)
              })
              .catch(err => {
                  swal("Ett fel uppstod", err.response.data.message, "error")
              })
            swal("Registrerar konto", "Ditt konto blir registrerat!", "success")
        }  else {
            swal("Felaktig e-post", "Ange en giltig e-postadress!", "error")
        }

        } else {
            swal("Inga fält får vara tomma!", "Var god fyll i de tomma fälten", "error")
        }
    } else {
        swal("Lösenorden matchar inte", "Lösenorden måste matcha för att kunna fortsätta ", "error")
    }
}

const validateUser = (user) => {

    if(user.firstName && user.lastName && user.username && user.email && user.password) {
        return true;
    } else {
        return false;
    }

}

const logInNewUser = (email, password) => {

    axios
      .post(
        `${validateLogin}login?email=${email}&password=${password}`
      )
      .then((resp) => {
        if (resp.status == 200) {
          sessionStorage.setItem("user", JSON.stringify(resp.data));
          checkIfLoggedIn();
          $loginModal.modal("hide");
          $("#createAccount").modal("hide");
        }
        if (resp.status == 204) {
          swal("Fel!", "Felaktiga användaruppgifter, försök igen!", "warning");
          email.val("");
          password.val("");
        }
      })
      .catch(() => {
        swal("Fel", "Fel e-post \neller lösenord!", "warning");
      });

}