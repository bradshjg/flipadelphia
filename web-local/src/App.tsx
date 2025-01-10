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

  return (
    <>
      <div className='container'>
        <div className='board'>
          {
            board.map((row, i) => {
              return row.map((_, j) => {
                return <div key={`${i}${j}`} className='tile'>{i},{j}</div>
              }) 
            })
          }
        </div>
        <div className='corral'>
          <div>up</div>
          <div>down</div>
        </div>
      </div>
      <style>{`
        * {
          margin: 0;
        }

        div {
          border: solid;
          text-align: center;
        }

        @media (min-aspect-ratio: 1/1) {
          .container {
            flex-direction: row;
          }

          .board {
            height: 70vh;
          }

          .up {
            grid-row-start: 2;
          }

          .corral {
            height: 70vh;
            display: grid;
            grid: repeat(4, 1fr) / 1fr;
            aspect-ratio: 1/4;
          }
        }

        @media (max-aspect-ratio: 1/1) {
          .container {
            flex-direction: column;
          }

          .board {
            width: 70vw;
          }

          .corral {
            display: grid;
            grid: 1fr / repeat(4, 1fr);
            width: 70vw;
            aspect-ratio: 4;
          }
        }

        .container {
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          width: 100vw;
          height: 100vh;
        }

        .board {
          display: grid;
          grid: repeat(4, 1fr) / repeat(4, 1fr);
          gap: 10px;
          aspect-ratio: 1;
        }

        .corral {
          gap: 10px;
        }
      `}</style>
    </>
  )
}

export default App
