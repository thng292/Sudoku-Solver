import BoardStatus from './BoardStatus'

export type D2Array<T> = Array<Array<T>>;

export default interface BoardProps {
    squares: D2Array<number>,
    status: BoardStatus
}