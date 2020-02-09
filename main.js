const Render = new Renderer()
let boardMatrixCopy  
let GoldRushBoard 
let player1 
let player2 
let boardMatrix 
let rowInput
let colInput
let movementFlag = false
let playerMoving 
let clearTimeoutArry =[]
let lastScore = 0
let defaultPlayer1 = 'computer'
let defaultPlayer2 = 'computer'

$("#dropDownPlayer1").on("change", function() {
    if (this.value != defaultPlayer1){
        defaultPlayer1 = this.value
        Render.addRemoveCompOptions(this.value, this.id)
    }
 })

 $("#dropDownPlayer2").on("change", function() {
    if (this.value != defaultPlayer2){
        defaultPlayer2 = this.value
        Render.addRemoveCompOptions(this.value, this.id)
    }
 })

$('#generateBoard').on('click', function () {
    
    rowInput = $('#rowInput').val()
    colInput = $('#colInput').val()
    $('matrixRow').val("")
    $('matrixCol').val("")

    GoldRushBoard = new GoldRush (rowInput, colInput)
    GoldRushBoard.generateBoard()
    movementFlag = true

    player1 = GoldRushBoard.player1
    player2 = GoldRushBoard.player2

    GoldRushBoard.alter(0,0,1)
    GoldRushBoard.alter(rowInput-1,colInput-1,2)
    boardMatrix = GoldRushBoard.matrix

    Render.generateMatrix(rowInput, colInput, boardMatrix)

    if (GoldRushBoard) {
        computer(GoldRushBoard, clearTimeoutArry)
    }
})

$(function(){
    $(document).on('keypress', function(e){
        if (e.which == 119 || e.which == 97 || e.which == 115 || e.which == 100) {
            playerMoving = player1
        } else {
            playerMoving = player2
        }

        if(movementFlag){
            switch (e.which) {
                case 119 : case 105:
                    GoldRushBoard.movePlayer(playerMoving,'up')
                    Render.generateMatrix(rowInput, colInput, boardMatrix)
                    Render.updateScore(playerMoving)
                    break;
                case 97 : case 106:
                    GoldRushBoard.movePlayer(playerMoving,'down')
                    Render.generateMatrix(rowInput, colInput, boardMatrix)
                    Render.updateScore(playerMoving)
                    break;
                case 115: case 107:
                    GoldRushBoard.movePlayer(playerMoving,'left')
                    Render.generateMatrix(rowInput, colInput, boardMatrix)
                    Render.updateScore(playerMoving)
                    break;
                case 100 : case 108:
                    GoldRushBoard.movePlayer(playerMoving,'right')
                    Render.generateMatrix(rowInput, colInput, boardMatrix)
                    Render.updateScore(playerMoving)
                    break;
            }

            if(GoldRushBoard.goldMap.length != 0 && GoldRushBoard.compPath.length === 0){
                computer(GoldRushBoard, clearTimeoutArry)
            }

            let lastCoinLocation = JSON.stringify(GoldRushBoard.player2.lastCoinLocation)
            let compClosestCoin = JSON.stringify(GoldRushBoard.compClosestCoin)
            let didPlayerTookCompCoin = Object.is(lastCoinLocation, compClosestCoin)

            if (didPlayerTookCompCoin){
                    clearTimeoutArry.forEach(setTimeoutMove => {
                        clearTimeout(setTimeoutMove)
                    })
                    clearTimeoutArry = []
                    closestCoin = computer(GoldRushBoard, clearTimeoutArry)
            }

        }
                   
    })

})

