class Matrix{
    constructor(row,col){
        this.matrix = this.generateMatrix(row,col)
    }

    alter (r, c, v) {
        this.matrix[r][c] = v
    }

    print() {
        for (let i = 0; i < this.matrix.length; i++) {
            let line = ""
            for (let j = 0; j < this.matrix[i].length; j++) {
                line += (this.matrix[i][j] + "\t")
            }
            console.log(line)
        }
        console.log('\n')
    }
    

    generateMatrix(row,col) {
        let matrix = []
        
        for (let r = 0; r < row; r++) {
            matrix.push([])
            for (let c = 0; c < col; c++) {
                matrix[r].push('.')
            }
        }
        return matrix
    }
}