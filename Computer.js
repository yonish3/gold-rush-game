const copyMatrix = function(matrix, pathSoFar, goldMap){
    let matrixCopy = []
    //goldMap = []
    
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
    let distance
    let goldIndex
    let closestCoin = goldMap[0]
    closestCoin.distance = Math.abs(goldMap[0].row - location.row) + Math.abs(goldMap[0].col - location.col)

    for (let i = 0; i < goldMap.length; i++) {
        goldMap[i].distance = Math.abs(goldMap[i].row - location.row) + Math.abs(goldMap[i].col - location.col)     

        if (goldMap[i].distance < closestCoin.distance){
            closestCoin = goldMap[i]
            closestCoin.goldIndex = i
        }
        // if (!closestCoin){
        //     closestCoin = goldMap[i]
        // }   
    }
    return closestCoin
}

const computer = function(GoldRushBoard){
    let rowM = GoldRushBoard.row +1
    let colM = GoldRushBoard.col +1
    let pathSoFar = [{row:0,col:0}]
    let goldMap = []
    let location = {row:0,col:0}
    let flag = true
    let closestCoin = {}
    
    while (flag) {
        goldMap = []
        let matrixCopy = copyMatrix(GoldRushBoard.matrix, pathSoFar, goldMap)
        let path = [...GoldRushBoard.compPath]
        GoldRushBoard.compPath = []
        closestCoin = getClosestCoin(location, goldMap)

        GoldRushBoard.checkPath(location.row, location.col, closestCoin.row, closestCoin.col, matrixCopy)
        path = [...GoldRushBoard.compPath]
        
        for (let i = 0; i < path.length-1; i++) {
            
            GoldRushBoard.alter(path[i].row, path[i].col,'.')
            GoldRushBoard.alter(path[i+1].row, path[i+1].col, 1)

            Render.generateMatrix(rowM, colM, GoldRushBoard.matrix)

            location.row = path[i+1].row
            location.col = path[i+1].col
        }
        //goldMap.splice(closestCoin.goldIndex,1)
        

        // pathSoFar.push({
        //     row: path[1].row, 
        //     col: path[1].col
        // })
     }    
}



// const copyPath = function(matrixCopy, pathArray){
//     for (let i = 0; i <= pathArray.length-1; i++) {
//         let row = pathArray[i].row
//         let col = pathArray[i].col
//         matrixCopy[row][col] = '$'

//     }
// }

// const computer = function (rowS, colS, rowM, colM, GoldRushBoard, matrixCopy, counter, updatePath){

//     if (GoldRushBoard.player1.score == 10 || GoldRushBoard.player2.score == 10) return
  
    
//     setTimeout(function(){ 
    
//     updatePath[counter] = GoldRushBoard.compPath[counter]
//     updatePath[counter+1] = GoldRushBoard.compPath[counter+1]

//     matrixCopy = copyMatrix(GoldRushBoard.matrix)
//     copyPath(matrixCopy, updatePath)
        
//     row = updatePath[counter].row
//     col = updatePath[counter].col
//     GoldRushBoard.alter(row,col,'.')

//     nextRow = updatePath[counter+1].row
//     nextCol = updatePath[counter+1].col
//     GoldRushBoard.alter(nextRow, nextCol, 1)

//     Render.generateMatrix(rowM, colM, GoldRushBoard.matrix)


//     //GoldRushBoard.compPath.splice(updatePath.length, updatePath.length - 1)
//     //updatePath.splice(counter+1, updatePath.length - 1)
//     counter++
    
//     GoldRushBoard.compPath=[]
//     GoldRushBoard.checkPath(nextRow,nextCol,rowM-1, colM-1, matrixCopy)

    
//     computer(nextRow, nextCol, rowM, colM, GoldRushBoard, matrixCopy, counter)

    
//     }, 1000)

// }

