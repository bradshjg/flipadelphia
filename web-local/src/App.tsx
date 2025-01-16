import React from 'react'
import {Animation as Animation, Board as IBoard, Cell, FlipTileSelected, GameState, Player, Position, Tile, TileSelected} from './types'
import Board from './Board'
import Flash from './Flash'
import Sideboard from './Sideboard'
import TileAnimation from './TileAnimation'
import {gameOver, canFlip} from './rules'
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
  const [player, setPlayer] = React.useState<Player>('player1')
  const [gameState, setGameState] = React.useState<GameState>('place')
  const [animation, setAnimation] = React.useState<Animation>()
  const [message, setMessage] = React.useState<string>()
  const sideboardTileSelected = React.useRef<TileSelected>()
  const gameboardTileSelected = React.useRef<FlipTileSelected>()

  const endTurn = (board: IBoard, player: Player) => {
    const [isGameOver, winner] = gameOver(board)

    if (isGameOver) {
      setMessage(winner ? `${winner == 'player1' ? 'seafoam' : 'purple'} wins!` : 'Draw!')
      return
    }

    setGameState(canFlip(board, player) ? 'flip' : 'place')

    if (player == 'player1') {
      setPlayer('player2')
    } else {
      setPlayer('player1')
    }
  }

  const flipTile = (tileDiv: HTMLDivElement, tile: Tile, boardDiv: HTMLDivElement, tilePosition: [number, number], boardPosition: [number, number]) => {

    // animate
    const tileRect = tileDiv.getBoundingClientRect()
    const boardRect = boardDiv.getBoundingClientRect()
    let rotation: string
    let translation: string
    if (tilePosition[0] == boardPosition[0]) { // horizontal movement
      translation = `translateX(${tileRect.left - boardRect.left}px)`
      if (boardPosition[1] > tilePosition[1]) { // flipping right
        rotation = 'rotateY(180deg)'
      } else { // flipping left
        rotation = 'rotateY(-180deg)'
      }
    } else {
      translation = `translateY(${tileRect.top - boardRect.top}px)`
      if (boardPosition[0] > tilePosition[0]) { // flipping down
        rotation = 'rotateX(-180deg)'
      } else { // flipping up
        rotation = 'rotateX(180deg)'
      }
    }
    tileDiv.classList.add('flip-animation')
    setAnimation({
      kind: 'flip',
      duration: animationDuration,
      rotation: rotation,
      translation: translation,
    })

    setTimeout(() => {
      // lock board position TODO allow rollback?
      // position in 1-indexed, board array is 0-indexed
      board[tilePosition[0] - 1][tilePosition[1] - 1] = undefined
      board[boardPosition[0] - 1][boardPosition[1] - 1] = {
        player: tile.player,
        orientation: tile.orientation == 'down' ? 'up' : 'down',
      }
      setBoard(board)

      // clean up state
      tileDiv.classList.remove('flip-animation')
      setAnimation(undefined)
      gameboardTileSelected.current = undefined

      setGameState('place')
    }, animationDuration * 1000)
  }

  const placeTile = (sideBoardDiv: HTMLDivElement, sideBoardTile: Tile, boardDiv: HTMLDivElement, boardTile: Cell, boardPosition: [number, number]) => {
    if (boardTile) { return } // requires empty cell

    // animate
    const sideboardRect = sideBoardDiv.getBoundingClientRect()
    const boardRect = boardDiv.getBoundingClientRect()
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

      endTurn(board, player)
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
          flipTile(selectedTile.el, selectedTile.tile, el, selectedTile.position, position)
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
      <Flash message={message} />
    </div>
  )
}

export default App
