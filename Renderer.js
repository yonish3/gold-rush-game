class Renderer{

    generateMatrix(row, col, board){
             
            $('#board').empty()
            $('#board').css('grid-template-columns', `repeat(${row}, 1fr)`)
            $('#board').css('grid-template-rows', `repeat(${col}, 1fr)`)

            for (let r = 0; r < row; r++) {
                for (let c = 0; c < col; c++) {
                    switch (board[r][c]) {
                        case 'b':
                            $('#board').append(`<div class='brick'></div>`)
                            break;
                        case 'c':
                            $('#board').append(`<div class='path'></div>`)
                            break;
                        case 1:
                            $('#board').append(`<div class='path'></div>`)
                            break;
                        case 2:
                            $('#board').append(`<div class='path'></div>`)
                            break;
                        default:
                            break;
                    }
                }
            }

            // for (let r = 0; r < row; r++) {
            //     matrixStr+=`"`
            //     for (let c = 0; c < col; c++) {
            //         matrixStr+=board[r][c]
            //     }
            //     matrixStr+=`"`

            // }

            // $('#board').empty().css(`grid-template-areas',  
            //     "h h h h h h"
            //     "s s m m m m"
            //     "s s m m m m"
            //     "s s m m m m"
            // `)

    }
}
    
