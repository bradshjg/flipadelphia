import React from 'react'
import {Board as IBoard, GameState, Player, Position} from './types'
import Board from './Board'
import Sideboard from './Sideboard'
import './app.css'

type SlideAnimation = [string, number, number]
type FlipAnimation = [string, number, number]

const emptyBoard: IBoard = [
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined],
]

const animationDuration = 0.5 // seconds

function App() {
  const [board, setBoard] = React.useState<IBoard>(emptyBoard)
  const [player, setPlayer] = React.useState<Player>('player2')
  const [slideAnimation, setSlideAnimation] = React.useState<SlideAnimation>()
  const [flipAnimation, setFlipAnimation] = React.useState<FlipAnimation>()
  const [gameState, setGameState] = React.useState<GameState>('place')
  const sideboardTileSelected = React.useRef<HTMLDivElement>()

  const swapPlayer = () => {
    if (player == 'player1') {
      setPlayer('player2')
    } else {
      setPlayer('player1')
    }
  }

  const onBoardClick = (e: HTMLDivElement, position: Position) => {
    if (!sideboardTileSelected.current) { return }
    if (slideAnimation) { return }
    if (typeof position == 'string') { return }
    const from = sideboardTileSelected.current
    const to = e
    const fromRect = from.getBoundingClientRect()
    const toRect = to.getBoundingClientRect()
    sideboardTileSelected.current = undefined
    setSlideAnimation([from.className, toRect.left - fromRect.left, toRect.top - fromRect.top])
    setTimeout(() => {
      board[position[0] - 1][position[1] - 1] = {
        player: player,
        orientation: from.className == 'sideboard-up' ? 'up' : 'down'
      }
      setBoard(board)
      setSlideAnimation(undefined)
      swapPlayer()
    }, animationDuration * 1000)
  }

  const onSideboardClick = (e: HTMLDivElement) => {
    sideboardTileSelected.current = e
  }

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh'}}>
      <div className='board'>
        <Board board={board} onClick={onBoardClick} />
        <Sideboard player={player} onClick={onSideboardClick}/>
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
