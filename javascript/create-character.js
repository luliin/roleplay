let userEmail;
let newCharacter;
$(function () {
  userEmail = JSON.parse(sessionStorage.getItem("user")).email;

  $("#create-character").click(createCharacter);
});

const createCharacter = () => {
  newCharacter = {
    name: $("#character-name").val(),
    title: $("#character-title").val(),
    level: $("#character-level").val(),
    maxHP: $("#character-hp").val(),
    armor: $("#character-armor").val(),
    damage: $("#character-damage").val(),
    strength: $("#character-strength").val(),
    dexterity: $("#character-dexterity").val(),
    constitution: $("#character-constitution").val(),
    intelligence: $("#character-intelligence").val(),
    wisdom: $("#character-wisdom").val(),
    charisma: $("#character-charisma").val(),
    age: $("#character-age").val(),
    origin: $("#character-origin").val(),
    background: $("#character-description").val(),
    milestones: $("#character-milestones").val(),
    savedLevel: false
  };
  axios
    .post(addCharacter + userEmail, newCharacter)
    .then((resp) => {
      swal("Karaktär skapad", resp.data.name + " har skapats!", "success").then(
        () => {
          sessionStorage.setItem("characterNumber", resp.data.characterNumber);
          let saveToPlaygroup = JSON.parse(
            sessionStorage.getItem("saveToPlaygroup")
          );
          swal(
            "Lägga till i spelgrupp?",
            "Vill du lägga till karaktären i " + saveToPlaygroup,
            "info",
            {
              buttons: ["Nej", "Ja!"],
            }
          ).then(()=> {
            let number = JSON.parse(sessionStorage.getItem("characterNumber"))
            axios.post(
              addCharacterToPlaygroup +
                saveToPlaygroup +
                "&userEmail="+userEmail+"&characterNumber=" + number
            )
            .then(resp => {
              swal(
                "Karaktären tillagd!",
                "Karaktären har lagts till i " + resp.data.name,
                "success"
              ).then(() => {
                $("#moves-tab").tab("show");
              });
            })
            .catch(err => {
              if(err.response) {
                swal("Ett fel uppstod", err.response.data.message, "error")
                .then(() => {
                  $("#moves-tab").tab("show");
                })
              } else {
                console.log(err);
                $("#moves-tab").tab("show");
              }
            });
          });
        }
      );
    })
    .catch((error) => {
      swal(error.response.data.message);
    });
};
