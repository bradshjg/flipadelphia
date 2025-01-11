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
  return (
    <div
      onClick={(e) => onClick(e.currentTarget, row, column)}
      style={{gridRowStart: row, gridColumnStart: column}}
    >
      {
        tile ? 
          `${tile.player} - ${tile.orientation}`
        : 
          'empty'
      }
    </div>
  )
}