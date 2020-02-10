class GoldRush extends Matrix{
    
    constructor(row,col){
        super (row,col)
        this.row = row-1
        this.col = col-1
        this.matrixCopy = []
        this.goldMap = []
   
        this.player1 = {
            id: 1,
            row: 0,
            col: 0,
            score: 0,
            lastCoinLocation: null,
            compClosestCoin : {},
            compPath : [],
            isComp : null,
            clearTimeoutArry : [],
            compSpeed: 0

        }
        this.player2 = {
            id: 2,
            row: row-1,
            col: col-1,
            score: 0,
            lastCoinLocation: null,
            compClosestCoin : {},
            compPath : [],
            isComp : null,
            clearTimeoutArry : [],
            compSpeed: 0
        }
    }

    checkPositionNote(key){
        switch (key) {
            case 'b':  
                return true;
            case '$':  
                return true;
            case 1:  
                return true;
            case 2:  
                return true;
            default:
                return false;
        }

    }
    
    checkMovement(player,direction){

        let row = player.row
        let col = player.col

        switch (direction) {
            case 'up':
                return row == 0 || this.checkPositionNote(this.matrix[row-1][col]) ? false : true 

            case 'down':
               return row == this.row || this.checkPositionNote(this.matrix[row+1][col]) ? false : true 

            case 'right':
                return col == this.col || this.checkPositionNote(this.matrix[row][col+1]) ? false : true 

            case 'left':
                return col == 0 || this.checkPositionNote(this.matrix[row][col-1]) ? false : true 
                
            default:
                break;
        }
    }

    movePlayer(player,direction){

        if(this.checkMovement(player,direction)){

            let row = player.row
            let col = player.col

            this.alter(row, col, '.')

            switch (direction) {
                case 'up':
                    row--
                    break;
                case 'down':
                    row++
                    break;
                case 'right':
                    col++
                    break;
                case 'left':
                    col--
                    break;
                default:
                    break;
            }

            player.row = row
            player.col = col
            if (this.matrix[row][col] == 'c') {
                player.score++
                player.lastCoinLocation = {
                    row: row,
                    col:col
                }
                console.log('player.lastCoinLocation ', player.lastCoinLocation )
            }
            
            this.alter(row,col,player.id)
            return true 
        }
        else{
            return false
        }
    }

    randomGameGenerator(){
        this.matrix =this.generateMatrix(this.row+1, this.col+1)
        this.matrixCopy =[]
        let random 

        for (let r = 0; r <= this.row; r++) {
            this.matrixCopy.push([])
            for (let c = 0; c <= this.col; c++) {

                random = Math.random() 

                switch (true) {
                    case random < 0.30:
                        this.matrix[r][c] = 'b'
                        this.matrixCopy[r].push('b')
                        break;
                    case random > 0.30 && random < 0.9:
                        this.matrix[r][c] = 'c'
                        this.matrixCopy[r].push('c')
                        break;
                    default:
                        this.matrix[r][c] = '.'
                        this.matrixCopy[r].push('.')
                        break;
                }
            }
        }
        return this.matrixCopy
    }

    
    printCopy() {
        for (let i = 0; i < this.matrixCopy.length; i++) {
            let line = ""
            for (let j = 0; j < this.matrixCopy[i].length; j++) {
                line += (this.matrixCopy[i][j] + "\t")
            }
            console.log(line)
        }
        console.log('\n')
    }

    checkPath = (rowS, colS, rowM, colM, matrix, playerId)=>{

        if (rowS < 0 || colS < 0 || rowS > this.row || colS > this.col) return false
        if(matrix[rowS][colS] == 'b' || matrix[rowS][colS] == '$' || matrix[rowS][colS] == (playerId == 1 ? 2:1)) return false

        matrix[rowS][colS] = '$'

        if (rowS == rowM && colS== colM){
            this.compPath.unshift({'row': rowS, 'col': colS})
            return true  
        } 

        if (this.checkPath(rowS-1, colS, rowM, colM, matrix, playerId)){
            this.compPath.unshift({'row': rowS, 'col': colS})
            return true  
        } 
        if (this.checkPath(rowS, colS+1, rowM, colM, matrix, playerId)){
            this.compPath.unshift({'row': rowS, 'col': colS})
            return true  
        }       
        if (this.checkPath(rowS+1, colS, rowM, colM, matrix, playerId)){
            this.compPath.unshift({'row': rowS, 'col': colS})
            return true  
        }      
        if (this.checkPath(rowS, colS-1, rowM, colM, matrix, playerId)) {
            this.compPath.unshift({'row': rowS, 'col': colS})
            return true  
        }
        return false
        
    }

    checkPathForAllCoins = () => {

        let coinMap = []
        let flag = false

        while (!flag) {
            coinMap = [{row: this.row, col: this.col}]
            this.compPath = []
            this.randomGameGenerator()

            for (let r = 0; r < this.matrix.length; r++) {
                for (let c = 0; c < this.matrix[r].length; c++) {
                    if (this.matrix[r][c] == 'c') {
                        coinMap.push({
                            row: r,
                            col: c
                        })
                    }
                }
            }

            this.matrixCopy[0][0] = '.'
            this.matrixCopy[this.row][this.col] = '.'

            flag = true
            for (let i = 0; i < coinMap.length; i++) {
                this.printAnyMatrix(this.matrixCopy)
                flag = this.checkPath(0,0,coinMap[i].row, coinMap[i].col, this.matrixCopy, 1)
                
                if (!flag){
                    this.printAnyMatrix(this.matrixCopy)
                    console.log('coinMap[i].row', coinMap[i].row)
                    console.log('coinMap[i].col',  coinMap[i].col)
                    break
                } 
                this.matrixCopy = this.copyMatrix()
            }

            this.print()
        }
        return true
    }

    copyMatrix(){
        let matrixCopy = [] 
        for (let r = 0; r < this.matrix.length; r++) {
            matrixCopy.push([])
            for (let c = 0; c < this.matrix[r].length; c++) {
                matrixCopy[r].push(this.matrix[r][c])
            }
        }
        return matrixCopy
    }

    didComputerTookMyCoin = (comp) => {
        let otherComp = comp.id == 1 ? this.player2 : this.player1

        let compClosestCoin = JSON.stringify(comp.CompClosestCoin)
        let lastCoinLocation = JSON.stringify(otherComp.lastCoinLocation)
        let didPlayerTookCompCoin = Object.is(lastCoinLocation, compClosestCoin)

        if (didPlayerTookCompCoin){
            comp.clearTimeoutArry.forEach(setTimeoutMove => {
                clearTimeout(setTimeoutMove)
            })
            comp.clearTimeoutArry = []
            return true
        }
        return false
    }

    didPlayerTookMyCoin = (player, comp) => {
        let lastCoinLocation = JSON.stringify(player.lastCoinLocation)
        let compClosestCoin = JSON.stringify(comp.compClosestCoin)
        let didPlayerTookCompCoin = Object.is(lastCoinLocation, compClosestCoin)

        if (didPlayerTookCompCoin){
            comp.clearTimeoutArry.forEach(setTimeoutMove => {
                clearTimeout(setTimeoutMove)
            })
            comp.clearTimeoutArry = []
            computer(GoldRushBoard, comp.clearTimeoutArry, comp)
        }
    }
    
    
}