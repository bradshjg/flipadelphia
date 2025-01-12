import {CellProps} from './types'

const EmptyCell = ({position, onClick}: CellProps) => {
  return (
    <div
      onClick={(e) => onClick(e.currentTarget, position)}
      style={{
        gridRowStart: position[0],
        gridColumnStart: position[1],
        backgroundColor: 'grey',
      }}
    />
  )
}

export default EmptyCell