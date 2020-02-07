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

const computer = function(GoldRushBoard, clearTimeoutArry){
    let rowM = GoldRushBoard.row +1
    let colM = GoldRushBoard.col +1
    let location = {row:GoldRushBoard.player1.row, col:GoldRushBoard.player1.col}
    let closestCoin = {}
    let path = GoldRushBoard.compPath = []
    clearTimeoutArry = []
    GoldRushBoard.goldMap = []
    let matrixCopy = copyMatrix(GoldRushBoard.matrix, GoldRushBoard.goldMap)
    if(GoldRushBoard.goldMap.length==0) return

    closestCoin = getClosestCoin(location, GoldRushBoard.goldMap)
    GoldRushBoard.compClosestCoin =  {row: closestCoin.row, col: closestCoin.col}

    GoldRushBoard.checkPath(location.row, location.col, closestCoin.row, closestCoin.col, matrixCopy)
    
    for (let i = 0; i < path.length-1; i++) {

        let k = i
        let OverLappingPlayersFlag = false

        let setTimeoutMove = setTimeout(function(){
    
            if(GoldRushBoard.matrix[path[k+1].row][path[k+1].col] === 2 ){
                clearTimeoutArry.forEach(setTimeoutMove => {
                    clearTimeout(setTimeoutMove)
                })
                OverLappingPlayersFlag = true
                // the for loop is staying in the memory?? needs to check that
                //i = path.length
            }

            if(!OverLappingPlayersFlag){
                if(GoldRushBoard.matrix[path[k+1].row][path[k+1].col]=='c'){
                    GoldRushBoard.player1.score ++
                    Render.updateScore(GoldRushBoard.player1)
                }

                GoldRushBoard.alter(path[k].row, path[k].col,'.')
                GoldRushBoard.alter(path[k+1].row, path[k+1].col, 1)
                Render.generateMatrix(rowM, colM, GoldRushBoard.matrix)

                GoldRushBoard.player1.row = path[k+1].row
                GoldRushBoard.player1.col = path[k+1].col
            }

            if(k == path.length-2 || OverLappingPlayersFlag){
                computer(GoldRushBoard, clearTimeoutArry)
            }

        }, 1000*(k+1))

        clearTimeoutArry.push(setTimeoutMove)

        location.row = path[i+1].row
        location.col = path[i+1].col
    }
}    


