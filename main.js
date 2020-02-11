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
let lastScore = 0
let defaultPlayer1 = 'computer'
let defaultPlayer2 = 'computer'
let player1Type 
let player2Type 

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
    movementFlag = false

    if(GoldRushBoard){
        GoldRushBoard.player1.clearTimeoutArry.forEach(setTimeoutMove => {
            clearTimeout(setTimeoutMove)
        })
        GoldRushBoard.player2.clearTimeoutArry.forEach(setTimeoutMove => {
            clearTimeout(setTimeoutMove)
        })
    }

    player1Type = $('#dropDownPlayer1').val()
    player2Type = $('#dropDownPlayer2').val()

    rowInput = $('#rowInput').val()
    colInput = $('#colInput').val()
    $('matrixRow').val("")
    $('matrixCol').val("")

    if (rowInput == "" || colInput == "") {
        alert('Row and Col must have number value bigger then 0')
        return
    }

    GoldRushBoard = new GoldRush (rowInput, colInput)
    GoldRushBoard.checkPathForAllCoins()
    
    player1 = GoldRushBoard.player1
    player2 = GoldRushBoard.player2

    player1.compSpeed = $('#speed1').val()
    player2.compSpeed = $('#speed2').val()

    GoldRushBoard.alter(0,0,1)
    GoldRushBoard.alter(rowInput-1,colInput-1,2)
    boardMatrix = GoldRushBoard.matrix

    Render.generateMatrix(rowInput, colInput, GoldRushBoard)

    for (let i = 0; i < 4; i++) {
        let k = i
        setTimeout(function(){
             
                Render.countDown(k)
                if (k == 3){
                    if(player1Type === 'computer'){
                        player1.isComp = true
                        computer(GoldRushBoard, player1.clearTimeoutArry, player1)
                    }
                    if(player2Type === 'computer'){
                        player2.isComp = true
                        computer(GoldRushBoard, player2.clearTimeoutArry, player2)
                    }
                movementFlag = true
            }
        }, 1000*(k+1))
    }

    
   
    
})

$(function(){
    $(document).on('keypress', function(e){
        if (e.which == 119 || e.which == 97 || e.which == 115 || e.which == 100) {
            playerMoving = player1
            if(player1.isComp) e.which = false
        } else {
            playerMoving = player2
            if(player2.isComp) e.which = false
        }

        if(movementFlag){
            switch (e.which) {
                case 119 : case 105:
                    GoldRushBoard.movePlayer(playerMoving,'up')
                    Render.generateMatrix(rowInput, colInput, GoldRushBoard)
                    Render.updateScore(playerMoving)
                    break;
                case 97 : case 106:
                    GoldRushBoard.movePlayer(playerMoving,'down')
                    Render.generateMatrix(rowInput, colInput, GoldRushBoard)
                    Render.updateScore(playerMoving)
                    break;
                case 115: case 107:
                    GoldRushBoard.movePlayer(playerMoving,'left')
                    Render.generateMatrix(rowInput, colInput, GoldRushBoard)
                    Render.updateScore(playerMoving)
                    break;
                case 100 : case 108:
                    GoldRushBoard.movePlayer(playerMoving,'right')
                    Render.generateMatrix(rowInput, colInput, GoldRushBoard)
                    Render.updateScore(playerMoving)
                    break;
            }

            if(player1Type === 'computer'){
                if(GoldRushBoard.goldMap.length != 0 && GoldRushBoard.player1.compPath.length === 0){
                    computer(GoldRushBoard, player1.clearTimeoutArry, player1)
                }
            }

            if(player2Type === 'computer'){
                if(GoldRushBoard.goldMap.length != 0 && GoldRushBoard.player2.compPath.length === 0){
                    computer(GoldRushBoard, player2.clearTimeoutArry, player2)
                }
            }

            if(player1.isComp){
                GoldRushBoard.didPlayerTookMyCoin(player2, player1)
            }

            if(player2.isComp){
                GoldRushBoard.didPlayerTookMyCoin(player1, player2)
            }
            
        }
                   
    })

})

