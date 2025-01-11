type ITile = {
  player: 'player1' | 'player2'
  orientation: 'up' | 'down'
}

export type ICell = ITile | undefined

type Props = {
  tile?: ITile
  row: number
  column: number
  onClick: (e: HTMLDivElement, row: number, column: number) => void
}

export const Cell = ({tile, row, column, onClick}: Props) => {
  const bgColor: string = tile ? (
    tile.orientation == 'up' ? 'teal' : 'aqua'
  ) : (
    'grey'
  )
  return (
    <div
      onClick={(e) => onClick(e.currentTarget, row, column)}
      style={{
        gridRowStart: row,
        gridColumnStart: column,
        backgroundColor: bgColor,
      }}
    />
  )
}