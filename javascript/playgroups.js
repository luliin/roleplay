const $playgroupOutput = $("#playgroup-output");
let newGroupOutput = $("#new-playgroup-output");

$(function () {
  newGroupOutput.hide();
  getUserPlaygroupsFromServer();
  $("#create-new-character").click(() => {
    window.location.href = "character-creation.html";
  });

  $("#add-playgroup-button").click(showAddPlaygroup);
  $("#add-new-playgroup").click(pressToAddPlaygroup);
});

function getUserPlaygroupsFromServer() {
  let user = JSON.parse(sessionStorage.getItem("user"));
  axios
    .get(`${userByEmail}` + user.email)
    .then((resp) => {
      if (resp.status == 200) {
        sessionStorage.setItem("user", JSON.stringify(resp.data));
        getPlaygroups(resp.data.email);
      }
      if (resp.status == 204) {
        swal("Fel! 204", "Ett fel uppstod!", "warning");
      }
    })
    .catch(() => {
      swal("Fel", "Ett fel uppstod!", "warning");
    });
}
const pressToAddPlaygroup = () => {
  if (addNewPlaygroup($("#new-playgroup-name").val())) {
    newGroupOutput.hide();
    $("#add-playgroup-button").show();
    $("#new-playgroup-name").val("");
  }
};

const showAddPlaygroup = () => {
  $("#new-playgroup-output").show();
  $("#add-playgroup-button").hide();
};

const addNewPlaygroup = (name) => {
  if (name) {
    let newPlaygroup = {
      name: name,
    };
    console.log("Lägger till spelgrupp " + name);
    let user = JSON.parse(sessionStorage.getItem("user"));
    axios.post(postPlaygroup + user.email, newPlaygroup)
    .then (resp => {
      swal("Spelgrupp tillagd!", "Du har skapat spelgruppen " + resp.data.name, "success")
      .then(() => {
        getUserPlaygroupsFromServer();
        checkIfLoggedIn();
      })
    })
    .catch(err => {
      if(err.response) {
        swal("Ett fel uppstod!", err.response.data.message, "error")
      } else {
        console.log(err);
      }
    })
    return true;
  } else {
    swal("Ange ett namn!", "Du måste ange ett namn, försök igen!", "error");
    return false;
  }
};

function getPlaygroups(email) {
  axios.get(`${getUserPlaygroups}` + email).then((resp) => {
    if (resp.status == 200) {
      sessionStorage.setItem("playgroups", JSON.stringify(resp.data));
      renderInfo(resp.data);
    }
    if (resp.status == 204) {
      swal("Fel! 204", "Ett fel uppstod!", "warning");
    }
  });
  // .catch(() => {
  //     swal("Fel", "Ett fel uppstod!", "warning");
  // });
}

function renderInfo(data) {
  let user = JSON.parse(sessionStorage.getItem("user"));

  let playerCharacter;
  $playgroupOutput.html("");
  data.forEach((element) => {
    playerCharacter = element.playerCharacters.filter((character) =>
      user.characters.find((char) => compareCharacters(char, character))
    );
    if (playerCharacter.length == 0) {
      playerCharacter = [
        { name: "Ingen karaktär", characterNumber: element.name },
      ];
    }
    $playgroupOutput.append(`<div class="col text-center"><div class="card  mx-4 mb-3 bg-dark text-success playgroup mb-5" style="">
        <div class="card-header bg-transparent playgroup">${element.name}</div>
        <div class="card-body text-success">
            <h5 class="card-title light">${playerCharacter[0].name}</h5>
            <p class="card-text playgroup">Spelledare: <span class="light">${element.gameMaster.firstName}</span></p>
        </div>
        <div class="card-footer bg-transparent playgroup">
            <button class="btn playgroup-button add-player" id="${playerCharacter[0].characterNumber}" style="width: 100%">
                Välj
            </button>

        </div>
    </div>
    </div>`);
  });
  $(".add-player").click(function (e) {
    if (e.target.id > 0) {
      getCharacterFromServer(e.target.id);
    } else {
      sessionStorage.setItem("saveToPlaygroup", JSON.stringify(e.target.id));
      loadAvailableCharacters();

      $("#selectAddCharacter").modal("show");

      // window.location.href = "character-creation.html"
    }
  });
}

const loadAvailableCharacters = () => {
  let user = JSON.parse(sessionStorage.getItem("user"));
  $("#characterBody").html("");
  user.characters.forEach((character, index) => {
    axios
      .get(getPlaygroupFromCharacter + character.characterNumber)
      .then((resp) => {
        if (resp.data.name) {
          console.log(resp.data);
        } else {
          $("#characterBody").append(`<div class="level mb-3 text-center">
                    <div class="mx-5 mt-4 mb-3">
                    <h6>Namn: ${character.name}</h6>
                    <h6>Level: ${character.level}</h6>
                    <h6>Ras: ${character.race} Rustning: ${character.armor}</h6>
                    <h6>Sty: ${character.strength} - Smi: ${character.dexterity} - Fys: ${character.constitution}</h6>
                    <h6>Int: ${character.intelligence} - Vis: ${character.wisdom} - Kar: ${character.charisma}</h6>
                    <div class="text-center">
                    <button type="button" class="btn playgroup-button dark-playgroup-button mt-2 choose-character-${index}" id="${character.characterNumber}">Lägg till i spelgrupp</button>
                    </div>
                    </div>
                </div>`);
          $(".choose-character-" + index).click(function (e) {
            let chosenPlaygroup = JSON.parse(
              sessionStorage.getItem("saveToPlaygroup")
            );
            axios
              .post(
                addCharacterToPlaygroup +
                  chosenPlaygroup +
                  "&userEmail=" +
                  user.email +
                  "&characterNumber=" +
                  e.target.id
              )
              .then((resp) => {
                swal(
                  "Karaktären tillagd!",
                  "Karaktären har lagts till i " + resp.data.name,
                  "success"
                ).then(() => {
                  $("#chooseCharacter").modal("hide");
                  getUserPlaygroupsFromServer();
                });
              })
              .catch((err) => {
                if (err.response) {
                  swal("Ett fel uppstod", err.response.data.message, "error");
                } else {
                  console.log(err);
                }
              });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

function compareCharacters(char1, char2) {
  return char1.characterNumber === char2.characterNumber;
}

function getCharacterFromServer(characterNumber) {
  axios
    .get(getCharacter + characterNumber)
    .then((resp) => {
      if (resp.status == 200) {
        sessionStorage.setItem("character", JSON.stringify(resp.data));
        window.location.href = "characters.html";
      }
    })
    .catch((error) => {
      swal(error.data.message, "Ett fel uppstod!", "warning");
    });
}
