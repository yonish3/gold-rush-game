const GoldRushMatrix = new GoldRush (5,5)

GoldRushMatrix.randomCoinGenerator()
//GoldRushMatrix.alter(0,0,1)
//GoldRushMatrix.alter(4,4,2)

GoldRushMatrix.alter(0,0,'.')
GoldRushMatrix.alter(4,4,'.')

GoldRushMatrix.print()  

let  matrix = GoldRushMatrix.generateMatrix(5,5)
