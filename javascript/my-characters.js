let playgroup = "Ingen spelgrupp";
$(function () {
  loadCharacterPage();
});

const loadCharacterPage = () => {
  checkIfLoggedIn()
  $("#go-to-create").click(function () {
    sessionStorage.removeItem("character");
    sessionStorage.removeItem("characterNumber");
    sessionStorage.removeItem("chosenPlaygroup")
    if(!sessionStorage.getItem("character" && !sessionStorage.getItem("chosenPlaygroup"))) {
      window.location.href = "character-creation.html";
    } 
  });
  let user = JSON.parse(sessionStorage.getItem("user"));
  axios.get(userByEmail + user.email).then((resp) => {
    sessionStorage.setItem("user", JSON.stringify(resp.data));
    loadCharacters(resp.data.characters);
  });
};

const getPlaygroupName = (playgroupName) => {
  playgroup = playgroupName.name;
  return playgroupName.name;
};

const loadCharacters = (characters) => {
  let group = "Ingen spelgrupp";
  $("#character-output").html("");
  characters.forEach((character, index) => {
    $("#character-output")
      .append(`<div class="card mb-3 bg-dark text-success playgroup mb-5" style="max-width: 18rem">
          <div class="card-header bg-transparent playgroup">Spelgrupp: <span id="group-${index}"><span></div>
          <div class="card-body text-success">
            <h5 class="card-title light">${character.name}</h5>
            
          </div>
          <div class="card-footer bg-transparent playgroup">
            <button class="btn btn-outline-light playgroup-button character-button" id="${character.characterNumber}" style="width: 100%">
              Välj
            </button>
          </div>
        </div>`);
    axios
      .get(getPlaygroupFromCharacter + character.characterNumber)
      .then((resp) => {
        if (resp.data.name) {
          group = resp.data.name;
        }
        $("#group-" + index).text(group);
      })
      .catch((err) => {
        console.log(err);
      });
      $(".character-button").click(function(e) {
          console.log(e.target.id);
          getCharacterFromServer(e.target.id);

      });
  });
};

const getCharacterFromServer = (characterNumber) => {
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
