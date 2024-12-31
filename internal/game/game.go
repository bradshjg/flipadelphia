package game

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type orientation int8

const (
	up   orientation = 1
	down orientation = -1
)

type player int8

const (
	player1 = 1
	player2 = -1
)

type tile struct {
	Player      player
	Orientation orientation
	Locked      bool
}

type board [4][4]*tile

func (t tile) String() string {
	var tile string
	if t.Player == player1 {
		if t.Orientation == up {
			tile = "A"
		} else {
			tile = "B"
		}
	} else {
		if t.Orientation == up {
			tile = "X"
		} else {
			tile = "Y"
		}
	}
	return tile
}

func (b board) String() string {
	var sb strings.Builder

	// header
	sb.WriteString("   ")
	for i := range 4 {
		sb.WriteString(fmt.Sprintf("  %d ", i))
	}
	sb.WriteString("\n   ")
	for range b {
		sb.WriteString(" ---")
	}
	sb.WriteString("\n")

	// body
	for i, row := range b {
		// row number
		sb.WriteString(fmt.Sprintf(" %d ", i))
		for j, tile := range row {
			// row
			var rowString string
			if tile == nil {
				rowString = "|   "
			} else {
				rowString = fmt.Sprintf("| %s ", tile)
			}

			sb.WriteString(rowString)
			if j == len(row)-1 {
				sb.WriteString("|")
			}
		}
		sb.WriteString("\n")
	}

	// footer
	sb.WriteString("    ")
	for i := range b {
		if i == len(b)-1 {
			sb.WriteString("---")
		} else {
			sb.WriteString("----")
		}
	}
	return sb.String()
}

func move(b *board, p player) {
	scanner := bufio.NewScanner(os.Stdin)
	fmt.Print("Make a move: ")
	scanner.Scan()
	var orientation orientation
	text := scanner.Text()
	row, _ := strconv.Atoi(text[:1])
	col, _ := strconv.Atoi(text[1:2])
	fmt.Printf("Row: %d, Col: %d, Or: %s\n", row, col, text[2:3])
	if text[2] == 'U' {
		orientation = up
	} else {
		orientation = down
	}
	b[row][col] = &tile{Player: p, Orientation: orientation}
}

func Start() {
	var b board
	var p player = player1
	for {
		fmt.Println(b)
		move(&b, p)
		p = -p
	}
}
