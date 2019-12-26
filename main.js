const GoldRushMatrix = new GoldRush (5,5)

GoldRushMatrix.randomCoinGenerator()
//GoldRushMatrix.alter(0,0,1)
//GoldRushMatrix.alter(4,4,2)
GoldRushMatrix.alter(0,0,'.')
GoldRushMatrix.alter(4,4,'.')

const player1 = GoldRushMatrix.player1
const player2 = GoldRushMatrix.player2

GoldRushMatrix.print()  

let  matrix = GoldRushMatrix.generateMatrix(5,5)
