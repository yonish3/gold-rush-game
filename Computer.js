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

const computer = function(GoldRushBoard){
    let rowM = GoldRushBoard.row +1
    let colM = GoldRushBoard.col +1
    let location = {row:0,col:0}
    let flag = true
    let closestCoin = {}
    
    GoldRushBoard.goldMap = []
    
    let matrixCopy = copyMatrix(GoldRushBoard.matrix, GoldRushBoard.goldMap)
    let round  = 0

    while (flag) {
        let dummyMap = []
        matrixCopy = copyMatrix(GoldRushBoard.matrix, dummyMap)
        let path = [...GoldRushBoard.compPath]
        GoldRushBoard.compPath = []
        closestCoin = getClosestCoin(location, GoldRushBoard.goldMap)

        GoldRushBoard.checkPath(location.row, location.col, closestCoin.row, closestCoin.col, matrixCopy)
        path = [...GoldRushBoard.compPath]
        
        for (let i = 0; i < path.length-1; i++) {
            let r = ++round 
            console.log('r', r)
            let k = i;
            setTimeout(function(){
                console.log('count ', k);
        
                GoldRushBoard.alter(path[k].row, path[k].col,'.')
                GoldRushBoard.alter(path[k+1].row, path[k+1].col, 1)

                Render.generateMatrix(rowM, colM, GoldRushBoard.matrix)

            }, 1000*r  )

            // matrixCopy[path[i].row][path[i].col] = '.'
            // matrixCopy[path[i+1].row][path[i+1].col] = 1

            location.row = path[i+1].row
            location.col = path[i+1].col
        }

        GoldRushBoard.goldMap.splice(closestCoin.goldIndex,1)
        if(GoldRushBoard.goldMap.length == 0){

            flag = false
        }
     }    
}

