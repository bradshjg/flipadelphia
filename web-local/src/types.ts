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
  onClick: (e: HTMLDivElement, position: Position) => void
}
