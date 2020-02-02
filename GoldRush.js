class GoldRush extends Matrix{
    
    constructor(row,col){
        super (row,col)
        this.row = row-1
        this.col = col-1
        this.matrixCopy = []
        this.compPath = []
        
   
        this.player1 = {
            id: 1,
            row: 0,
            col: 0,
            score: 0
        }
        this.player2 = {
            id: 2,
            row: row-1,
            col: col-1,
            score: 0
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
                console.log(player.score)
            }
            
            this.alter(row,col,player.id)
            this.print()
            return true 
        }
        else{
            return false
        }
    }

    randomGameGenerator(){
        this.matrix =this.generateMatrix(this.row+1, this.col+1)
        this.matrixCopy =[]
        this.compPath = []
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

    checkPath(rowS, colS, rowM, colM, matrix){

        if (rowS < 0 || colS < 0 || rowS > rowM || colS > colM) return false
    
        if(matrix[rowS][colS] == 'b' || matrix[rowS][colS] == '$' || matrix[rowS][colS]== '2') return false

        matrix[rowS][colS] = '$'

        this.compPath.push({'row': rowS, 'col': colS})
        this.printCopy()

        if (rowS == rowM && colS== colM) return true 
        
        if (this.checkPath(rowS-1, colS, rowM, colM, matrix)) return true
        if (this.checkPath(rowS, colS+1, rowM, colM, matrix)) return true       
        if (this.checkPath(rowS+1, colS, rowM, colM, matrix)) return true     
        if (this.checkPath(rowS, colS-1, rowM, colM, matrix)) return true

        this.printCopy()
        console.log('false')
        
        return false
        
    }

    generateBoard (){
        let flag = false

        while (!flag) {
            this.randomGameGenerator()
    
            this.matrixCopy[0][0] = '.'
            this.matrixCopy[this.row-1][this.col-1] = '.'
    
            flag = GoldRushBoard.checkPath(0,0,this.row-1, this.col-1, this.matrixCopy)
        }
        
        return true
    }
    
    
}