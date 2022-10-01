enum BoardStatus {
    Normal,
    Error,
    Solved
}

const initialArr = [false, false, false, false, false, false, false, false, false, false]

function checkBoard(board: number[][]): BoardStatus {
    let free = 0
    console.log("Check for rows and columns")
    for (let i = 0; i < 9; i++) {
        let tmpRow = initialArr.slice()
        let tmpCol = initialArr.slice()
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) free++
            //console.log(i, j)
            //console.log(tmpRow)
            if (tmpRow[board[i][j]] && board[i][j]) {
                console.log(i,j)
                return BoardStatus.Error
            }
            tmpRow[board[i][j]] = true

            //console.log(tmpCol)
            if (tmpCol[board[j][i]] && board[j][i]) {
                console.log(i,j)
                return BoardStatus.Error
            }
            tmpCol[board[j][i]] = true
        }
    }
    console.log("Check for 9 square block")
    for (let k = 0; k < 9; k += 3)
        for (let l = 0; l < 9; l += 3) {
            let tmpBlock = initialArr.slice()
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    //console.log(i+k,j+l)
                    //console.log(i * 3 + j + 1)
                    if (tmpBlock[board[i + k][j + l]] && board[i + k][j + l]) {
                        console.log(i+k,j+l)
                        return BoardStatus.Error
                    }
                    tmpBlock[board[i + k][j + l]] = true
                }
            }
        }
    if (free === 0) return BoardStatus.Solved
    return BoardStatus.Normal
}

export default checkBoard