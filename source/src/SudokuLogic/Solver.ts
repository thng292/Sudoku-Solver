const initialArr = [1,2,3,4,5,6,7,8,9]

function GameSolver(GameBoard: number[][]): number[][] {
    let avail: number[][][] = []

    function checkRowCol(x: number, y: number, val: number): boolean {
        //console.log("Checking Rows and Columns on ",x,y)
        for (let i = 0; i < 9; i++) {
            if (GameBoard[x][i] === val) {
                return false
            }
            if (GameBoard[i][y] === val) {
                return false
            }
        }
        return true
    }

    function check9Block(x: number, y: number, val: number): boolean {
        x = Math.floor(x / 3) * 3
        y = Math.floor(y / 3) * 3
        //console.log("Checking the 9 block on ",x,y)
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (GameBoard[x + i][y + j] === val) {
                    return false
                }
            }
        }
        return true
    }

    function isValid(x: number, y: number, val: number): boolean {
        //console.log(x,y,val)
        return (checkRowCol(x, y, val) && check9Block(x, y, val))
    }

    function DfsSolve(x: number, y: number): boolean {
        //console.log("solving on ",x,y)
        //console.log(GameBoard)
        //cnt++
        //if (x==5) debugger
        //if (cnt==20) return true
        if (GameBoard[x][y]) {
            for (let i = x; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    if (!GameBoard[i][j]) return DfsSolve(i, j)
                }
            }
            return true
        } else {
            for (let i of avail[x][y]) {
                if (isValid(x, y, i)) {
                    GameBoard[x][y] = i
                    if (DfsSolve(x, y)) return true
                }
            }
            GameBoard[x][y] = 0
        }
        return false
    }

    function eliminateRowCol(x: number, y:number, inp: number[]): number[] {
        for (let k = 0; k < 9; k++) {
            let tmp = inp.indexOf(GameBoard[x][k])
            if (tmp >= 0) inp.splice(tmp, 1)
            tmp = inp.indexOf(GameBoard[k][y])
            if (tmp>=0) inp.splice(tmp,1)
        }
        return inp
    }

    function eliminateBlock(x: number, y: number, inp: number[]): number[] {
        x = Math.floor(x / 3) * 3
        y = Math.floor(y / 3) * 3
        for (let i = x; i < x + 3; i++) {
            for (let j = y; j < y + 3; j++) {
                let tmp = inp.indexOf(GameBoard[i][j])
                if (tmp >= 0) inp.splice(tmp, 1)
            }
        }
        return inp
    }

    let solved = false

    function EliminateSolve(): boolean {
        let solving = true
        for (let i = 0; i < 9; i++) {
            avail.push([])
        }
        while (solving) {
            solved = false
            solving = false
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    if (!GameBoard[i][j]) {
                        avail[i][j] = initialArr.slice()
                        avail[i][j] = eliminateRowCol(i, j, avail[i][j])
                        avail[i][j] = eliminateBlock(i, j, avail[i][j])
                        if (avail[i][j].length == 1) {
                            GameBoard[i][j] = avail[i][j][0]
                            solving = true
                        }
                        // console.log(i, j)
                        // console.log(avail[i][j])
                        //if (i==3) break
                    }
                }
            }
        }
        return true
    } 
    console.log("Try solving by eliminating")
    if (EliminateSolve()) {
        console.log("This is hard!. Bruteforcing the rest")
        DfsSolve(0,0)
    } else {
        console.log("Too easy!")
    }
    return GameBoard
}
export default GameSolver