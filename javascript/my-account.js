let user;
const $editFirstname = $("#edit-firstname");
const $editLastname = $("#edit-lastname");
const $editUsername = $("#edit-username");
const $editEmail = $("#edit-email");
const $editPassword = $("#edit-password");
const $firstnameRow = $("#firstname-row");
const $firstnameInput = $("#firstname-input");
const $firstnameField = $("#firstname-field"); 
const $lastnameRow = $("#lastname-row");
const $lastnameInput = $("#lastname-input");
const $lastnameField = $("#lastname-field"); 
const $usernameRow = $("#username-row");
const $usernameInput = $("#username-input");
const $usernameField = $("#username-field"); 
const $emailRow = $("#email-row");
const $emailInput = $("#email-input");
const $emailField = $("#email-field"); 
const $passwordRow = $("#password-row");
const $passwordInput = $("#password-input");
const $passwordField = $("#password-field"); 


$(function() {
user = JSON.parse(sessionStorage.getItem("user"));
if(!user) {
    window.location.href="../../index.html";
}
let email = user.email;
getUserFromServer(email)


$loginButton.click(function(){
    if($(this).text()==="Logga in") {
        window.location.href = "../../index.html";
    } 
})

function getUserFromServer(email) {
  axios
    .get(
      `${userByEmail}` + email
    )
    .then((resp) => {
      if (resp.status == 200) {
        sessionStorage.setItem("user", JSON.stringify(resp.data));
        renderInfo(resp.data)
      }
      if (resp.status == 204) {
        swal(
          "Fel! 204",
          "Ett fel uppstod!",
          "warning"
        );
      }
    })
    .catch(() => {
      swal("Fel", "Ett fel uppstod!", "warning");
    });
}


function renderInfo(userdata) {
  $("#firstname").html(`${userdata.firstName}`)
  $("#lastname").html(`${userdata.lastName}`)
  $("#username").html(`${userdata.username}`)
  $("#email").html(`${userdata.email}`)
}

$editFirstname.click(function(){
  editField("firstname", $firstnameRow, $firstnameInput)
  $("#firstname-field").val($("#firstname").text())
})

$editLastname.click(function(){
  editField("lastname", $lastnameRow, $lastnameInput)
  $("#lastname-field").val($("#lastname").text())
})

$editUsername.click(function(){
  editField("username", $usernameRow, $usernameInput)
  $("#username-field").val($("#username").text())
})

$editEmail.click(function(){
  editField("email", $emailRow, $emailInput)
  $("#confirm-email-field").val($("#email").text())
  $("#email-field").val()
})

$editPassword.click(function(){
  editField("password", $passwordRow, $passwordInput)
})


function editField(inputField, inputRow, inputDiv) {
  inputRow.hide();
    inputDiv.html(`<div class="row">
            <div class="col">
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  aria-label="Edit ${inputField}"
                  aria-describedby="button-addon2"
                  id="${inputField}-field"
                />
                <button
                  class="btn btn-outline-secondary input-button"
                  type="button"
                  id="confirm-${inputField}"
                >
                  <i class="bi bi-check-lg"></i>
                </button>
              </div>
            </div>
          </div>`);

          if(inputField==="email") {
            $("#confirm-email-input").html(`<div class="row">
            <div class="col mb-2">
              
                <input
                  type="text"
                  class="form-control"
                  aria-label="Confirm ${inputField}"
                  aria-describedby="button-addon2"
                  id="confirm-email-field"
                />
                
            </div>
            <h5 class="header">Bekräfta e-post</h5>
          </div>`);

          $('#email-field').keypress(function(e) {
            if ( e.keyCode == 13 ) {  // detect the enter key
                $(`#confirm-email`).click(); // fire a sample click,  you can do anything
            }
            if(e.key === "Escape") {
              $("#reset-button").click();
            }
        });
    

          $(`#confirm-email`).click(function(){
            let email = $(`#email-field`).val().trim();
            let confirmedEmail =  $(`#confirm-email-field`).val().trim();
            if(email===confirmedEmail && email) {
              let userObject = JSON.parse(sessionStorage.getItem("user"));
              userObject.email=email;
              axios.post(updateUserEmail, userObject)
              .then((resp) => {
                if (resp.status == 200) {
                  getUserFromServer(resp.data.email)
                  renderInfo(resp.data)
                  swal("Bekräftelse", "Din e-post har ändrats", "success")
                  .then(() => {
                    $(`#${inputField}`).html(resp.data.email)
                    inputDiv.html("");
                    $("#confirm-email-input").html("");
                    inputRow.show();
                  })
                }
                
              })
              .catch((error) => {
                swal("Fel, " + error.response.data.message, "Kunde inte spara ny e-post", "warning");
              });
            } else if (!email || !confirmedEmail){
              swal("Felaktig e-post", "Tomt e-postfält, försök igen!", "warning");
            } else {
              swal("Felaktig e-post", "Adresserna överensstämmer inte, försök igen!", "warning");
            
            }
            
          })
          }
          else if(inputField==="password"){
            $("#password-field").attr("type", "password")
            $("#confirm-password-input").html(`<div class="row">
            <h5 class="header">Gammalt lösenord:</h5>
            <div class="col mb-2">
              
                <input
                  type="password"
                  class="form-control"
                  aria-label="Confirm ${inputField}"
                  aria-describedby="button-addon2"
                  id="old-password-field"
                />
                
            </div>
            <h5 class="header">Nytt lösenord:</h5>
          </div>
          <div class="row">
            <div class="col mb-2">
              
                <input
                  type="password"
                  class="form-control"
                  aria-label="New ${inputField}"
                  aria-describedby="button-addon2"
                  id="new-password-field"
                />
                
            </div>
            <h5 class="header">Bekräfta nytt lösenord:</h5>
          </div>`);

          $('#password-field').keypress(function(e) {
            if ( e.keyCode == 13 ) {  // detect the enter key
                $(`#confirm-password`).click(); // fire a sample click,  you can do anything
            }
            if(e.key === "Escape") {
              $("#reset-button").click();
            }
        });
    

          $(`#confirm-password`).click(function(){
            let oldPassword = $(`#old-password-field`).val().trim();
            let password = $(`#password-field`).val().trim();
            let confirmedPassword =  $(`#new-password-field`).val().trim();
            if(password===confirmedPassword && password) {

              
              axios.post(updatePassword +`?oldPassword=${oldPassword}&newPassword=${confirmedPassword}&email=${user.email}`)
              .then((resp) => {
                if (resp.status == 200) {
                  getUserFromServer(resp.data.email)
                  renderInfo(resp.data)
                  swal("Bekräftelse", "Ditt lösenord har ändrats", "success")
                  .then(() => {
                    $("#reset-button").click();
                  })
                }
                
              })
              .catch((error) => {
                swal( error.response.data.message, "Kunde inte uppdatera lösenordet!", "warning");
              });
            } else if (!password || !confirmedPassword){
              swal("Felaktigt lösenordsformat!", "Tomt lösenordsfält, försök igen!", "warning");
            } else {
              swal("Felaktigt lösenord", "Lösenorden överensstämmer inte, var god försök igen!", "warning");
            
            }
            
          })
          }
          else {
            $(`#confirm-${inputField}`).click(function(){
            let name = $(`#${inputField}-field`).val().trim();
            if(name){
              $(`#${inputField}`).html(name)
            inputDiv.html("");
            inputRow.show();
            }
          })
          }

          
}



$("#reset-button").click(function(){
  $(".resettable").html("");
  $(".row").show()
})

$("#save-changes").click(function(){
  let userObject = JSON.parse(sessionStorage.getItem("user"));
  userObject.firstName = $("#firstname").text()
  userObject.lastName = $("#lastname").text()
  userObject.username = $("#username").text()

  

  axios.post(updateUser, userObject)
              .then((resp) => {
                if (resp.status == 200) {
                  getUserFromServer(resp.data.email)
                  renderInfo(resp.data)
                  swal("Bekräftelse", "Din information har uppdaterats!", "success")
                  .then(() => {
                    $("#reset-button").click();
                  })
                }
                
              })
              .catch((error) => {
                swal("Fel " + error.error, "Kunde inte spara ny e-post", "warning");
              });

})


})