class Renderer{

    generateMatrix(row, col, board){
             
        $('#board').empty()

        $('#board').css('grid-template-rows', `repeat(${row}, 1fr)`)
        $('#board').css('grid-template-columns', `repeat(${col}, 1fr)`)
        $(`#win`).text("")
        for (let r = 0; r < row; r++) {
            for (let c = 0; c < col; c++) {
                switch (board[r][c]) {
                    case 'b':
                        $('#board').append(`<div class='brick'></div>`)
                        break;
                    case 'c':
                        $('#board').append(
                            `<div class='path' style="font-size: 1em">
                                <i class="fas fa-coins" style="color: gold;"></i>
                            </div>`)
                        break;
                    case 1:
                        $('#board').append(
                            `<div class='path' style="font-size: 3em">
                                <i class="fas fa-camera fa-grin-beam" style="color: green;"></i>
                            </div>`)
                        break;
                    case 2:
                        $('#board').append(
                            `<div class='path' style="font-size: 3em">
                                <i class="fas fa-camera fa-grin-beam" style="color: blue;"></i>
                            </div>`)
                        break;
                    default:
                        $('#board').append(
                            `<div class='path' style="font-size: 1em">
                                <i class="fas fa-circle" style="color: black;"></i>
                            </div>`)
                        break
                }
            }
        }
    }

    updateScore(player){
        $(`#player${player.id} > h3:nth-child(2)`).text(`Score: ${player.score}`)
        if (player.score == 10) {
            $(`#win`).text(`Player ${player.id} WIN!!!`)
            $(`#win`).css(`background-color`, `lightseagreen`)
            
        }
    }
}
    
