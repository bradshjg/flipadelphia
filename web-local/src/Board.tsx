import {Cell as ICell, Board as IBoard, Position} from './types'
import Cell from './Cell'

type Props = {
  board: IBoard
  onClick: (e: HTMLDivElement, tile: ICell, position: Position) => void
}

const Board = ({board, onClick}: Props) => {
  return (
    board.map((row, i) => {
      return row.map((tile, j) => {
        return (
          <Cell
            key={`cell-${i}-${j}`}
            tile={tile}
            position={[i+1, j+1]}
            onClick={onClick}
          />
        )
      }) 
    })
  )
}

export default Board