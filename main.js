const Render = new Renderer()



// GoldRushMatrix.alter(0,0,'.')
// GoldRushMatrix.alter(4,4,'.')

//let  matrix = GoldRushMatrix.generateMatrix(5,5)

$('#generateBoard').on('click', function () {
    
    let rowInput = $('#rowInput').val()
    let colInput = $('#colInput').val()
    $('matrixRow').val("")
    $('matrixCol').val("")

    let GoldRushBoard = new GoldRush (rowInput, colInput)
    const player1 = GoldRushBoard.player1
    const player2 = GoldRushBoard.player2

    let boardMatrix = GoldRushBoard.randomGameGenerator()
    GoldRushBoard.alter(0,0,1)
    GoldRushBoard.alter(rowInput-1,colInput-1,2)
    GoldRushBoard.print() 

    Render.generateMatrix(rowInput, colInput, boardMatrix)
})
