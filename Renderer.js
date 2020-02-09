class Renderer{

    generateMatrix(row, col, board){

        $('#board').empty()
        $('#board').css('grid-template-rows', `repeat(${row}, 1fr)`)
        $('#board').css('grid-template-columns', `repeat(${col}, 1fr)`)
        $(`#win`).text("")
        for (let r = 0; r < board.length; r++) {
            for (let c = 0; c < board[r].length; c++) {
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
                    case '.': 
                        $('#board').append(
                            `<div class='path' style="font-size: 0.5em">
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

    addRemoveCompOptions(selection, playerId){
        let appendDiv

        if(playerId === 'dropDownPlayer1'){
            appendDiv = 'comp1-OptionsDiv'
        }else{
            appendDiv = 'comp2-OptionsDiv'
        }

        if(selection === 'computer'){
            $(`#${appendDiv}`).empty()
            $(`#${appendDiv}`).append(`
                <label for="speed">Speed: </label>
                <select id="speed">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <label for="algorithm">Algorithm: </label>
                <select id="algorithm">
                    <option value="DFS">DFS</option>
                </select>`
            )
            return
        }
        if(playerId === 'dropDownPlayer1'){
            $('#comp1-OptionsDiv').empty()
            $('#comp1-OptionsDiv').append('<img id="theImg" src="pics/player1-keys.png" />')

            return
        }
        $('#comp2-OptionsDiv').empty()
        $('#comp2-OptionsDiv').append('<img id="theImg" src="pics/player2-keys.png" />')

    }
}
    
