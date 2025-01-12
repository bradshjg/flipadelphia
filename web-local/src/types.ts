export type Player = 'player1' | 'player2'
type Orientation = 'up' | 'down'
export interface Tile {
  player: Player
  orientation: Orientation
}

export type Cell = Tile | undefined
export type Board = [
  [Cell, Cell, Cell, Cell],
  [Cell, Cell, Cell, Cell],
  [Cell, Cell, Cell, Cell],
  [Cell, Cell, Cell, Cell],
]
export type GameState = 'place' | 'flip'

export type Position = string | [number, number] // support CSS class or X,Y grid positioning
export interface CellProps {
  tile?: Tile
  position: Position
  onClick: (e: HTMLDivElement, tile: Cell, position: Position) => void
}

interface BasicAnimation {
  kind: string
  duration: number // seconds
}

export interface SlideAnimation extends BasicAnimation {
  kind: 'slide'
  endPosition: [number, number]
}

export interface FlipAnimation extends BasicAnimation {
  kind: 'flip'
  rotation: string
  translation: string
}

export type Animation = SlideAnimation | FlipAnimation

export interface TileSelected {
  el: HTMLDivElement,
  tile: Tile,
}

export interface FlipTileSelected extends TileSelected {
  position: Position,
}