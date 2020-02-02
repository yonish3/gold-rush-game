const copyMatrix = function(matrix){
    let matrixCopy = []
        
    for (let r = 0; r < matrix.length; r++) {
        matrixCopy.push([])
        for (let c = 0; c < matrix[r].length; c++) {
            matrixCopy[r].push(matrix[r][c])
        }
    }
    return matrixCopy
}

const copyPath = function(matrixCopy, pathArray){
    for (let i = 0; i <= pathArray.length-1; i++) {
        let row = pathArray[i].row
        let col = pathArray[i].col
        matrixCopy[row][col] = '$'

    }
}




const computer = function (rowS, colS, rowM, colM, GoldRushBoard, matrixCopy, counter, updatePath){

    if (GoldRushBoard.player1.score == 10 || GoldRushBoard.player2.score == 10) return
  
    
    setTimeout(function(){ 
    
    updatePath[counter] = GoldRushBoard.compPath[counter]
    updatePath[counter+1] = GoldRushBoard.compPath[counter+1]

    matrixCopy = copyMatrix(GoldRushBoard.matrix)
    copyPath(matrixCopy, updatePath)
        
    row = updatePath[counter].row
    col = updatePath[counter].col
    GoldRushBoard.alter(row,col,'.')

    nextRow = updatePath[counter+1].row
    nextCol = updatePath[counter+1].col
    GoldRushBoard.alter(nextRow, nextCol, 1)

    Render.generateMatrix(rowM, colM, GoldRushBoard.matrix)


    //GoldRushBoard.compPath.splice(updatePath.length, updatePath.length - 1)
    //updatePath.splice(counter+1, updatePath.length - 1)
    counter++
    
    GoldRushBoard.compPath=[]
    GoldRushBoard.checkPath(nextRow,nextCol,rowM-1, colM-1, matrixCopy)

    
    computer(nextRow, nextCol, rowM, colM, GoldRushBoard, matrixCopy, counter)

    
    }, 1000)

}

