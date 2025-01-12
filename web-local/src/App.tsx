import React from 'react'
import {Animation as Animation, Board as IBoard, Cell, FlipTileSelected, GameState, Player, Position, Tile, TileSelected} from './types'
import Board from './Board'
import Sideboard from './Sideboard'
import TileAnimation from './TileAnimation'
import './app.css'

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
  const [gameState, setGameState] = React.useState<GameState>('place')
  const [animation, setAnimation] = React.useState<Animation>()
  const sideboardTileSelected = React.useRef<TileSelected>()
  const gameboardTileSelected = React.useRef<FlipTileSelected>()

  const swapPlayer = () => {
    // setGameState('flip')
    if (player == 'player1') {
      setPlayer('player2')
    } else {
      setPlayer('player1')
    }
  }

  const placeTile = (sideBoardDiv: HTMLDivElement, sideBoardTile: Tile, boardDiv: HTMLDivElement, boardTile: Cell, boardPosition: [number, number]) => {
    if (boardTile) { return } // requires empty cell
    const sideboardRect = sideBoardDiv.getBoundingClientRect()
    const boardRect = boardDiv.getBoundingClientRect()

    // animate
    sideBoardDiv.classList.add('slide-animation')
    setAnimation({
      kind: 'slide',
      duration: animationDuration,
      endPosition: [boardRect.left - sideboardRect.left, boardRect.top - sideboardRect.top],
    })

    setTimeout(() => {
      // lock board position TODO allow rollback?
      board[boardPosition[0] - 1][boardPosition[1] - 1] = { // position in 1-indexed, board array is 0-indexed
        player: player,
        orientation: sideBoardTile.orientation,
      }
      setBoard(board)

      // clean up state
      sideBoardDiv.classList.remove('slide-animation')
      setAnimation(undefined)
      sideboardTileSelected.current = undefined

      swapPlayer()
    }, animationDuration * 1000)
  }

  const onBoardClick = (el: HTMLDivElement, tile: Cell, position: Position) => {
    if (animation) { return }
    if (typeof position === 'string') { return }
    if (sideboardTileSelected.current && gameState == 'place') {
      placeTile(sideboardTileSelected.current.el, sideboardTileSelected.current.tile, el, tile, position)
    }
    if (gameState == 'flip') {
      if (!gameboardTileSelected.current) { // choose an opponent's tile to flip
        if (!tile || tile.player == player) { return }
        gameboardTileSelected.current = {
          el: el,
          tile: tile,
          position: position,
        }
      } else {
        if (tile && tile.player != player) { // choose a new opponent's tile to flip
          gameboardTileSelected.current = {
            el: el,
            tile: tile,
            position: position,
          }
        } else { // flip to adjacent location if possible
          const selectedTile = gameboardTileSelected.current
          if (typeof selectedTile.position === 'string') { return }
          // check empty
          if (tile) { return }
          // check adjacency
          const adjacency = [
            Math.abs(selectedTile.position[0] - position[0]),
            Math.abs(selectedTile.position[1] - position[1])
          ].sort()
          if (!(adjacency[0] === 0 && adjacency[1] === 1)) { return }
          // flip!
          console.log(`do the flip! (${selectedTile.position} -> ${position})`)
        }
      }
    }
  }

  const onSideboardClick = (e: HTMLDivElement, tile: Cell) => {
    if (gameState != 'place' || !tile) { return }
    sideboardTileSelected.current = {el: e, tile: tile}
  }

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh'}}>
      <div className='board'>
        <Board board={board} onClick={onBoardClick} />
        <Sideboard player={player} onClick={onSideboardClick}/>
      </div>
      <TileAnimation animation={animation} />
    </div>
  )
}

export default App
