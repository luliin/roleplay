let $playgroupOutput = $("#playgroup-output");
let playgroups;
$(function () {
  loadPage();
});

const loadPage = () => {
  checkIfLoggedIn();
  playgroups = JSON.parse(sessionStorage.getItem("gameMasteredGroups"));
  renderPlaygroupPage(playgroups);
};

const renderPlaygroupPage = (data) => {
  $playgroupOutput.html("");
  data.forEach((element, index) => {
    $playgroupOutput.append(`<div class="col text-center"><div class="card  mx-4 mb-3 bg-dark text-success playgroup mb-5" style="">
        <div class="card-header bg-transparent playgroup light ">
        <div class="row">
        <div class="col-2"></div>
        <div class="col-8 px-0 "><h5 class="m-0">${element.name}</h5></div>
        <div class="col-2"><i class="bi bi-trash-fill remove-group info" id="${index}"></i></div>
        </div></div>
        <div class="card-body text-success">
        </div>
        <div class="card-footer bg-transparent playgroup">
            <button class="btn  playgroup-button choose-group" id="${index}" style="width: 40%">
                Välj
            </button>

        </div>
    </div>
    </div>`);
  });
  $(".choose-group").click(function (e) {
    getPlaygroupFromServer(e.target.id);
  });
  $(".remove-group").click(function (e) {
    removeGroup(e.target.id);
  });
};

const getPlaygroupFromServer = (name) => {
  sessionStorage.setItem("chosenPlaygroup", JSON.stringify(playgroups[name]));
  window.location.href = "playgroup.html";
};

const removeGroup = (name) => {
  let groupToRemove = playgroups[name].name;
  let user = JSON.parse(sessionStorage.getItem("user"));
  console.log(groupToRemove);
  swal(
    "Är du säker?",
    "Vill du verkligen ta bort\n" + groupToRemove + "?",
    "info",
    {
      buttons: ["Avbryt", "Bekräfta"],
    }
  ).then((resp) => {
    if (resp) {
      axios
        .post(
          removePlaygroup + groupToRemove + "&gameMasterEmail=" + user.email
        )
        .then((resp) => {
          checkIfLoggedIn();
          swal("Spelgruppen borttagen!", resp.data, "success").then(() => {
            loadPage();
          });
        })
        .catch((err) => {
          if (err.response) {
            swal("Ett fel uppstod", err.response.data.message, "error");
          } else {
            console.log(err);
          }
        });
    }
  });
};

const loadGroupPage = () => {
  playerOutput.html("");
  let currentPlaygroup = JSON.parse(sessionStorage.getItem("chosenPlaygroup"));
  console.log(currentPlaygroup);
};
