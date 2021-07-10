let nameInput = $("#npc-name")
let titleInput = $("#npc-title")
let raceInput = $("#npc-race")
let ageInput = $("#npc-age")
let strengthInput = $("#npc-strength")
let dexterityInput = $("#npc-dexterity")
let constitutionInput = $("#npc-constitution")
let intelligenceInput = $("#npc-intelligence")
let wisdomInput = $("#npc-wisdom")
let charismaInput = $("#npc-charisma")
let armorInput = $("#npc-armor")
let damageInput = $("#npc-damage")
let carryingInput = $("#npc-carryingCapacity")
let maxHPInput = $("#npc-maxHP")
let originInput = $("#npc-origin")
let backgroundInput = $("#npc-background")
let milestonesInput = $("#npc-milestones")

$(function(){
    $("#save-npc").click(createNPCObject)
})

const createNPCObject = () => {
    let allInputs = true;
    let npc = {};
    
    let name = nameInput.val();
    if(name) {
        npc.name = name;
    } else {
        allInputs =false;
    }
    let title = titleInput.val();
    if(title) {
        npc.title = title;
    } else {
        allInputs =false;
    }
    let race = raceInput.val();
    if(race) {
        npc.race = race;
    } else {
        allInputs =false;
    }
    let age = ageInput.val();
    if(age) {
        npc.age = age;
    } else {
        allInputs =false;
    }
    let strength = strengthInput.val();
    if(strength) {
        npc.strength = strength;
    } else {
        allInputs =false;
    }
    let dexterity = dexterityInput.val();
    if(dexterity) {
        npc.dexterity= dexterity;
    } else {
        allInputs =false;
    }
    let constitution = constitutionInput.val();
    if (constitution) {
        npc.constitution = constitution;
    } else {
        allInputs =false;
    }
    let intelligence = intelligenceInput.val();
    if (intelligence) {
        npc.intelligence = intelligence;
    } else {
        allInputs =false;
    }
    let wisdom = wisdomInput.val();
    if (wisdom) {
        npc.wisdom = wisdom;
    } else {
        allInputs =false;
    } 
    let charisma = charismaInput.val();
    if (charisma) {
        npc.charisma = charisma;
    } else {
        allInputs =false;
    }
    let armor = armorInput.val();
    if (armor) {
        npc.armor = armor;
    } else {
        allInputs =false;
    }
    let damage = damageInput.val();
    if (damage) {
        npc.damage = damage;
    } else {
        allInputs =false;
    }
    let maxHP = maxHPInput.val();
    if(maxHP) {
        npc.maxHP = maxHP;
    } else {
        allInputs =false;
    }
    let carryingCapacity = carryingInput.val();
    if (carryingCapacity) {
        npc.carryingCapacity = carryingCapacity;
    } else {
        allInputs =false;
    }
    let origin = originInput.val();
    npc.origin = origin;
    
    let background = backgroundInput.val();
    npc.background = background;
    
    let milestones = milestonesInput.val();
    npc.milestones = milestones;
    npc.savedLevel = false;
    if(strength === 3 || dexterity === 3 || constitution === 3 || intelligence === 3 || wisdom === 3 || charisma === 3) {
        npc.maxAttribute = true;
    } else {
        npc.maxAttribute = false;
    }
    
    if(allInputs) {
       let playgroup = JSON.parse(sessionStorage.getItem("chosenPlaygroup"))
       let playgroupName = playgroup.name;
       axios.post(addNPC + playgroupName, npc)
       .then(response => {
           sessionStorage.setItem("chosenPlaygroup", JSON.stringify(response.data));
           
       })
       .then(() => {
           swal("NPC:n sparad", npc.name + " har lagts till som NPC i " + playgroupName + "!", "success")
           .then(() => {
            checkAvaliability()
            loadGearPage();
            loadAllCharactersPage();
           })
           .then(() => {
               $("#all-tab").tab("show");
           })
       })
       .catch(error => {
           if(error.response) {
               swal("Ett fel uppstod", error.response.data.message, "error")
           } else {
               console.log(error);
           }
       })
    } else {
        swal("Ogiltig NPC!", "Du måste fylla i alla fält!", "error")
    }
}