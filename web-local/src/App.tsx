import React from 'react'
import {Cell, ICell} from './Cell'
import './app.css'

type IBoard = [
  [ICell, ICell, ICell, ICell],
  [ICell, ICell, ICell, ICell],
  [ICell, ICell, ICell, ICell],
  [ICell, ICell, ICell, ICell],
]

type SlideAnimation = [string, number, number]

type MoveState = 'place' | 'flip' | 'confirm'

const emptyBoard: IBoard = [
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
]

const animationDuration = 1 // seconds

function App() {
  const [board, setBoard] = React.useState<IBoard>(emptyBoard)
  const [slideAnimation, setSlideAnimation] = React.useState<SlideAnimation>()
  const tileSelected = React.useRef<HTMLDivElement>()

  const onBoardClick = (e: HTMLDivElement, row: number, column: number) => {
    if (!tileSelected.current) { return }
    if (slideAnimation) { return }
    const from = tileSelected.current
    const to = e
    const fromRect = from.getBoundingClientRect()
    const toRect = to.getBoundingClientRect()
    console.log(`(${fromRect.top}, ${fromRect.left}) => (${toRect.top}, ${toRect.left})`)
    setSlideAnimation([from.className, toRect.left - fromRect.left, toRect.top - fromRect.top])
    setTimeout(() => {
      board[row - 1][column - 1] = {player: 'player1', orientation: 'up'}
      setBoard(board)
      setSlideAnimation(undefined)
    }, animationDuration * 1000)
  }

  const onSideboardClick = (e: HTMLDivElement) => {
    tileSelected.current = e
  }

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh'}}>
      <div className='board'>
        {
          board.map((row, i) => {
            return row.map((tile, j) => {
              return (
                <Cell
                  key={`cell-${i}-${j}`}
                  tile={tile}
                  row={i+1}
                  column={j+1}
                  onClick={onBoardClick}
                />
              )
            }) 
          })
        }
        <div className='sideboard-up' onClick={(e) => onSideboardClick(e.currentTarget)} style={{backgroundColor: 'teal'}} />
        <div className='sideboard-down' onClick={(e) => onSideboardClick(e.currentTarget)} style={{backgroundColor: 'aqua'}} />
      </div>
      <style>{
        slideAnimation && (`
          .${slideAnimation[0]} {
            animation-duration: ${animationDuration}s;
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
