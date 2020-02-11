class Renderer{

    generateMatrix(row, col, board){

        let numberOfCoins = 0
        let playerSizeRatio = 10/(parseInt(row)+parseInt(col))

        $('#board').empty()
        $('#board').css('grid-template-rows', `repeat(${row}, 1fr)`)
        $('#board').css('grid-template-columns', `repeat(${col}, 1fr)`)
        for (let r = 0; r < board.matrix.length; r++) {
            for (let c = 0; c < board.matrix[r].length; c++) {
                switch (board.matrix[r][c]) {
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
                            `<div class='path' style="font-size: ${3*playerSizeRatio}em">
                                <i class="fas fa-camera fa-grin-beam" style="color: green;"></i>
                            </div>`)
                        break;
                    case 2:
                        $('#board').append(
                            `<div class='path' style="font-size: ${3*playerSizeRatio}em">
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

        for (let i = 0; i < board.matrix.length; i++) {
            for (let j = 0; j < board.matrix[i].length; j++) {
                if(board.matrix[i][j] === 'c'){
                    numberOfCoins++
                }
            }
        }

        if (!numberOfCoins) {
            let player1 = board.player1.score 
            let player2 = board.player2.score 

            if(player1 == player2 ){
                $('#board').append(`
                    <div id="winDiv">
                        <h1 align="center" id="win">Draw</h1>
                        <h1 align="center" id="win">${player1} VS ${player2}</h1>
                    </div>
                    `)
                return
            }
            let winner = board.player1.score > board.player2.score ? 1 : 2 
            $('#board').append(`
                <div id="winDiv">
                    <h1 align="center" id="win">Player ${winner} WIN!!!</h1>
                    <h1 align="center" id="win">${player1} VS ${player2}</h1>
                </div>
                `)
        }
    }

    updateScore(player){
        $(`#player${player.id} > h3:nth-child(2)`).text(`Score: ${player.score}`)
    }

    addRemoveCompOptions(selection, playerId){
        let appendDiv
        let speedDiv
        if(playerId === 'dropDownPlayer1'){
            appendDiv = 'comp1-OptionsDiv'
            speedDiv = '1'
        }else{
            appendDiv = 'comp2-OptionsDiv'
            speedDiv = '2'
        }

        if(selection === 'computer'){
            $(`#${appendDiv}`).empty()
            $(`#${appendDiv}`).append(`
                <label for="speed${speedDiv}">Speed: </label>
                <select id="speed${speedDiv}">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
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

    countDown(k){
        $('#countDown').remove()
        if(k<3){
            $('#board').append(`<h1 id='countDown'>${(-k)+3}</h1>`)
        }
    }
}
    
