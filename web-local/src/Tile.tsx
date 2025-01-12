import { CellProps, Tile as ITile } from "./types"

const tileStyle = (tile: ITile): React.CSSProperties => {
  const p1Major = 'teal'
  const p1Minor = 'aqua'
  const p2Major = 'gold'
  const p2Minor = 'darkorchid'

  let background: string
  let border: string
  if (tile.player == 'player1') {
    if (tile.orientation == 'up') {
      background = p1Major
      border = p1Minor
    } else {
      background = p1Minor
      border = p1Major
    }
  } else {
    if (tile.orientation == 'up') {
      background = p2Major
      border = p2Minor
    } else {
      background = p2Minor
      border = p2Major
    }
  }

  return {
    background: background,
    border: 'solid',
    borderWidth: 'thick',
    borderColor: border,
  }

}

interface TileProps extends CellProps {
  tile: ITile
}

const Tile = ({tile, position, onClick}: TileProps) => {
  const className = typeof position === 'string' ? position : undefined
  const gridCSS: React.CSSProperties = (typeof position !== 'string' ?
    {
      gridRowStart: position[0],
      gridColumnStart: position[1],
    }
  :
    {}
  )
  return (
    <div
      className={className}
      onClick={(e) => onClick(e.currentTarget, tile, position)}
      style={{
        ...gridCSS,
        ...tileStyle(tile)
      }}
    />
  )
}

export default Tile