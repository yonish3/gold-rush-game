const copyMatrix = function(matrix, pathSoFar, goldMap){
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

    // for (let i = 0; i < pathSoFar.length; i++) {
    //     matrixCopy[pathSoFar[i].row][pathSoFar[i].col] = '$'
    // }

    return matrixCopy
}

// getNextCoin = function (goldMap, coinIndex) {  
//     for (let i = coinIndex ; coinIndex < goldMap.length; i++) {
//         if 
        
//     }
// }




const computer = function(GoldRushBoard){
    let rowM = GoldRushBoard.row
    let colM = GoldRushBoard.col
    let pathSoFar = [{row:0,col:0}]
    let goldMap = []
    let flag = true
    
    while (flag) {
        let matrixCopy = copyMatrix(GoldRushBoard.matrix, pathSoFar, goldMap)
        let path = [...GoldRushBoard.compPath]
        GoldRushBoard.compPath = []
//need to start us the gold map
//GoldRushBoard.checkPath(path[1].row, path[1].col, rowM, colM, matrixCopy)

        GoldRushBoard.checkPath(path[0].row, path[0].col, goldMap[0].row, goldMap[0].col, matrixCopy)
        path = [...GoldRushBoard.compPath]

        GoldRushBoard.alter(path[0].row, path[0].col,'.')
        GoldRushBoard.alter(path[1].row, path[1].col, 1)
        
        GoldRushBoard.compPath.splice(0,1)
        goldMap.splice(0,1)

        Render.generateMatrix(5, 5, GoldRushBoard.matrix)

        pathSoFar.push({
            row: path[1].row, 
            col: path[1].col
        })
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

