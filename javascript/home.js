const $myAccount = $("#myAccount");
const $loginButton = $("#loginButton");
const $logoutButton = $("#logoutButton");
const $loginModal = $("#loginModal");
const $myPlaygroups = $("#myPlaygroups");
const $myCharacters = $("#myCharacters");
const $myGameMasterPage = $("#gameMasterPage");

$loginButton.click(() => {
  if (JSON.parse(sessionStorage.getItem("user")) === null) {
    $loginModal.modal("show");
  }
});

$(function () {
  $logoutButton.hide()
  $("#validate-sign-in").click(() => {
    validateSignIn();
  });
  checkIfLoggedIn();
  $logoutButton.click(signOut)
  
});

const signOut = () => {
  $loginButton.show()
  $logoutButton.hide()
  sessionStorage.removeItem("user");
  resetNavLinks("");
  if (window.location.href != "/roleplay-project/index.html") {
    window.location.href = "/roleplay-project/index.html";
  }
};

function checkIfLoggedIn() {
  let user = JSON.parse(sessionStorage.getItem("user"));

  if (user) {
    $loginButton.hide();
    $logoutButton.show();
    
//     if (window.location.pathname == "/roleplay-project/index.html") {
      

      $myAccount.html(
        `<a class="nav-link active" aria-current="pages" href="/pages/user">Mitt konto</a>`
      );
      $myPlaygroups.html(
        `<a class="nav-link active mt-0" aria-current="pages" href="/pages/user/playgroups.html">Mina spelgrupper</a>`
      );
      $myCharacters.html(
        `<a class="nav-link active mt-0" aria-current="pages" href="/pages/user/my-characters.html">Mina karaktärer</a>`
      );

      axios.get(getPlaygroupsFromGameMaster + user.email).then((resp) => {
        sessionStorage.setItem("gameMasteredGroups", JSON.stringify(resp.data));
        if (resp.data.length > 0) {
          $myGameMasterPage.html(
            `<a class="nav-link active mt-0" aria-current="pages" href="/pages/admin/my-playgroups.html">Spelledarsida</a>`
          );
        } else {
          $myGameMasterPage.html("");
        }
      });
//     } else {
//       $myAccount.html(
//         `<a class="nav-link active" aria-current="pages" href="./../pages/user">Mitt konto</a>`
//       );
//       $myPlaygroups.html(
//         `<a class="nav-link active mt-0" aria-current="pages" href="./../pages/user/playgroups.html">Mina spelgrupper</a>`
//       );
//       $myCharacters.html(
//         `<a class="nav-link active mt-0" aria-current="pages" href="./../pages/user/my-characters.html">Mina karaktärer</a>`
//       );

//       axios.get(getPlaygroupsFromGameMaster + user.email).then((resp) => {
//         sessionStorage.setItem("gameMasteredGroups", JSON.stringify(resp.data));
//         if (resp.data.length > 0) {
//           $myGameMasterPage.html(
//             `<a class="nav-link active mt-0" aria-current="pages" href="./../pages/admin/my-playgroups.html">Spelledarsida</a>`
//           );
//         } else {
//           $myGameMasterPage.html("");
//         }
//       });
//     }
} 
 

}

/**
 * validate input from the user against user information in database
 * if succsess sets loggedin user to sessionstorage
 */
const validateSignIn = () => {
  if($loginButton.text("Logga in")){
const email = $("#sign-in-email");
const password = $("#sign-in-password");

axios
  .post(`${validateLogin}login?email=${email.val()}&password=${password.val()}`)
  .then((resp) => {
    if (resp.status == 200) {
      sessionStorage.setItem("user", JSON.stringify(resp.data));
      checkIfLoggedIn();
      $loginModal.modal("hide");
      email.val("");
      password.val("");
    }
    if (resp.status == 204) {
      swal("Fel!", "Felaktiga användaruppgifter, försök igen!", "warning");
      email.val("");
      password.val("");
    }
  })
  .catch(() => {
    swal("Fel", "Fel e-post \neller lösenord!", "warning");
    password.val("");
  });
  }
  
};

const resetNavLinks = (text) => {
  console.log("");
  $myAccount.html(text);
  $myPlaygroups.html(text);
  $myCharacters.html(text);
  $myGameMasterPage.html(text);
};
