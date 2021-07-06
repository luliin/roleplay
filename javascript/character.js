let character;
let changeAttribute;
let chosenMove;
$("#level-up-container").hide();

$(function () {
  $("#edit-info").hide()
  $("#edit-character-info").click(editInfo);
  $("#update-info").click(updateInfo)
  checkAvaliability();
  // renderCharacterInfo();
  $("#gain-xp").click(function () {
    gainXP();
  });
  $("#lose-xp").click(function () {
    loseXP();
  });

  $("#hp-minus").click(function () {
    loseHP();
  });
  $("#hp-plus").click(function () {
    gainHP();
  });
  $("#weak").change(function () {
    checkWeak(this.checked);
  });
  $("#shaky").change(function () {
    checkShaky(this.checked);
  });
  $("#sick").change(function () {
    checkSick(this.checked);
  });
  $("#stunned").change(function () {
    checkStunned(this.checked);
  });
  $("#confused").change(function () {
    checkConfused(this.checked);
  });
  $("#scarred").change(function () {
    checkScarred(this.checked);
  });
  $("#level-up").click(function () {
    $("#levelUpModal").modal("show");
  });

  $("#increase-attribute").click(function () {
    character = JSON.parse(sessionStorage.getItem("character"));
    if (
      character.strength >= 2 &&
      character.dexterity >= 2 &&
      character.constitution >= 2 &&
      character.intelligence >= 2 &&
      character.wisdom >= 2 &&
      character.charisma >= 2 &&
      character.maxAttribute
    ) {
      swal(
        "Dina stats är maximala!",
        "Du har nått den absoluta maxkraften och kan inte längre öka dina stats.",
        "info"
      );
    } else {
      $("#levelUpModal").modal("hide");
      chooseAttribute();
    }
  });

  $("#get-new-move").click(function () {
    $("#levelUpModal").modal("hide");
    levelUpCharacterMove();
    chooseMove();
  });

  $("#increase-strength").click(function () {
    levelUpCharacterStat("strength");
    // if(character.strength == 2) {

    //   if(character.savedLevel) {
    //     swal(
    //       "Vill du spara en level up?",
    //       "För att öka en egenskap till 3 behöver du använda två level up. Vill du fortsätta?",
    //       "info",
    //       {
    //         buttons: ["Avbryt", "Bekräfta"],
    //       }
    //     ).then(()=> {
    //       character.strength = 3;
    //       axios.post(levelUpStat + (character.level+7), character)
    //       .then(resp => {
    //         getCharacterFromServer(resp.data.characterNumber);
    //       })
    //       .catch(error => {
    //         swal("Ett fel uppstod", error.data.message, "error")
    //       })
    //     })

    //   }
    // }
  });
  $("#increase-dexterity").click(function () {
    levelUpCharacterStat("dexterity");
  });
  $("#increase-constitution").click(function () {
    levelUpCharacterStat("constitution");
  });
  $("#increase-intelligence").click(function () {
    levelUpCharacterStat("intelligence");
  });
  $("#increase-wisdom").click(function () {
    levelUpCharacterStat("wisdom");
  });
  $("#increase-charisma").click(function () {
    levelUpCharacterStat("charisma");
  });
});

const loadAboutPage = (currentCharacter) => {
  $("#about-title").text(`Om ${currentCharacter.name}`);
  if(currentCharacter.age) {
    $("#age-character").html(
      `${currentCharacter.age}`
    );
  } else {
    $("#age-character").html("Ej angett");
  }
  if (currentCharacter.title) {
    $("#title-character").html(`${currentCharacter.title}`);
  } else {
    $("#age-character").html("Ej angett");
  }
  if (currentCharacter.race) {
    $("#race-character").html(`${currentCharacter.race}`);
  } else {
    $("#origin-character").html("Ej angett");
  }
  if (currentCharacter.origin) {
    $("#origin-character").html(`${currentCharacter.origin}`);
  } else {
     $("#origin-character").html("Saknar information om ursprung.")
  }
  if (currentCharacter.name) {
    $("#name-character").html(`${currentCharacter.name}`);
  } else {
    $("#origin-character").html("Saknar information om namn.");
  }
  if (currentCharacter.background) {
    $("#about-character").html(
      `${currentCharacter.background.replaceAll("\n", "<br>")}`
    );
  } else {
    $("#about-character").html("Det finns ingen bakgrund sparad");
  }
  if (currentCharacter.milestones) {
    $("#character-milestones").html(
      `${currentCharacter.milestones.replaceAll("\n", "<br>")}`
    );
  } else {
    $("#character-milestones").html("Inga milstolpar sparade");
  }
};

function checkAvaliability() {
  character = JSON.parse(sessionStorage.getItem("character"));
  if (!character) {
    window.location.href = "playgroups.html";
  } else {
    getCharacterFromServer(character.characterNumber);
  }
}

function renderCharacterInfo(character) {
  loadAboutPage(character);
  if (character.level + 7 <= character.xp) {
    showLevelUpContainer();
  } else {
    hideLevelUpContainer();
  }
  let strength;
  let dexterity = getAttributeValue(character.dexterity);
  let constitution = getAttributeValue(character.constitution);
  let intelligence = getAttributeValue(character.intelligence);
  let wisdom = getAttributeValue(character.wisdom);
  let charisma = getAttributeValue(character.charisma);

  if (character.currentHP <= character.maxHP / 3) {
    $("#currentHP").css({ color: "darkred" });
  } else {
    $("#currentHP").css({ color: "black" });
  }

  $("#char-name").text(character.name);
  $("#name").text(character.name);
  $("#title").text(character.title);
  $("#level").text(character.level);
  $("#level-2").text(character.level);
  $("#xp").text(character.xp);
  $("#currentHP").text(character.currentHP);
  $("#maxHP").text(character.maxHP);
  $("#armor").text(character.armor);
  $("#damage").text("T" + character.damage);
  $("#strength").text(strength);
  $("#dexterity").text(dexterity);
  $("#constitution").text(constitution);
  $("#intelligence").text(intelligence);
  $("#wisdom").text(wisdom);
  $("#charisma").text(charisma);

  setAttributes(character.weak, $("#weak"), $("#strength"), character.strength);

  setAttributes(
    character.shaky,
    $("#shaky"),
    $("#dexterity"),
    character.dexterity
  );

  setAttributes(
    character.sick,
    $("#sick"),
    $("#constitution"),
    character.constitution
  );
  setAttributes(
    character.stunned,
    $("#stunned"),
    $("#intelligence"),
    character.intelligence
  );
  setAttributes(
    character.confused,
    $("#confused"),
    $("#wisdom"),
    character.wisdom
  );
  setAttributes(
    character.scarred,
    $("#scarred"),
    $("#charisma"),
    character.charisma
  );

  if (character.shaky) {
    $("#shaky").prop("checked", true);
  }
  if (character.sick) {
    $("#sick").prop("checked", true);
  }
  if (character.stunned) {
    $("#stunned").prop("checked", true);
  }
  if (character.confused) {
    $("#confused").prop("checked", true);
  }
  if (character.scarred) {
    $("#scarred").prop("checked", true);
  }
}

function getAttributeValue(characterAttribute) {
  let returnValue;
  if (characterAttribute) {
    returnValue =
      characterAttribute <= 0 ? characterAttribute : "+" + characterAttribute;
  } else {
    returnValue = characterAttribute;
  }
  return returnValue;
}

function getCharacterFromServer(characterNumber) {
  axios
    .get(getCharacter + characterNumber)
    .then((resp) => {
      if (resp.status == 200) {
        sessionStorage.setItem("character", JSON.stringify(resp.data));
        renderCharacterInfo(resp.data);
      } else {
      }
    })
    .catch((error) => {
      swal("Ett fel uppstod!", error.response.data.message, "warning");
    });
}

function gainXP() {
  let xp = +$("#xp").text();
  xp += 1;
  axios
    .post(plusXP + xp + "&characterNumber=" + character.characterNumber)
    .then((resp) => {
      getCharacterFromServer(resp.data.characterNumber);
    });
}

function loseXP() {
  let xp = +$("#xp").text();
  xp -= 1;
  if (xp >= 0) {
    axios
      .post(plusXP + xp + "&characterNumber=" + character.characterNumber)
      .then((resp) => {
        getCharacterFromServer(resp.data.characterNumber);
      });
  }
}

function loseHP() {
  let hp = +$("#currentHP").text();
  hp -= 1;
  if (hp >= 0) {
    axios
      .post(changeHP + hp + "&characterNumber=" + character.characterNumber)
      .then((resp) => {
        getCharacterFromServer(resp.data.characterNumber);
      });
  }
}

function gainHP() {
  let hp = +$("#currentHP").text();
  hp += 1;
  if (hp <= character.maxHP) {
    axios
      .post(changeHP + hp + "&characterNumber=" + character.characterNumber)
      .then((resp) => {
        getCharacterFromServer(resp.data.characterNumber);
      });
  }
}

function checkWeak(isChecked) {
  axios
    .post(
      changeWeak + isChecked + "&characterNumber=" + character.characterNumber
    )
    .then((resp) => {
      getCharacterFromServer(resp.data.characterNumber);
    });
}

function checkShaky(isChecked) {
  axios
    .post(
      changeShaky + isChecked + "&characterNumber=" + character.characterNumber
    )
    .then((resp) => {
      getCharacterFromServer(resp.data.characterNumber);
    });
}

function checkSick(isChecked) {
  axios
    .post(
      changeSick + isChecked + "&characterNumber=" + character.characterNumber
    )
    .then((resp) => {
      getCharacterFromServer(resp.data.characterNumber);
    });
}

function checkStunned(isChecked) {
  axios
    .post(
      changeStunned +
        isChecked +
        "&characterNumber=" +
        character.characterNumber
    )
    .then((resp) => {
      getCharacterFromServer(resp.data.characterNumber);
    });
}
function checkConfused(isChecked) {
  axios
    .post(
      changeConfused +
        isChecked +
        "&characterNumber=" +
        character.characterNumber
    )
    .then((resp) => {
      getCharacterFromServer(resp.data.characterNumber);
    });
}
function checkScarred(isChecked) {
  axios
    .post(
      changeScarred +
        isChecked +
        "&characterNumber=" +
        character.characterNumber
    )
    .then((resp) => {
      getCharacterFromServer(resp.data.characterNumber);
    });
}

function setAttributes(weakness, weaknessElement, attributeElement, attribute) {
  let number;
  if (weakness) {
    weaknessElement.prop("checked", true);
    number = getAttributeValue(attribute - 1);
    attributeElement.css({ color: "darkred" });
  } else {
    number = getAttributeValue(attribute);
    attributeElement.css({ color: "black" });
  }
  attributeElement.text(number);
}

const showLevelUpContainer = () => {
  $("#level-container").hide();
  $("#level-up-container").show();
};

const hideLevelUpContainer = () => {
  $("#level-container").show();
  $("#level-up-container").hide();
};

const chooseAttribute = () => {
  $("#increaseAttributeModal").modal("show");
};

const levelUpCharacterStat = (attribute) => {
let character= JSON.parse(sessionStorage.getItem("character"));
  if (character[attribute] == 2) {
    if (!character.savedLevel) {
      swal(
        "Vill du spara en level up?",
        "För att öka en egenskap till 3 behöver du använda två level up. Vill du fortsätta?",
        "info",
        {
          buttons: ["Avbryt", "Bekräfta"],
        }
      )
        .then(() => {
          character[attribute] = 3;
          axios
            .post(levelUpStat + (character.level + 7), character)
            .then((resp) => {
              $("#increaseAttributeModal").modal("hide");
              getCharacterFromServer(character.characterNumber);
            })
            .catch((error) => {
              if (error.response) {
                swal("Ett fel uppstod", error.response.data.message, "error");
              }
            });
        })
        .catch((error) => {
          swal("Ett fel uppstod!", "Det uppstod ett fel", "error");
        });
    } else {
      swal(
        "Öka till 3?",
        "Du får bara öka en grundegenskap till 3, är du säker på att du vill fortsätta?",
        "info",
        {
          buttons: ["Avbryt", "Bekräfta"],
        }
      )
        .then(() => {
          character[attribute] = 3;
          axios
            .post(levelUpStat + (character.level + 7), character)
            .then((resp) => {
              $("#increaseAttributeModal").modal("hide");
              getCharacterFromServer(character.characterNumber);
            })
            .catch((err) => {
              if (err.response) {
                swal("Ett fel uppstod", err.response.data.message, "error");
              }
            });
        })
        .catch((error) => {
          swal("Ett fel uppstod!", "Det uppstod ett fel", "error");
        });
    } 
}else {
      swal(
        "Är du säker?",
        "Detta kan inte ångras. Är du säker på att du vill öka denna egenskap?",
        "info",
        {
          buttons: ["Avbryt", "Bekräfta"],
        }
      ).then(()=> {
         character[attribute] +=1
         axios
            .post(levelUpStat + (character.level + 7), character)
            .then((resp) => {
              $("#increaseAttributeModal").modal("hide");
              getCharacterFromServer(character.characterNumber);
            })
            .catch((err) => {
              if (err.response) {
                swal("Ett fel uppstod", err.response.data.message, "error");
              }
            });
        })
        .catch((error) => {
          swal("Ett fel uppstod!", "Det uppstod ett fel", "error");
        });
   
  }
};

const chooseMove = () => {
  $("#getNewMove").modal("show");
};

const levelUpCharacterMove = () => {
  axios
    .get(getMovesFromCharacter + character.characterNumber)
    .then((resp) => {
      renderInactiveMoves(resp.data);
    })
    .catch((error) => {
      swal("Ett fel uppstod!", "" + error.data.message, "error");
    });
};

const renderInactiveMoves = (data) => {
  $("#new-move-output-2").html("");
  data.forEach((move, index) => {
    let attribute = move.attribute ?? "";
    let activatedText = move.activated
      ? `<i class="bi bi-check2-circle"></i>`
      : `<i class="bi bi-x-circle"></i>`;
    let hasDescription = false;
    let hasOtherDescription = false;
    let description = "";
    let otherDescription = "";
    if (!move.activated) {
      $("#new-move-output-2")
        .append(`<div class="card  mb-3 bg-dark text-success playgroup mb-5">
                <div class="card-header bg-transparent playgroup text-center">
                  <h5 class="m-0 light">
                    ${move.name} <span>${attribute}</span> <button type="button" id="${move.moveNumber}" class="btn playgroup-button ms-3 select-move">Välj</button>
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
                <div class="card-footer bg-transparent playgroup light">
                    <ul class="text-start small list-unstyled ms-3" id="dice-text-${index}">
                    </ul>
                    <ul class="text-start small" id="list-item-${index}">
                    </ul>
                    <ul class="text-start small list-unstyled ms-3" id="other-description-${index}">
                    </ul>
                </div>
              </div>
    `);
      for (let i = 0; i < move.numberOfCheckboxes; i++) {
        $(`#number-of-checkboxes-${index}`).append(
          `<input type="checkbox" name="checkbox-${
            i + 1
          }" id="checkbox-${index}-${i + 1}">`
        );
      }
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
    $(".select-move").on("click", function(e) {
      axios.post(levelUpMove + e.target.id + "&xp=" + (character.level+7), character)
      .then(resp => {
        $("#getNewMove").modal("hide");
        getCharacterFromServer(character.characterNumber);
        renderMovesPage();
      })
      .catch(err => {
        swal("Ett fel uppstod!", err.response.data.message, "error")
      })
    })
  });
};

const editInfo = () => {
  $("#show-info").hide()
  let character = JSON.parse(sessionStorage.getItem("character"));

$("#edit-name").val(character.name);
  $("#edit-age").val(character.age)
  $("#edit-race").val(character.race)
  $("#edit-origin").val(character.origin)
  $("#edit-background").val(character.background)
  $("#edit-milestones").val(character.milestones)
  $("#edit-title").val(character.title)
  $("#edit-info").show();
}

const updateInfo = () => {
  let newName = $("#edit-name").val();
  let newAge = $("#edit-age").val();
  let newRace = $("#edit-race").val();
  let newOrigin = $("#edit-origin").val();
  let newBackground = $("#edit-background").val();
  let newMilestones = $("#edit-milestones").val();
  let newTitle = $("#edit-title").val();
  if(newName) {
    character.name = newName;
  }
  if(newAge) {
    character.age = newAge;
  }
  if (newRace) {
    character.race = newRace;
  }
  if (newOrigin) {
    character.origin = newOrigin;
  }
  if (newBackground) {
    character.background = newBackground;
  }
  if (newMilestones) {
    character.milestones = newMilestones;
  }
   if (newTitle) {
     character.title = newTitle;
   }
  axios.post(updateInformation, character)
  .then(resp => {
    sessionStorage.setItem("character", JSON.stringify(resp.data))
    getCharacterFromServer(resp.data.characterNumber)
    loadAboutPage(resp.data)
  })
  .then(() => {
    $("#show-info").show();
    $("#edit-info").hide();
  })
  .catch(err => {
    console.log(err.response.data);
  })
 

}
