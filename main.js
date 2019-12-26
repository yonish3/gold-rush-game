const Render = new Renderer()
let boardMatrixCopy  
let GoldRushBoard 
let player1 
let player2 
let boardMatrix 
let rowInput
let colInpu

$('#generateBoard').on('click', function () {
    
    rowInput = $('#rowInput').val()
    colInput = $('#colInput').val()
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

// $(function(){
//     $(document).on('keypress', function(e){
//             console.log(e.which)

//     });
// });

$(function(){
    $(document).on('keypress', function(e){
        switch (e.which) {
            case 119:
                console.log('up');
                GoldRushBoard.movePlayer(player1,'up')
                Render.generateMatrix(rowInput, colInput, boardMatrix)

                break;
            case 97:
                console.log('down');
                GoldRushBoard.movePlayer(player1,'down')
                Render.generateMatrix(rowInput, colInput, boardMatrix)

                break;
            case 115:
                console.log('left');
                GoldRushBoard.movePlayer(player1,'left')
                Render.generateMatrix(rowInput, colInput, boardMatrix)

                break;
            case 100:
                console.log('right');
                GoldRushBoard.movePlayer(player1,'right')
                Render.generateMatrix(rowInput, colInput, boardMatrix)

                break;
        }
    })

})