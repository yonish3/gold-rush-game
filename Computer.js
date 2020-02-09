const copyMatrix = function(matrix, goldMap){
    let matrixCopy = []

    for (let r = 0; r < matrix.length; r++) {
        matrixCopy.push([])
        for (let c = 0; c < matrix[r].length; c++) {
            matrixCopy[r].push(matrix[r][c])
            if (matrix[r][c] == 'c') {
                goldMap.push({
                    row: r,
                    col: c
                })
            }
        }
    }
    return matrixCopy
}

const getClosestCoin = function (location, goldMap) {
    let closestCoin = goldMap[0]
    closestCoin.distance = Math.abs(goldMap[0].row - location.row) + Math.abs(goldMap[0].col - location.col)

    for (let i = 0; i < goldMap.length; i++) {
        goldMap[i].distance = Math.abs(goldMap[i].row - location.row) + Math.abs(goldMap[i].col - location.col)     

        if (goldMap[i].distance < closestCoin.distance){
            closestCoin = goldMap[i]
            closestCoin.goldIndex = i
        }
    }
    return closestCoin
}

const computer = function(GoldRushBoard, clearTimeoutArry, player){
    let rowM = GoldRushBoard.row +1
    let colM = GoldRushBoard.col +1
    let location = {row:player.row, col:player.col}
    let closestCoin = {}
    let path = GoldRushBoard.compPath = []
    clearTimeoutArry = []
    GoldRushBoard.goldMap = []
    let matrixCopy = copyMatrix(GoldRushBoard.matrix, GoldRushBoard.goldMap)

    if(GoldRushBoard.goldMap.length==0) return

    closestCoin = getClosestCoin(location, GoldRushBoard.goldMap)
    player.compClosestCoin =  {row: closestCoin.row, col: closestCoin.col}

    GoldRushBoard.checkPath(location.row, location.col, closestCoin.row, closestCoin.col, matrixCopy, player.id)
    

    for (let i = 0; i < path.length-1; i++) {

        let k = i

        let setTimeoutMove = setTimeout(function(){

            let OverLappingPlayersFlag = false

            if(GoldRushBoard.matrix[path[k+1].row][path[k+1].col] === (player.id == 1 ? 2 : 1) ){
                OverLappingPlayersFlag = true
                i = path.length
                clearTimeoutArry.forEach(setTimeoutMove => {
                    clearTimeout(setTimeoutMove)
                })
            }

            if(!OverLappingPlayersFlag){
                if(GoldRushBoard.matrix[path[k+1].row][path[k+1].col]=='c'){
                    player.score ++
                    Render.updateScore(player)
                }

                GoldRushBoard.alter(path[k].row, path[k].col,'.')
                GoldRushBoard.alter(path[k+1].row, path[k+1].col, player.id)
                Render.generateMatrix(rowM, colM, GoldRushBoard.matrix)

                player.row = path[k+1].row
                player.col = path[k+1].col
            }

            if(k == path.length-2 || OverLappingPlayersFlag){
                computer(GoldRushBoard, clearTimeoutArry, player)
            }

        }, 1000*(k+1))

        clearTimeoutArry.push(setTimeoutMove)

        location.row = path[i+1].row
        location.col = path[i+1].col
    }
}    


