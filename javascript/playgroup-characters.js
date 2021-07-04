$(function () {
    loadAllCharactersPage()
})

const loadAllCharactersPage = ()  => {
    $("#save-character-move").click(function(){
        saveNewMove()
        checkAvaliability();
    })
    let currentPlaygroup =JSON.parse(sessionStorage.getItem("chosenPlaygroup"))
    let currentCharacter = JSON.parse(sessionStorage.getItem("character"));
    sessionStorage.setItem("characterNumber", currentCharacter.characterNumber)
    $("#all-output").html("")

    currentPlaygroup.playerCharacters.forEach(character => {

        $("#all-output").append(`<div class="level mb-3 light">
                    <div class="mx-5 mt-4 mb-3 text-center">
                    <h5>${character.name}</h5>
                    
                    
                    <div class="text-center ">
                    
                    <button type="button" class=" btn playgroup-button mt-2 view-character-${character.characterNumber}" id="${character.characterNumber}">Välj</button>
                    </div>
                    </div>
                </div>`);

        $(".view-character-" + character.characterNumber).click(function (e) {
            sessionStorage.setItem("character", JSON.stringify(character));
            sessionStorage.setItem("characterNumber", character.characterNumber)
            checkAvaliability();
            $("#attributes-tab").tab("show");
            renderMovesPage();

        })

        
    });
}

const saveNewMove = () => {
  let characterNumber = JSON.parse(sessionStorage.getItem("characterNumber"));
  if (characterNumber) {
    axios.post(addMoveToCharacter + characterNumber, newMove).then((resp) => {
      swal(
        "Manöver tillagd!",
        "" + resp.data.name + " har lagts till.",
        "success"
      )
        .then(() => {
          refreshPage();
          resetMoves();
          checkAvaliability();
        })
        .then(() => {
          renderMovesPage()
        })
        .catch((error) => {
          swal("Ett fel uppstod!", error.response.data.message, "error");
        });
    });
  } else {
    swal(
      "Ingen karaktär skapad!",
      "Du måste skapa en karaktär innan du kan lägga till manövrar!",
      "error"
    );
  }
};