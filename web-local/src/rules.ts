import {Board, Player} from './types'

const isValid = (index: number): boolean => {
  return index >= 0 && index < 4
}

const isLocked = (board: Board, row: number, column: number): boolean => {
  if (!board[row][column]) { return false }

  const toCheck = [
    [row + 1, column],
    [row - 1, column],
    [row, column + 1],
    [row, column - 1],
  ]

  for (const [row, col] of toCheck) {
    if (!(isValid(row) && isValid(col))) { continue }
    if (!board[row][col]) { return false }
  }

  return true
}

export const gameOver = (board: Board): [boolean, Player | undefined] => {
  let isGameOver = true
  let playerOneWon = false
  let playerTwoWon = false
  let winner: Player | undefined = undefined

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (!board[i][j]) {
        isGameOver = false
      }
    }
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const cell = board[i][j]
      if (!cell) { continue }
      if (isLocked(board, i, j)) {
        const possibleWinners = [
          [[i, j-1], [i, j], [i, j+1]], // horizontal
          [[i-1 , j], [i, j], [i+1, j]], // vertical
          [[i-1, j-1], [i, j], [i+1, j+1]], // diagonal (up-left)
          [[i-1, j+1], [i, j], [i+1, j-1]], // diagonal (up-right)
        ]
        let [r1, c1, r2, c2, r3, c3] = [0, 0, 0, 0, 0, 0]
        for (const p of possibleWinners) {
          r1 = p[0][0]
          c1 = p[0][1]
          r2 = p[1][0]
          c2 = p[1][1]
          r3 = p[2][0]
          c3 = p[2][1]
          if (![r1, c1, r2, c2, r3, c3].every(isValid)) { continue }
          const t1 = board[r1][c1]
          const t2 = board[r2][c2]
          const t3 = board[r3][c3]
          if (![t1, t2, t3].every(Boolean)) { continue }

          if (
            t1?.player === t2?.player && t2?.player === t3?.player &&
            t1?.orientation === t2?.orientation && t2?.orientation === t3?.orientation &&
            isLocked(board, r1, c1) && isLocked(board, r3, c3)
          ) {
            if (t1?.player === 'player1') {
              playerOneWon = true
            } else {
              playerTwoWon = true
            }
          }
        }
      }
    }
  }

  if (playerOneWon || playerTwoWon) {
    isGameOver = true
    if (!(playerOneWon && playerTwoWon)) {
      if (playerOneWon) {
        winner = 'player1'
      } else {
        winner = 'player2'
      }
    }
  }

  return [isGameOver, winner]
}

export const canFlip = (board: Board, player: Player): boolean => {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const cell = board[i][j]
      if (!cell) { continue }
      if (cell.player !== player) { continue }
      if (!isLocked(board, i, j)) { return true }
    }
  }
  return false
}