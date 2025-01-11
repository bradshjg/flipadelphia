import React from 'react'
import './app.css'

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

type SlideAnimation = [string, number, number]

const emptyBoard: Board = [
  [Empty, Empty, Empty, Empty],
  [Empty, Empty, Empty, Empty],
  [Empty, Empty, Empty, Empty],
  [Empty, Empty, Empty, Empty],
]

function App() {
  const [board, setBoard] = React.useState<Board>(emptyBoard)
  const [slideAnimation, setSlideAnimation] = React.useState<SlideAnimation>()
  const tileSelected = React.useRef<HTMLDivElement>()

  const onBoardClick = (e: HTMLDivElement) => {
    if (!tileSelected.current) { return }
    const from = tileSelected.current
    const to = e
    const fromRect = from.getBoundingClientRect()
    const toRect = to.getBoundingClientRect()
    console.log(`(${fromRect.top}, ${fromRect.left}) => (${toRect.top}, ${toRect.left})`)
    setSlideAnimation([from.className, toRect.left - fromRect.left, toRect.top - fromRect.top])
  }

  const onSideboardClick = (e: HTMLDivElement) => {
    tileSelected.current = e
  }
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh'}}>
      <div className='board'>
        {
          board.map((row, i) => {
            return row.map((_, j) => {
              return <div
                key={`${i}${j}`}
                className='tile'
                onClick={(e) => onBoardClick(e.currentTarget)}
                style={{gridRowStart: i+1, gridColumnStart: j+1, backgroundColor: 'grey'}}
              />
            }) 
          })
        }
        <div className='sideboard-up' onClick={(e) => onSideboardClick(e.currentTarget)} style={{backgroundColor: 'teal'}} />
        <div className='sideboard-down' onClick={(e) => onSideboardClick(e.currentTarget)} style={{backgroundColor: 'aqua'}} />
      </div>
      <style>{
        slideAnimation && (`
          .${slideAnimation[0]} {
            animation-duration: 1s;
            animation-name: move-tile;
            animation-fill-mode: forwards;
          }

          @keyframes move-tile {
            from {
              translate: 0 0;
            }

            50% {
              scale: 120%;
            }

            to {
              translate: ${slideAnimation[1]}px ${slideAnimation[2]}px;
            }
          }
        `)
      }</style>
    </div>
  )
}

export default App
