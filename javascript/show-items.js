let itemToUpdate;

$(function () {
  loadGearPage();
  $("#gain-gear").click(function () {
    character.adventuringGear += 1;
    $("#gear-number").text(character.adventuringGear);
    changeAdventuringGear(character.adventuringGear);
  });
  $("#lose-gear").click(function () {
    if (character.adventuringGear >= 1) {
      character.adventuringGear -= 1;
      $("#gear-number").text(character.adventuringGear);
      changeAdventuringGear(character.adventuringGear);
    }
  });
  $("#gain-armor").click(function () {
    character.armor += 1;
    $("#armor-number").text(character.armor);
    changeCharacterArmor(character.armor);
  });
  $("#lose-armor").click(function () {
    if (character.armor >= 1) {
      character.armor -= 1;
      $("#armor-number").text(character.armor);
      changeCharacterArmor(character.armor);
    }
  });


  $("#new-item").click(function () {
    $("#add-item").show();
    $(this).hide();
  });

  $("#save-new-item").click(function () {
    if ($(this).text() == "Spara utrustning") {
      let item = {
        name: $("#item-name-input").val(),
        quantity: +$("#item-quantity-input").val(),
        weight: +$("#item-weight-input").val(),
        description: $("#new-item-description").val(),
      };
      if (item.name && item.weight) {
        if (!item.quantity) {
          item.quantity = 1;
        }
        axios
          .post(addItem + character.characterNumber, item)
          .then((resp) => {
            sessionStorage.setItem("character", JSON.stringify(resp.data));
            loadGearPage();
            $("#new-item").show();
          })
          .catch((err) => {
            swal("Ett fel uppstod", err.response.data.message, "error").then(
              () => {
                loadGearPage();
                $("#new-item").show();
              }
            );
          });
      } else {
        swal(
          "Kan inte spara utrustning!",
          "Du behöver ange namn och vikt för att kunna spara utrustningen.",
          "error"
        );
      }
    } else {
      let newWeight = +$("#item-weight-input").val();
      let newQuantity = +$("#item-quantity-input").val();

      itemToUpdate.name = $("#item-name-input").val();
      if (newQuantity) {
        itemToUpdate.quantity = newQuantity;
      }

      if (newWeight) {
        itemToUpdate.weight = newWeight;
      }

      itemToUpdate.description = $("#new-item-description").val();

      axios
        .post(updateItem, itemToUpdate)
        .then((resp) => {
          loadGearPage();
          
          
        })
        .then(() => {
          
        })
        .catch((err) => {
          swal("Ett fel uppstod", err.response.data.message, "error").then(
            () => {
              
              loadGearPage();
              $("#new-item").show();
            }
          );
        });
    }
  });
});

const loadGearPage = () => {
  $("#add-item").hide();
  $("#new-item").show();
  $("#save-new-item").text("Spara utrustning");
  character = JSON.parse(sessionStorage.getItem("character"));
  axios.get(getCharacter + character.characterNumber)
  .then(resp => {
    sessionStorage.setItem("character", JSON.stringify(resp.data));
    renderGearPage(resp.data)
  })
  
 
};

const renderGearPage = (characterToShow) => {
 $("#gear-number").text(characterToShow.adventuringGear);
 $("#gear-output").html("");
 $("#armor-number").text(characterToShow.armor)

 characterToShow.inventoryItems.forEach((item) => {
   $("#gear-output")
     .append(`<div class="level mt-4"  onclick="updateCharacterItem(${item.itemNumber})">
                  <div class="row mx-3" >
                    <div class="col-7 mt-3 text-start">
                      <h6>
                        <span >${item.quantity}</span> x
                        <span >${item.name}</span>
                      </h6>
                    </div>
                    <div class="col mt-3 text-end">
                      <h6>Vikt: <span >${item.weight}</span> BP</h6>
                    </div>
                    <div class="col-12 text-start mb-3" >
                      ${item.description}
                    </div>
                  </div>
                </div>`);
 });
}

const changeAdventuringGear = (number) => {
  axios
    .post(changeGear + character.characterNumber + "&gear=" + number)
    .catch((error) => {
      console.log(error.response.message);
    });
};

const changeCharacterArmor = (number) => {
  axios
    .post(changeArmor + character.characterNumber + "&armor=" + number)
    .then(resp => {
      sessionStorage.setItem("character", JSON.stringify(resp.data))
      getCharacterFromServer(resp.data.characterNumber)
    })
    .catch((error) => {
      console.log(error.response.message);
    });
};



const updateCharacterItem = (itemNumber) => {
  itemToUpdate = character.inventoryItems.find(
    (item) => item.itemNumber == itemNumber
  );
  $("#item-name-input").val(`${itemToUpdate.name}`);
  $("#item-quantity-input").val(`${itemToUpdate.quantity}`);
  $("#item-weight-input").val(`${itemToUpdate.weight}`);
  $("#new-item-description").val(`${itemToUpdate.description}`);
  $("#save-new-item").text("Uppdatera");
  $("#add-item").show();
  jQuery("html,body").animate({ scrollTop: 0 }, 100);
};
