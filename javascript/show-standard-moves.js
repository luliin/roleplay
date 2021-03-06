$(function(){
    loadStandardMoves();
})
const loadStandardMoves = () => {

    axios.get(standardMoves)
    .then(response => {
        renderStandardMoves(response.data)
    })

}

const renderStandardMoves = (data) => {
    $("#standard-move-output").html("")

    data.forEach((move, index) => {
console.log(move);

        let descriptionList = move.moveDescription.filter(element => {
            if(element.description) {
                return element;
            }
        })
        let diceThrowList = move.moveDescription.filter((element) => {
          if (element.diceThrowText) {
            return element;
          }
        });
        let listItemList = move.moveDescription.filter((element) => {
          if (element.listItem) {
            return element;
          }
        });
        $("#standard-move-output").append(
          `<div class="card mx-4 mb-3 bg-dark text-success playgroup mb-5">
                <div class="card-header bg-transparent playgroup text-center">
                  <h5 class="m-0 light">
                    ${move.name}
                  </h5>
                </div>
                <div class="card-body text-success">
                <div class="text-center" id="s-number-of-checkboxes-${index}">
                 </div>
                  <h6 class="card-title light small">
                    <small id="s-description-${index}"
                      ></small
                    >
                  </h6>
                </div>
                <div class="card-footer bg-transparent playgroup light" id="s-button-${index}">
                    <ul class="text-start small list-unstyled ms-3" id="s-dice-text-${index}">
                    </ul>
                    <ul class="text-start small" id="s-list-item-${index}">
                    </ul>
                    <ul class="text-start small list-unstyled ms-3" id="s-other-description-${index}">
                    </ul>
                </div>
              </div>`
        );

        if(descriptionList.length>0) {
            $("#s-description-" + index).html(descriptionList[0].description.replaceAll("\n", "<br>"))
            for(let i=1; i<descriptionList.length; i++) {
                $("#s-other-description-"+ index).append(`<li class="small">${descriptionList[i].description}</li>`
                );
            }
        }

        if(diceThrowList.length>0) {
            $("#s-dice-text-" +index).html("");
            for (let i = 0; i < diceThrowList.length; i++) {
              $("#s-dice-text-" + index).append(
                `<li class="small"><small>${diceThrowList[i].diceThrowText}</small></li>`
              );
            }
        }

        if (listItemList.length > 0) {
          $("#s-list-item-" + index).html("");
          for (let i = 0; i < listItemList.length; i++) {
            $("#s-list-item-" + index).append(
              `<li class="small"><small>${listItemList[i].listItem}</small></li>`
            );
          }
        }

        
    });
}
