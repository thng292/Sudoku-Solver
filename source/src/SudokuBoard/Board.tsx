import './all.css'
import React, { FC } from 'react'
import UnitSquare from './UnitSquare'
import BoardStatus from './BoardStatus'

interface BoardProps {
    squares: number[][],
    status: BoardStatus,
    onValueChange: (i: number, j: number, inp: string) => void
}

const Board: FC<BoardProps> = (props) => {
    let status = ""
    switch (props.status) {
        case BoardStatus.Error:
            status = "error"
            break
        case BoardStatus.Solved:
            status = "solved"
            break
        default:
            status = "normal"
    }
    //console.log("ok to here 2")
    return (<div className={status + ' ' + "grid99"}>
        {props.squares.map((arr,i) =>
            arr.map((val, j) => {
                let tmp = "need-border "
                if (i % 3 === 0 && i!=0) tmp += "thick-top "
                if (j % 3 === 0 && j!=0) tmp += "thick-left "
                return (
                    <UnitSquare classname={tmp + status} value={val > 0 ? val.toString() : ""}
                        onChange={(inp: string) => {
                                console.log("Value Changed on " + i + ' ' + j)
                                props.onValueChange(i, j, inp)
                            }
                        }
                    />
                )
            }
            )
        )}
    </div>)
}

export default Board
