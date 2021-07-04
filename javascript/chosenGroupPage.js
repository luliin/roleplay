let playerOutput = $("#player-output");
let characterOutput = $("#character-output");
let gameMaster;
$(function () {
  $("#new-player-output").hide();
  loadPlayGroup();
  $("#add-player").click(function () {
    $(this).hide();
    $("#new-player-output").show();
  });
  $("#add-new-player").click(pressToAddPlayer);
  $("#new-player-email").keypress(function (e) {
    console.log(e.keyCode);
    if (e.keyCode == 13) {
      e.preventDefault();
      pressToAddPlayer();
    }
  });
});

const pressToAddPlayer = () => {
  $("#new-player-output").hide();
  $("#add-player").show();
  addNewPlayer($("#new-player-email").val());
  $("#new-player-email").val("");
};

const loadPlayGroup = () => {
  let currentPlaygroup = JSON.parse(sessionStorage.getItem("chosenPlaygroup"));
  axios
    .get(getPlaygroupFromName + currentPlaygroup.name)
    .then((resp) => {
      loadGroupPage(resp.data);
      sessionStorage.setItem("chosenPlaygroup", JSON.stringify(resp.data));
    })
    .catch((err) => {
      if (err.response) {
        swal("Ett fel uppstod", err.response.data.message, "error");
      } else {
        console.log(err);
      }
    });
};
const loadGroupPage = (data) => {
  gameMaster = JSON.parse(sessionStorage.getItem("user"));
  let currentPlaygroup = JSON.parse(sessionStorage.getItem("chosenPlaygroup"));
  playerOutput.html("");
  characterOutput.html("");

  data.players.forEach((player, index) => {
    console.log(player);
    playerOutput.append(`<div class="level mb-3">
                    <div class="mx-5 mt-4 mb-3">
                    <h6>${player.firstName} ${player.lastName}</h6>
                    <h6>${player.username}</h6>
                    <h6>${player.email}</h6>
                    <div class="text-center">
                    <button type="button" class="btn playgroup-button mt-2 remove-player-${index}" id="${player.email}" >Ta bort från spelgrupp</button>
                    </div>
                    </div>
                </div>`);

    $(".remove-player-" + index).click(function (e) {
      axios
        .get(
          removeUserFromPlaygroup +
            currentPlaygroup.name +
            "&userToRemove=" +
            e.target.id +
            "&userRequestEmail=" +
            gameMaster.email
        )
        .then((resp) => {
          swal("Användaren är borttagen", resp.data, "success");
        })
        .then(() => {
          loadPlayGroup();
        })
        .catch((err) => {
          if (err.response) {
            swal("Ett fel uppstod", err.response.data.message, "error");
          } else {
            console.log(err);
          }
        });
    });
  });
  data.playerCharacters.forEach((character) => {
    let player = data.players.find((person) =>
      person.characters.find((char) => (char.name = character.name))
    );
    if (!player) {
      player = { firstName: "Okänd" };
    }

    characterOutput.append(`<div class="level mb-3">
                    <div class="mx-5 mt-4 mb-3">
                    <h6>Namn: ${character.name}</h6>
                    <h6>Level: ${character.level}</h6>
                    <h6>Spelare: ${player.firstName}</h6>
                    <div class="text-center ">
                    <button type="button" class=" btn playgroup-button mt-2 remove-character" id="${character.characterNumber}">Ta bort från spelgrupp</button>
                    <button type="button" class=" btn playgroup-button mt-2 view-character" id="${character.characterNumber}">Karaktärssida</button>
                    </div>
                    </div>
                </div>`);
  });

  $(".view-character").on("click", function(e) {
    axios.get(getCharacter + e.target.id)
    .then(resp => {
      sessionStorage.setItem("character", JSON.stringify(resp.data))
    })
    .then(() => {
      window.location.href = "playgroup-characters.html"
    })
  })

  $(".remove-character").on("click", function (e) {
    axios
      .post(
        removeCharacterFromPlaygroup +
          e.target.id +
          "&userRequestEmail=" +
          gameMaster.email +
          "&playGroupName=" +
          currentPlaygroup.name
      )
      .then((resp) => {
        swal("Karaktären har tagits bort.", resp.data, "success").then(() => {
          loadPlayGroup();
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
};

const removePlayer = (gameMaster, userEmail, currentPlaygroup) => {
  axios
    .get(
      removeUserFromPlaygroup +
        currentPlaygroup.name +
        "&userToRemove=" +
        userEmail +
        "&userRequestEmail=" +
        gameMaster.email
    )
    .then((resp) => {
      swal("Användaren är borttagen", resp.data, "success");
    })
    .then(() => {
      loadPlayGroup();
    })
    .catch((err) => {
      if (err.response) {
        swal("Ett fel uppstod", err.response.data.message, "error");
      } else {
        console.log(err);
      }
    });
};

const addNewPlayer = (email) => {
  let name = JSON.parse(sessionStorage.getItem("chosenPlaygroup")).name;
  axios
    .post(addUserToPlaygroup + name + "&userEmail=" + email)
    .then((resp) => {
      console.log(resp.data);
      let player = resp.data.players[resp.data.players.length - 1];
      swal(
        player.firstName + " " + player.lastName + " tillagd!",
        player.firstName + " har blivit medlem i " + name + "!",
        "success"
      );
      loadPlayGroup();
    })
    .catch((err) => {
      if (err.response) {
        swal("Ett fel uppstod", err.response.data.message, "error");
      } else {
        console.log(err);
      }
    });
};
