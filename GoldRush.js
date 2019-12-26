class GoldRush extends Matrix{
    
    constructor(row,col){
        super (row,col)
        this.row = row-1
        this.col = col-1
        //this.player1 = [0,0,1]
        //this.player2 = [row-1,col-1,2]
        //this.player1_Score = 0
        //this.player2_Score = 0

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
            case 'w':  
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

    randomCoinGenerator(){
        for (let r = 0; r <= this.row; r++) {
            for (let c = 0; c <= this.col; c++) {
                if (Math.random()<0.4) {
                    this.matrix[r][c] = 'c'
                } else {
                this.matrix[r][c] = '.'
                }
            }
        }
    }

    checkPath(rowS, colS, rowM, colM){

        if (rowS < 0 || colS < 0 || rowS > rowM || colS > colM) return false
    
        if(this.matrix[rowS][colS] == 'c' || this.matrix[rowS][colS] == '$') return false

        this.matrix[rowS][colS] = '$'
        this.print()

        if (rowS == rowM && colS== colM) return true 
        
        if (this.checkPath(rowS-1, colS, rowM, colM)) return true
        if (this.checkPath(rowS, colS+1, rowM, colM)) return true       
        if (this.checkPath(rowS+1, colS, rowM, colM)) return true     
        if (this.checkPath(rowS, colS-1, rowM, colM)) return true

        this.matrix[rowS][colS] = '.'
        this.print()

        return false
        
    }
    
}