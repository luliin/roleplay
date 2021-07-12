let move = { moveDescription: [], numberOfCheckboxes: 0};
let newMove = { moveDescription: [], numberOfCheckboxes: 0 };
let moveOutput = $("#new-move-output");
const moveName = $("#move-name");
const moveAttribute = $("#move-attribute");
const moveActivated = $("#move-activated");
const moveCheckboxes = $("#move-checkboxes");
const moveDescription = $("#move-description");
const moveListItem = $("#list-item");
const moveDiceValue = $("#dice-value");
const moveDiceValueText = $("#dice-throw-text");
const moveInputFields = $("#move-inputfields");

$(function () {
  if (moveOutput.is(":visible")) {
    moveOutput.hide();
  }
  $("#add-move-name").click(addMoveName);
  $("#add-move-attribute").click(addAttribute);
  moveActivated.change(addActivated);
  moveCheckboxes.change(addCheckboxes);
  moveInputFields.change(addInputFields)
  $("#add-description").click(addDescription);
  $("#add-list-item").click(addToList);
  $("#add-dice-throw-text").on("click", addToDiceText);
  $("#undo").click(undoLast);
  $("#save-move").click(saveMove);
});

const addMoveName = () => {
  let newMoveName = moveName.val();
  if (newMoveName) {
    move = Object.assign({}, newMove);
    newMove.name = newMoveName;
    $("#move-name-text").text(newMove.name);
    showCard();
    moveName.val("");
  } else {
    swal("Ogiltigt namn!", "Du måste ange ett namn", "error");
  }
};

const addAttribute = () => {
  let attribute = moveAttribute.val();
  if (attribute) {
    move = Object.assign({}, newMove);
    newMove.attribute = attribute;
    $("#move-attribute-text").text(newMove.attribute);
    showCard();

  }
};

const addActivated = () => {
  let activated = +moveActivated.val();
  move = Object.assign({}, newMove);
  newMove.activated = activated;
  if (activated) {
    $("#move-activated-text").html(`<i class="bi bi-check2-circle"></i>`);
  } else {
    $("#move-activated-text").html(`<i class="bi bi-x-circle"></i>`);
  }
  showCard();

};

const addCheckboxes = () => {
  let checkboxes = +moveCheckboxes.val();
  move = Object.assign({}, newMove);
  newMove.numberOfCheckboxes = checkboxes;
  $("#number-of-checkboxes").html("");
  for (let i = 0; i < checkboxes; i++) {
    $("#number-of-checkboxes").append(
      `<input type="checkbox" name="checkbox-${i + 1}" id="checkbox-${i + 1}">`
    );
  }
  showCard();
 
};

const addInputFields = () => {
  let inputfields = +moveInputFields.val();
  console.log(inputfields);
  move = Object.assign({}, newMove);
  newMove.numberOfInputFields = inputfields;
  $("#input-fields-list").html("");
  for (let i = 0; i < inputfields; i++) {
    $("#input-fields-list").append(
      `<li><input type="text" name="input-${i + 1}" id="input-${i + 1}"></li>`
    );
  }
  showCard();

}

const addDescription = () => {
  let description = moveDescription.val();
  let priority = newMove.moveDescription.length + 1;
  if (description) {
    move = JSON.parse(JSON.stringify(newMove));
    newMove.moveDescription.push({
      description: description,
      priorityOrder: priority,
    });
    if ($("#move-primary-description").text()) {
      $("#other-description").append(`<li class="small">${description}</li>`);
    } else {
      $("#move-primary-description").text(description);
    }

    showCard();
 
    moveDescription.val("");
  } else {
    swal("Ogiltig beskrivning!", "Du måste ange text", "error");
  }
};

const addToList = () => {
  let listItem = moveListItem.val();
  let priority = newMove.moveDescription.length + 1;
  if (listItem) {
    move = JSON.parse(JSON.stringify(newMove));

    newMove.moveDescription.push({
      listItem: listItem,
      priorityOrder: priority,
    });

    $("#move-list-items").append(`<li class="small">${listItem}</li>`);
    showCard();

    moveListItem.val("");
  }
};

const addToDiceText = () => {
  let diceValue = moveDiceValue.val();
  let diceValueText = moveDiceValueText.val();

  let priority = newMove.moveDescription.length + 1;
  if (diceValueText) {
    showCard();
    let found = newMove.moveDescription.find((element) => {
      if (!element.diceThrowText) {
      } else if (element.diceThrowText.startsWith(diceValue)) {
        return element;
      }
    });
    if (found) {
      move = JSON.parse(JSON.stringify(newMove));
      found.diceThrowText = diceValue + ": " + diceValueText;
    } else {
      move = JSON.parse(JSON.stringify(newMove));

      newMove.moveDescription.push({
        diceThrowText: diceValue + ": " + diceValueText,
        priorityOrder: priority,
      });
       $("#move-dice-throw-text-list").html("");
       newMove.moveDescription.forEach((element) => {
         if (element.diceThrowText) {
           $("#move-dice-throw-text-list").append(
             `<li class="small">${element.diceThrowText}</li>`
           );
         }
       });
    }
    //     move.moveDescription.push({ listItem: listItem, priorityOrder: priority });

    moveDiceValueText.val("");
    $("#move-dice-throw-text-list").html("");
    newMove.moveDescription.forEach(element => {
      if(element.diceThrowText) {
        $("#move-dice-throw-text-list")
          .append(`<li class="small">${element.diceThrowText}</li>`);
      }
    })
  } else {
    swal("Ogiltig beskrivning!", "Du måste ange text", "error");
  }
};

const undoLast = () => {

  newMove = JSON.parse(JSON.stringify(move));

  renderMove();

};

const showCard = () => {
  if (moveOutput.is(":hidden")) {
    moveOutput.show();
  }
};

const renderMove = () => {
  showCard();
  if(newMove.name){
    $("#move-name-text").text(newMove.name);
  } else {
    $("#move-name-text").text("")
  }
  if(newMove.attribute){
    $("#move-attribute-text").text(newMove.attribute);
  } else {
    $("#move-attribute-text").text("")
  }
  let activated = newMove.activated
  if (activated) {
    $("#move-activated-text").html(`<i class="bi bi-check2-circle"></i>`);
  } else if (activated===false){
    $("#move-activated-text").html(`<i class="bi bi-x-circle"></i>`);
  } else {
    $("#move-activated-text").html("")
  }
  let checkboxes = newMove.numberOfCheckboxes;
  $("#number-of-checkboxes").html("");
  for (let i = 0; i < checkboxes; i++) {
    $("#number-of-checkboxes").append(
      `<input type="checkbox" name="checkbox-${i + 1}" id="checkbox-${i + 1}">`
    );
  }
  let inputfields = newMove.numberOfInputFields;
  $("#input-fields-list").html("");
  for (let i = 0; i < inputfields; i++) {
    $("#input-fields-list").append(
      `<li><input type="text" name="input-${i + 1}" id="input-${i + 1}"></li>`
    );
  }
  let description = newMove.moveDescription.filter(element => {
    if(element.description) {
      return element
    }
  })
  console.log(description);
  console.log(newMove)
  if(description.length>0){
    $("#move-primary-description").text(description[0].description)
    $("#other-description").text("")
    for(let i=1; i<description.length; i++) {
    $("#other-description").append(`<li class="small">${description[i].description}</li>`);
    }
  } else {
      $("#move-primary-description").text("")
    }

    let diceText = newMove.moveDescription.filter(element => {
      if(element.diceThrowText) {
        return element
      }
    })

    if(diceText.length>0){
      $("#move-dice-throw-text-list").html("")
      for(let i=0; i<diceText.length; i++) {
      $("#move-dice-throw-text-list").append(`<li class="small">${diceText[i].diceThrowText}</li>`);
      }
    } else {
        $("#move-dice-throw-text-list").text("")
      }
      let listText = newMove.moveDescription.filter(element => {
        if(element.listItem) {
          return element
        }
      })
      if(listText.length>0) {
        $("#move-list-items").html("")
        for(let i=0; i<listText.length; i++) {
          $("#move-list-items").append(`<li class="small">${listText[i].listItem}</li>`);
          }
      } else {
        $("#move-list-items").text("")
      }
    

  
  
  
    
    

}

const saveMove = () => {
  newMove.activated = moveActivated.val();
  
  let characterNumber = JSON.parse(sessionStorage.getItem("characterNumber"))
  if(characterNumber) {
    axios.post(addMoveToCharacter + characterNumber, newMove)
    .then(resp => {
      swal("Manöver tillagd!", "" + resp.data.name + " har lagts till.", "success")
      .then(()=> {
        refreshPage();
        resetMoves();
        
      })
      .then(() => {
        checkAvaliability();
      })
      .catch(error => {
        swal("Ett fel uppstod!", error.response.data.message, "error");
      })
    })
  } else {
    swal("Ingen karaktär skapad!", "Du måste skapa en karaktär innan du kan lägga till manövrar!", "error")
  }
}

const refreshPage = () => {
  moveOutput.hide();
  $("#move-name-text").text("");
  $("#move-attribute-text").text("");
  $("#move-activated-text").text("");
  $("#number-of-checkboxes").html("");
  $("#move-primary-description").text("");
  $("#move-list-items").html("");
  $("#move-dice-throw-text-list").html("");
  $("#other-description").html("");
}

const resetMoves = () => {
  move = { moveDescription: [] };
  newMove = { moveDescription: [] };
}

{
  /* <div class="card mx-4 mb-3 bg-dark text-success playgroup mb-5">
                <div class="card-header bg-transparent playgroup text-center">
                  <h5 class="m-0 light" id="move-name">
                    Eld... själ! <span id="move-attribute">(FYS)</span>
                  </h5>
                </div>
                <div class="card-body text-success">
                  <h6 class="card-title light small">
                    <small id="move-primary-description"
                      >När du frammanar ett vapen av ren eld, beskriv dess form
                      och slå +FYS. Vapnet börjar alltid med taggarna eldigt,
                      hand och farligt. På 10+, välj ytterligare två taggar. På
                      7-9, välj ytterligare en tag.</small
                    >
                  </h6>
                </div>
                <div class="card-footer bg-transparent playgroup light">
                  <ul class="text-start small" id="move-list-items">
                    <li class="small">Nära</li>
                    <li class="small">Räckvidd</li>
                    <li class="small">Kastad</li>
                    <li class="small">Fördel på skadeslag</li>
                    <li class="small">Ta bort taggen ’farlig’</li>
                  </ul>

                  <ul class="text-start small list-unstyled ms-3" id="move-dice-throw-text-list">
                    <li class="small">10+: </li>
                    <li class="small">7-9:</li>
                    <li class="small">6-:</li>
                    
                  </ul>
                  <h6 class="small">
                    <small>
                      På 6-, så får du ditt vapen men det får taggen hungrig.
                      Mata det, eller möt konsekvenserna</small
                    >
                  </h6>
                </div>
              </div> */
}
