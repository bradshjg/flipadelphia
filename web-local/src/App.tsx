import { useState, useEffect } from 'react'

type Tile = {
  player: 'player1' | 'player2'
  orientation: 'up' | 'down'
}
const Empty = Symbol('empty')

type Cell = Tile | typeof Empty

type Board = [
  [Cell, Cell, Cell, Cell],
  [Cell, Cell, Cell, Cell],
  [Cell, Cell, Cell, Cell],
  [Cell, Cell, Cell, Cell],
]

const emptyBoard: Board = [
  [Empty, Empty, Empty, Empty],
  [Empty, Empty, Empty, Empty],
  [Empty, Empty, Empty, Empty],
  [Empty, Empty, Empty, Empty],
]

function App() {
  const [board, setBoard] = useState<Board>(emptyBoard)
  const [placementTile, setPlacementTile] = useState<HTMLDivElement>()
  const [placementLoc, setPlacementLoc] = useState<HTMLDivElement>()
  const [flipTile, setFlipTile] = useState<HTMLDivElement>()
  const [flipLoc, setFlipLoc] = useState<HTMLDivElement>()

  return (
    <>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh'}}>
        <div className='board'>
          {
            board.map((row, i) => {
              return row.map((_, j) => {
                return <div
                  key={`${i}${j}`}
                  className='tile'
                  style={{gridRowStart: i+1, gridColumnStart: j+1}}
                >
                  {i},{j}
                </div>
              }) 
            })
          }
          <div className='sideboard-up' style={{backgroundColor: 'teal'}}>UP</div>
          <div className='sideboard-down' style={{backgroundColor: 'aqua'}}>DOWN</div>
        </div>
      </div>
      <style>{`
        @media (min-aspect-ratio: 1/1) {
          .board {
            grid: repeat(4, minmax(0, 1fr)) / repeat(6, minmax(0, 1fr));
            aspect-ratio: 6/4;
            height: 80%;
          }

          .sideboard-up {
            grid-row-start: 2;
            grid-column-start: 6;
          }

          .sideboard-down {
            grid-row-start: 3;
            grid-column-start: 6;
          }
        }

        @media not all and (min-aspect-ratio: 1/1) {
          .board {
            grid: repeat(6, minmax(0, 1fr)) / repeat(4, minmax(0, 1fr));
            aspect-ratio: 4/6;
            width: 80%;
          }

          .sideboard-up {
            grid-row-start: 6;
            grid-column-start: 2;
          }

          .sideboard-down {
            grid-row-start: 6;
            grid-column-start: 3;
          }
        }

        .board {
          display: grid;
          gap: 10px;
        }
      `}</style>
    </>
  )
}

export default App
