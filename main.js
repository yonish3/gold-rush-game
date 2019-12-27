const Render = new Renderer()
let boardMatrixCopy  
let GoldRushBoard 
let player1 
let player2 
let boardMatrix 
let rowInput
let colInput
let movementFlag = true
let playerMoving 

$('#generateBoard').on('click', function () {
    
    rowInput = $('#rowInput').val()
    colInput = $('#colInput').val()
    $('matrixRow').val("")
    $('matrixCol').val("")

    let flag = null

    while (!flag) {
        GoldRushBoard = new GoldRush (rowInput, colInput)
        boardMatrixCopy = GoldRushBoard.randomGameGenerator()
        movementFlag = true

        boardMatrixCopy[0][0] = '.'
        boardMatrixCopy[rowInput-1][colInput-1] = '.'

        flag = GoldRushBoard.checkPath(0,0,rowInput-1, colInput-1, boardMatrixCopy)
    }

    player1 = GoldRushBoard.player1
    player2 = GoldRushBoard.player2

    GoldRushBoard.alter(0,0,1)
    GoldRushBoard.alter(rowInput-1,colInput-1,2)
    GoldRushBoard.print() 
    boardMatrix = GoldRushBoard.matrix

    Render.generateMatrix(rowInput, colInput, boardMatrix)
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
                    console.log('up');
                    GoldRushBoard.movePlayer(playerMoving,'up')
                    Render.generateMatrix(rowInput, colInput, boardMatrix)
                    Render.updateScore(playerMoving)
                    break;
                case 97 : case 106:
                    console.log('down');
                    GoldRushBoard.movePlayer(playerMoving,'down')
                    Render.generateMatrix(rowInput, colInput, boardMatrix)
                    Render.updateScore(playerMoving)
                    break;
                case 115: case 107:
                    console.log('left');
                    GoldRushBoard.movePlayer(playerMoving,'left')
                    Render.generateMatrix(rowInput, colInput, boardMatrix)
                    Render.updateScore(playerMoving)
                    break;
                case 100 : case 108:
                    console.log('right');
                    GoldRushBoard.movePlayer(playerMoving,'right')
                    Render.generateMatrix(rowInput, colInput, boardMatrix)
                    Render.updateScore(playerMoving)
                    break;
            }
        }

        if (GoldRushBoard){
            if (player1.score==10 || player2.score==10) {
                movementFlag = false
            }
        }
    })

})