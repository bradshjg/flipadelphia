import React from "react"
import { CellProps, Tile as ITile } from "./types"

const tileStyles = (tile: ITile): React.CSSProperties[] => {
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

  return [ // TODO hacky front/back
    {
      background: background,
      outlineStyle: 'solid',
      outlineOffset: '-10px',
      outlineWidth: 'thick',
      outlineColor: border,
    },
    {
      background: border,
      outlineStyle: 'solid',
      outlineOffset: '-10px',
      outlineWidth: 'thick',
      outlineColor: background,
    },
  ]

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
  const tileCSS: React.CSSProperties[] = tileStyles(tile)
  return (
    <div
      className={className}
      style={{
        ...gridCSS,
      }}
    >
      <div className="tile">
        <div style={{position: "fixed", width: "100%", height: "100%", backgroundColor: "grey"}} />
        <div className="tile-container" onClick={(e) => onClick(e.currentTarget, tile, position)}>
          <div className="tile-front" style={tileCSS[0]} />
          <div className="tile-back" style={tileCSS[1]} />
        </div>
      </div>
    </div>
  )
}

export default Tile