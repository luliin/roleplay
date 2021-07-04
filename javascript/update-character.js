let inputName = $("#edit-char-name");
let changeName = $("#change-char-name");
let inputAge = $("#edit-char-age");
let changeAge = $("#change-char-age");
let inputTitle = $("#edit-char-title");
let changeTitle = $("#change-char-title");
let inputLevel = $("#edit-char-level");
let changeLevel = $("#change-char-level");
let inputStrength = $("#edit-char-strength");
let changeStrength = $("#change-char-strength");
let inputDexterity = $("#edit-char-dexterity");
let changeDexterity = $("#change-char-dexterity");
let inputConstitution = $("#edit-char-constitution");
let changeConstitution = $("#change-char-constitution");
let inputIntelligence = $("#edit-char-intelligence");
let changeIntelligence = $("#change-char-intelligence");
let inputWisdom = $("#edit-char-wisdom");
let changeWisdom = $("#change-char-wisdom");
let inputCharisma = $("#edit-char-charisma");
let changeCharisma = $("#change-char-charisma");
let inputDamage = $("#edit-char-damage");
let changeDamage = $("#change-char-damage");
let inputMaxHP = $("#edit-char-maxHP");
let changeMaxHP = $("#change-char-maxHP");
let inputArmor = $("#edit-char-armor");
let changeCurrentArmor = $("#change-char-armor");
let inputCarryingCapacity = $("#edit-char-carryingCapacity");
let changeCarryingCapacity = $("#change-char-carryingCapacity");
let selectSavedLevel = $("#edit-char-savedLevel");
let changeSavedLevel = $("#change-char-savedLevel");
let selectMaxAttribute = $("#edit-char-maxAttribute");
let changeMaxAttribute = $("#change-char-maxAttribute");


$(function(){
    loadPage()

    changeName.click(function(){
        let name = inputName.val();
        if(name) {
          updateCurrentCharacter("name", name)  
        } else {
            swal("Ogiltigt namn!", "Du måste ange ett namn", "error")
        } 
    })
    changeAge.click(function () {
      let age = inputAge.val();
      if (age) {
        updateCurrentCharacter("age", age);
      } else {
        swal("Ogiltig ålder!", "Du måste ange en ålder", "error");
      }
    });
    changeTitle.click(function () {
      let title = inputTitle.val();
      if (title) {
        updateCurrentCharacter("title", title);
      } else {
        swal("Ogiltig titel!", "Du måste ange en titel", "error");
      }
    });
    changeLevel.click(function () {
      let level = inputLevel.val();
      if (level) {
        updateCurrentCharacter("level", level);
      } else {
        swal("Ogiltig level!", "Du måste ange en level", "error");
      }
    });
    changeStrength.click(function () {
      let strength = inputStrength.val();
      if (strength) {
        updateCurrentCharacter("strength", strength);
      } else {
        swal("Ogiltig styrka!", "Du måste ange styrka", "error");
      }
    });
    changeDexterity.click(function () {
      let dexterity = inputDexterity.val();
      if (dexterity) {
        updateCurrentCharacter("dexterity", dexterity);
      } else {
        swal("Ogiltig smidighet!", "Du måste ange smidighet", "error");
      }
    });
    changeDexterity.click(function () {
      let dexterity = inputDexterity.val();
      if (dexterity) {
        updateCurrentCharacter("dexterity", dexterity);
      } else {
        swal("Ogiltig smidighet!", "Du måste ange smidighet", "error");
      }
    });
    changeConstitution.click(function () {
      let constitution = inputConstitution.val();
      if (constitution) {
        updateCurrentCharacter("constitution", constitution);
      } else {
        swal("Ogiltig fysik!", "Du måste ange fysik", "error");
      }
    });
    changeIntelligence.click(function () {
      let intelligence = inputIntelligence.val();
      if (intelligence) {
        updateCurrentCharacter("intelligence", intelligence);
      } else {
        swal("Ogiltig intelligens!", "Du måste ange intelligens", "error");
      }
    });
    changeWisdom.click(function () {
      let wisdom = inputWisdom.val();
      if (wisdom) {
        updateCurrentCharacter("wisdom", wisdom);
      } else {
        swal("Ogiltig visdom!", "Du måste ange visdom", "error");
      }
    });
    changeCharisma.click(function () {
      let charisma = inputCharisma.val();
      if (charisma) {
        updateCurrentCharacter("charisma", charisma);
      } else {
        swal("Ogiltig karisma!", "Du måste ange karisma", "error");
      }
    });
    changeDamage.click(function () {
      let damage = inputDamage.val();
      if (damage) {
        updateCurrentCharacter("damage", damage);
      } else {
        swal("Ogiltig skada!", "Du måste ange skada", "error");
      }
    });
    changeMaxHP.click(function () {
      let maxHP = inputMaxHP.val();
      if (maxHP) {
        updateCurrentCharacter("maxHP", maxHP);
      } else {
        swal("Ogiltig max-KP!", "Du måste ange max-KP", "error");
      }
    });
    changeCurrentArmor.click(function () {
      let armor = inputArmor.val();
      if (armor) {
        updateCurrentCharacter("armor", armor);
      } else {
        swal("Ogiltig rustning!", "Du måste ange rustning", "error");
      }
    });
    changeCarryingCapacity.click(function () {
      let carryingCapacity = inputCarryingCapacity.val();
      if (carryingCapacity) {
        updateCurrentCharacter("carryingCapacity", carryingCapacity);
      } else {
        swal("Ogiltig maxlast!", "Du måste ange maxlast", "error");
      }
    });
    changeSavedLevel.click(function() {
        let savedLevel = +selectSavedLevel.val()
        updateCurrentCharacter("savedLevel", savedLevel);
    }) 
    changeMaxAttribute.click(function () {
      let maxAttribute = +selectMaxAttribute.val();
      updateCurrentCharacter("maxAttribute", maxAttribute);
    }); 
})

const getCurrentCharacter = () => {
    return JSON.parse(sessionStorage.getItem("character"))
}


const loadPage = () => {
    let character = getCurrentCharacter();
    inputName.val(character.name)
    inputAge.val(character.age)
    inputTitle.val(character.title)
    inputLevel.val(character.level)
    inputStrength.val(character.strength)
    inputDexterity.val(character.dexterity)
    inputConstitution.val(character.constitution);
    inputIntelligence.val(character.intelligence)
    inputWisdom.val(character.wisdom)
    inputCharisma.val(character.charisma)
    inputDamage.val(character.damage)
    inputMaxHP.val(character.maxHP)
    inputArmor.val(character.armor)
    inputCarryingCapacity.val(character.carryingCapacity)
    if (!character.savedLevel) {
        selectSavedLevel.val("0");
    } else {
        selectSavedLevel.val("1");
    }
    if (!character.maxAttribute) {
      selectMaxAttribute.val("0");
    } else {
      selectMaxAttribute.val("1");
    }

}

const updateCurrentCharacter = (attribute, value) => {
    let character = getCurrentCharacter();
    character[attribute] = value;
    
    axios.post(updateCharacter, character)
    .then(resp => {
        swal("Hurra!", resp.data.name + " har uppdaterats!","success")
        sessionStorage.setItem("character", JSON.stringify(resp.data))
    })
    .then(()=> {
        loadPage()
        checkAvaliability()
    })
    .catch(err => {
        if(err.response) {
            swal("Ett fel uppstod", err.response.data.message, "error")
        } else {
            console.log(err);
        }
    })
}