const Render = new Renderer()
let boardMatrixCopy  
let GoldRushBoard 
let player1 
let player2 
let boardMatrix 


$('#generateBoard').on('click', function () {
    
    let rowInput = $('#rowInput').val()
    let colInput = $('#colInput').val()
    $('matrixRow').val("")
    $('matrixCol').val("")
    
    let flag = null

    while (!flag) {
        GoldRushBoard = new GoldRush (rowInput, colInput)
        boardMatrixCopy = GoldRushBoard.randomGameGenerator()

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
