let activeCharacter;
let moveToChange;
let showButton = $("#show-all");
$(function () {
  renderMovesPage();
  showButton.click(function () {
    if (showButton.text() == "Visa alla") {
      renderAllMovesPage();
      showButton.text("Visa aktiva");
    } else {
      renderMovesPage();
      showButton.text("Visa alla");
    }
  });
});

const renderMovesPage = () => {
  checkAvaliability();
  activeCharacter = character;

  axios
    .get(getMovesFromCharacter + activeCharacter.characterNumber)
    .then((resp) => {
      renderMoves(resp.data);
    })
    .catch((error) => {
      swal("Ett fel uppstod!", "" + error.data.message, "error");
    });
};

const renderAllMovesPage = () => {
  axios
    .get(getMovesFromCharacter + activeCharacter.characterNumber)
    .then((resp) => {
      renderAllMoves(resp.data);
    })
    .catch((error) => {
      swal("Ett fel uppstod!", "" + error.data.message, "error");
    });
};

const renderAllMoves = (data) => {
  
  let isGameMaster =
    window.location.pathname == "/pages/admin/playgroup-characters.html";
  $("#move-output").html("");
  data.forEach((move, index) => {
    let checked = move.checkedQuantity ?? 0;
    let attribute = move.attribute ?? "";
    let activatedText = move.activated
      ? `<i class="bi bi-check2-circle"></i>`
      : `<i class="bi bi-x-circle"></i>`;
    let hasDescription = false;
    let hasOtherDescription = false;
    let description = "";
    let otherDescription = "";

    $("#move-output")
      .append(`<div class="card mx-4 mb-3 bg-dark text-success playgroup mb-5">
                <div class="card-header bg-transparent playgroup text-center">
                  <h5 class="m-0 light">
                    ${move.name} <span>${attribute}</span> <span>${activatedText}</span>
                  </h5>
                </div>
                <div class="card-body text-success">
                <div class="text-center" id="number-of-checkboxes-${index}">
                 </div>
                  <h6 class="card-title light small">
                    <small id="description-${index}"
                      ></small
                    >
                  </h6>
                </div>
                <div class="card-footer bg-transparent playgroup light" id="button-${index}">
                    <ul class="text-start small list-unstyled ms-3" id="dice-text-${index}">
                    </ul>
                    <ul class="text-start small" id="list-item-${index}">
                    </ul>
                    <ul class="text-start small list-unstyled ms-3" id="input-fields-list-${index}">
                    
                    </ul>
                    <ul class="text-start small list-unstyled ms-3" id="other-description-${index}">
                    </ul>
                </div>
              </div>
    `);

    if (isGameMaster) {
      $("#button-" + index).append(`<form><div class="text-center">
      <button type="button" class="btn playgroup-button button-${index}" id="${move.moveNumber}">Ta bort</button>
      <button type="button" class="btn playgroup-button change-button-${index}" id="${move.moveNumber}">Ändra</button>
      </div></form>`);
      $(".button-" + index).click(function (e) {
        console.log(e.target.id);
        let character = JSON.parse(sessionStorage.getItem("character"));
        let characterNumber = character.characterNumber;
        axios
          .post(deleteMove + characterNumber + "&moveNumber=" + e.target.id)
          .then((resp) => {
            swal("Manöver borttagen", resp.data, "success").then(() => {
              renderMovesPage();
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
      $(".change-button-" +index).click(function (e){
        sessionStorage.setItem("moveNumber", e.target.id)
        $("#edit-move-group").hide();
        $("#edit-activated-group").hide();
        axios.get(getOneMove+e.target.id)
        .then(response => {
          sessionStorage.setItem("moveToChange", JSON.stringify(response.data))
          $("#edit-move-name-text").text(response.data.name)
          $("#edit-move-name").val(response.data.name)
          $("#edit-move-attribute-text").text(response.data.attribute)
          $("#edit-move-attribute").val(response.data.attribute)
          if(response.data.activated){
            $("#edit-move-activated-text").html(`<i class="bi bi-check2-circle"></i>`)
            $("#edit-move-activated").val("1")
          } else {
            $("#edit-move-activated-text").html(`<i class="bi bi-x-circle"></i>`)
            $("#edit-move-activated").val("0")
          }
          if(response.data.numberOfCheckboxes>0) {
            $("#edit-move-checkboxes").val(""+response.data.numberOfCheckboxes)
          } else {
            $("#edit-move-checkboxes").val("0")
          }
          
          $("#edit-move-name-text").click(function(){
            $(this).hide();
            $("#edit-move-group").show();
          })

          $("#edit-move-name").click(function(){
            if(!moveToChange) {
              moveToChange = JSON.parse(sessionStorage.getItem("moveToChange"));
            }
            let newName = $("#new-move-name").val();
            if(newName) {
              moveToChange.name=newName;
              $("#edit-move-name-text").text(newName);
            }
            $("#edit-move-group").hide();
            $("#edit-move-name-text").show();
          })

          $("#edit-move-activated-text").click(function(){
            $(this).hide();
            $("#edit-activated-group").show();
          })

          $("#change-activated").click(function() {
            if(!moveToChange) {
              moveToChange = JSON.parse(sessionStorage.getItem("moveToChange"));
            }
            let activated = +$("#edit-activated").val();
            if(activated=== 1 || activated===0) {
              if(activated ===1) {
                moveToChange.activated = true;
                $("#edit-move-activated-text").html(`<i class="bi bi-check2-circle"></i>`)
              } else {
                moveToChange.activated = false;
                $("#edit-move-activated-text").html(`<i class="bi bi-x-circle"></i>`)
              }
            }

            $("#edit-activated-group").hide();
            $("#edit-move-activated-text").show();
          })

        })
        $("#editMoveModal").modal("show");
      })
    }
    for (let i = 0; i < move.numberOfCheckboxes; i++) {
      $(`#number-of-checkboxes-${index}`).append(
        `<input class="checkbox" type="checkbox" name="checkbox-${
          i + 1
        }" id="checkbox-${index}-${i + 1}">`
      );
      if (i + 1 <= move.checkedQuantity) {
        $(`#checkbox-${index}-${i + 1}`).prop("checked", true);
      }
      $(`#checkbox-${index}-${i + 1}`).change(function (e) {
        if (this.checked) {
          checked += 1;
        } else {
          checked -= 1;
        }
        axios
          .post(editCheck + checked + "&moveNumber=" + move.moveNumber)
          .then((resp) => {
            console.log(resp.data);
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
    
    

    for (let i = 0; i < move.numberOfInputFields; i++) {
      console.log(move.numberOfInputFields);
      $(`#input-fields-list-${index}`).append(
        `<li>
            <div class="input-group mb-3">
              <input type="text" class="form-control" aria-label="Domänens Gud" aria-describedby="save-input-text-${i}" id="input-text-${i}" value="${
          move.inputText[i] ?? ""
        }">
              <button class="btn playgroup-button save-text" type="button" id="${i}">Spara</button>
            </div>
        </li>`
      );
    }
    $(".save-text").click(function (e) {
      console.log(e.target.id);
      console.log($("#input-text-" + e.target.id).val());
      console.log(move.inputText[e.target.id]);
      move.inputText[e.target.id] = $("#input-text-" + e.target.id).val();
      console.log(move.inputText[e.target.id]);
      console.log(move);

      axios
        .post(
          addMoveInputText + move.moveNumber + "&inputText=" + move.inputText
        )
        .then((resp) => {
          swal("Sparat", "Texten har lagts till i " + resp.data.name, "success");
        })
        .catch((err) => {
          if (err.response) {
            swal("Ett fel uppstod!", err.response.data.message, "error");
          } else {
            console.log(err);
          }
        });
    });
    move.moveDescription.forEach((element) => {
      if (element.description) {
        if (hasDescription) {
          otherDescription += `<li class="small">${element.description.replaceAll(
            "\n",
            "<br>"
          )}</li>`;
          hasOtherDescription = true;
        } else {
          hasDescription = true;
          $(`#description-${index}`).html(
            element.description.replaceAll("\n", "<br>")
          );
        }
      } else if (element.diceThrowText) {
        $(`#dice-text-${index}`).append(
          `<li class="small">${element.diceThrowText}</li>`
        );
      } else if (element.listItem) {
        $(`#list-item-${index}`).append(
          `<li class="small">${element.listItem}</li>`
        );
      }
    });
    if (otherDescription) {
      $(`#other-description-${index}`).html(otherDescription);
    }
  });
};

const renderMoves = (data) => {
  let isGameMaster =
    window.location.pathname == "/pages/admin/playgroup-characters.html";

  $("#move-output").html("");
  data.forEach((move, index) => {
    let checked = move.checkedQuantity ?? 0;
    checked = move.checkedQuantity
    if (move.activated) {
      let attribute = move.attribute ?? "";
      let activatedText = move.activated
        ? `<i class="bi bi-check2-circle"></i>`
        : `<i class="bi bi-x-circle"></i>`;
      let hasDescription = false;
      let hasOtherDescription = false;
      let description = "";
      let otherDescription = "";

      $("#move-output")
        .append(`<div class="card mx-4 mb-3 bg-dark text-success playgroup mb-5">
                <div class="card-header bg-transparent playgroup text-center">
                  <h5 class="m-0 light">
                    ${move.name} <span>${attribute}</span> <span>${activatedText}</span>
                  </h5>
                </div>
                <div class="card-body text-success">
                <div class="text-center" id="number-of-checkboxes-${index}">
                 </div>
                  <h6 class="card-title light small">
                    <small id="description-${index}"
                      ></small
                    >
                  </h6>
                </div>
                <div class="card-footer bg-transparent playgroup light" id="button-${index}">
                    <ul class="text-start small list-unstyled ms-3" id="dice-text-${index}">
                    </ul>
                    <ul class="text-start small" id="list-item-${index}">
                    </ul>
                     <ul class="text-start small list-unstyled ms-3" id="input-fields-list-${index}">
                    </ul>
                    <ul class="text-start small list-unstyled ms-3" id="other-description-${index}">
                    </ul>
                </div>
              </div>
    `);
      if (isGameMaster) {
        $("#button-" + index).append(`<div class="text-center">
      <button type="button" class="btn playgroup-button button-${index}" id="${move.moveNumber}">Ta bort</button>
      </div>`);
        $(".button-" + index).click(function (e) {
        
          let character = JSON.parse(sessionStorage.getItem("character"));
          let characterNumber = character.characterNumber;
          axios
            .post(deleteMove + characterNumber + "&moveNumber=" + e.target.id)
            .then((resp) => {
              swal("Manöver borttagen", resp.data, "success").then(() => {
                renderMovesPage();
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

      for (let i = 0; i < move.numberOfCheckboxes; i++) {
        
        $(`#number-of-checkboxes-${index}`).append(
          `<input class="checkbox-${i}" type="checkbox" name="checkbox-${
            i + 1
          }" id="checkbox-${index}-${i + 1}">`
        );
        if((i+1)<=move.checkedQuantity) {
          $(`#checkbox-${index}-${i + 1}`).prop("checked", true);
        } 
         $(`#checkbox-${index}-${i + 1}`).change(function (e) {
          
           if(this.checked) {
             checked += 1;
           } else {
             checked -=1;
           }
           axios.post(editCheck + checked + "&moveNumber=" + move.moveNumber)
           .then(resp => {
             console.log(resp.data);
           })
           .catch(err => {
             if(err.response) {
               swal("Ett fel uppstod", err.response.data.message, "error")
             } else {
               console.log(err);
             }
           });
         });
      }
     
      for (let i = 0; i < move.numberOfInputFields; i++) {
        $(`#input-fields-list-${index}`).append(
          `<li>
            <div class="input-group mb-3">
              <input type="text" class="form-control" aria-label="Domänens Gud" aria-describedby="save-input-text-${i}" id="input-text-${i}" value="${move.inputText[i] ?? ""}">
              <button class="btn playgroup-button save-text" type="button" id="${i}">Spara</button>
            </div>
        </li>`
        );
      }
      $(".save-text").click(function (e) {
        move.inputText[e.target.id] = $("#input-text-" + e.target.id).val();
        

        axios.post(addMoveInputText + move.moveNumber + "&inputText=" + move.inputText)
        .then(resp => {
          swal(
            "Sparat",
            "Texten har lagts till i " + resp.data.name,
            "success"
          );
        })
        .catch(err => {
          if(err.response) {
            swal("Ett fel uppstod!", err.response.data.message, "error")
          } else {
            console.log(err);
          }
        })
      });
      move.moveDescription.forEach((element) => {
        if (element.description) {
          if (hasDescription) {
            otherDescription += `<li class="small">${element.description.replaceAll(
              "\n",
              "<br>"
            )}</li>`;
            hasOtherDescription = true;
          } else {
            hasDescription = true;
            $(`#description-${index}`).html(
              element.description.replaceAll("\n", "<br>")
            );
          }
        } else if (element.diceThrowText) {
          $(`#dice-text-${index}`).append(
            `<li class="small">${element.diceThrowText}</li>`
          );
        } else if (element.listItem) {
          $(`#list-item-${index}`).append(
            `<li class="small">${element.listItem}</li>`
          );
        }
      });
      if (otherDescription) {
        $(`#other-description-${index}`).html(otherDescription);
      }
    }
  });
};
