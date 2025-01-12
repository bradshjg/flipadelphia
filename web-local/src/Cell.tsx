import EmptyCell from './EmptyCell'
import Tile from './Tile'
import {CellProps} from './types'

const Cell = (props: CellProps) => {
  return (props.tile ?
    <Tile
      tile={props.tile}
      position={props.position}
      onClick={props.onClick}
    />
  :
    <EmptyCell {...props} />
  )
}

export default Cell
