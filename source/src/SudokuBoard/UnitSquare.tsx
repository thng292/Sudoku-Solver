import React, { FC } from 'react'

interface SquareUnitProps {
    value: string,
    classname: string,
    onChange: (inp: string)=>void
}

const UnitSquare: FC<SquareUnitProps> = (props) => {
    //console.log("ok to here 1")
    return <input className={props.classname} value={props.value} onChange={(e) => props.onChange(e.target.value)} />
}

export default UnitSquare