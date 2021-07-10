// for localhost
// const startUrl = "http://localhost:8080";

// for heruko
const startUrl = "https://rollspel.herokuapp.com";

let validateLogin = `${startUrl}/api/v1/users/validate/`;
let getStepsOfUser = `${startUrl}/api/v1/users/get/one?email=`;
let addCharacter = `${startUrl}/api/v1/characters/add?email=`;
let totalStep = `${startUrl}/api/v1/users/get/all/steps?email=`;
let getAllUsers = `${startUrl}/api/v1/users/`;
let deleteUser = `${startUrl}/api/v1/users/delete`;
let updateUser = `${startUrl}/api/v1/users/update`;
let updateUserEmail = `${startUrl}/api/v1/users/update/email`;
let updatePassword = `${startUrl}/api/v1/users/update/password`;
let addAccount = `${startUrl}/api/v1/users/add`;
let userByEmail = `${startUrl}/api/v1/users/get?email=`;
let getUserPlaygroups = startUrl + "/api/v1/playgroups/get/player?email=";
let getCharacter = startUrl + "/api/v1/characters/get?characterNumber=";
let plusXP = startUrl + "/api/v1/characters/gainXP?xp=";
let changeHP = startUrl + "/api/v1/characters/changeHP?currentHP=";
let changeWeak = startUrl + "/api/v1/characters/changeWeak?weak=";
let changeShaky = startUrl + "/api/v1/characters/changeShaky?shaky=";
let changeSick = startUrl + "/api/v1/characters/changeSick?sick=";
let changeStunned = startUrl + "/api/v1/characters/changeStunned?stunned=";
let changeConfused = startUrl + "/api/v1/characters/changeConfused?confused=";
let changeScarred = startUrl + "/api/v1/characters/changeScarred?scarred=";
let addMoveToCharacter = startUrl + "/api/v1/moves/add?characterNumber=";
let getMovesFromCharacter = startUrl + "/api/v1/moves/?characterNumber=";
let activateMove = startUrl + "/api/v1/moves/make-available?characterNumber=";
let levelUpStat = startUrl + "/api/v1/characters/level-stat?xp=";
let levelUpMove = startUrl + "/api/v1/characters/level-move?moveNumber=";
let changeGear =
  startUrl + "/api/v1/characters/adventuring-gear?characterNumber=";
let addItem = startUrl + "/api/v1/characters/add-item?characterNumber=";
let updateItem = startUrl + "/api/v1/items/update";
let changeArmor = startUrl + "/api/v1/characters/change-armor?characterNumber=";
let updateInformation = startUrl + "/api/v1/characters/update-info";
let getPlaygroupFromCharacter =
  startUrl + "/api/v1/playgroups/get/character?characterNumber=";
let getPlaygroupsFromGameMaster =
  startUrl + "/api/v1/playgroups/get/game-master?email=";

let removeUserFromPlaygroup =
  startUrl + "/api/v1/playgroups/remove/user?playGroupName=";

let getPlaygroupFromName = startUrl + "/api/v1/playgroups/name?name=";

let removeCharacterFromPlaygroup =
  startUrl + "/api/v1/playgroups/remove/character?characterNumber=";

let addUserToPlaygroup =
  startUrl + "/api/v1/playgroups/add/user?playGroupName=";

let addCharacterToPlaygroup =
  startUrl +
  "/api/v1/playgroups/add/character?&playGroupName=";
let postPlaygroup =
  startUrl +
  "/api/v1/playgroups/add?gameMasterEmail=";
let removePlaygroup =
  startUrl +
  "/api/v1/playgroups/remove/playgroup?name=";
let deleteMove =
  startUrl + "/api/v1/moves/delete?characterNumber=";

let addMoveInputText = startUrl + "/api/v1/moves/input-text?moveNumber=";

let editCheck = startUrl + "/api/v1/moves/check?checkedNumber=";

let updateCharacter = startUrl + "/api/v1/characters/update-character"

let addNPC = startUrl + "/api/v1/playgroups/add-npc?name="
let removeNPC = startUrl + "/api/v1/playgroups/delete-npc?name="