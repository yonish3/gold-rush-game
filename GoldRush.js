class GoldRush extends Matrix{
    
    constructor(row,col){
        super (row,col)
        this.row = row-1
        this.col = col-1
        this.player1 = [0,0,1]
        this.player2 = [row-1,col-1,2]
    }

    checkMovement(player,direction){

        let row = this[player][0]
        let col = this[player][1]

        switch (direction) {
            case 'up':
                return row == 0 || this.matrix[row-1][col] == 'c' ||this.matrix[row-1][col] == '$' ? false : true 

            case 'down':
               return row == this.row || this.matrix[row+1][col] =='c' || this.matrix[row+1][col] == '$' ? false : true 

            case 'right':
                return col == this.col || this.matrix[row][col+1] == 'c' || this.matrix[row][col+1] == '$' ? false : true 

            case 'left':
                return col == 0 || this.matrix[row][col-1] == 'c' || this.matrix[row][col-1] == '$' ? false : true 
                
            default:
                break;
        }

    }

    movePlayer(player,direction){

        if(this.checkMovement(player,direction)){

            this.alter(this[player][0],this[player][1],'.')

            switch (direction) {
                case 'up':
                    this[player][0]--
                    break;
                case 'down':
                    this[player][0]++
                    break;
                case 'right':
                    this[player][1]++
                    break;
                case 'left':
                    this[player][1]--
                    break;
                default:
                    break;
            }

            this.alter(this[player][0],this[player][1],this[player][2])
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

        if (rowS == 0 && colS== 0) return true 
        
        if (this.checkPath2(rowS-1, colS, rowM, colM)) return true
        if (this.checkPath2(rowS, colS+1, rowM, colM)) return true       
        if (this.checkPath2(rowS+1, colS, rowM, colM)) return true     
        if (this.checkPath2(rowS, colS-1, rowM, colM)) return true

        this.matrix[rowS][colS] = '.'
        this.print()

        return false
        
    }
    
}