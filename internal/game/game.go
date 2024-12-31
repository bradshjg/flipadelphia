package game

import (
	"bufio"
	"fmt"
	"os"
	"slices"
	"strconv"
	"strings"
)

type orientation int
type row int
type column int
type player int

const (
	rowSize    int = 4
	columnSize int = 4
)
const (
	orientationUp orientation = iota
	orientationDown
)
const (
	playerOne player = iota
	playerTwo
)

func (r row) isValid() bool {
	return r >= 0 && r < row(rowSize)
}

func (c column) isValid() bool {
	return c >= 0 && c < column(columnSize)
}

type tile struct {
	Player      player
	Orientation orientation
}

type board [rowSize][columnSize]*tile

func (t tile) String() string {
	switch t.Player {
	case playerOne:
		switch t.Orientation {
		case orientationUp:
			return "A"
		case orientationDown:
			return "B"
		default:
			panic("invalid orientation")
		}
	case playerTwo:
		switch t.Orientation {
		case orientationUp:
			return "X"
		case orientationDown:
			return "Y"
		default:
			panic("invalid orientation")
		}
	default:
		panic("invalid player")
	}
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
	for r := range rowSize {
		// row number
		sb.WriteString(fmt.Sprintf(" %d ", r))
		for c := range columnSize {
			// row
			tile := b[r][c]
			var rowString string
			if tile == nil {
				rowString = "|   "
			} else {
				rowString = fmt.Sprintf("| %s ", tile)
			}

			sb.WriteString(rowString)
			if c == columnSize-1 {
				sb.WriteString("|")
			}
		}
		sb.WriteString("\n")
	}

	// footer
	sb.WriteString("    ")
	for i := range columnSize {
		if i == columnSize-1 {
			sb.WriteString("---")
		} else {
			sb.WriteString("----")
		}
	}
	return sb.String()
}

func (p player) String() string {
	switch p {
	case playerOne:
		return "player 1"
	case playerTwo:
		return "player 2"
	default:
		panic("Invalid player")
	}
}

func (p player) flipTile(b *board) bool {
	// check if any of opponent tiles are unlocked
	unlocked := [][2]int{}
	for r := range rowSize {
		for c := range columnSize {
			tile := b[r][c]
			if tile == nil {
				continue
			}
			if tile.Player == p {
				continue
			}
			if !b.isTileLocked(row(r), column(c)) {
				unlocked = append(unlocked, [2]int{r, c})
			}
		}
	}
	if len(unlocked) == 0 {
		return false
	}
	scanner := bufio.NewScanner(os.Stdin)
	for {
		fmt.Printf("Flip a tile %s: ", p)
		scanner.Scan()
		text := scanner.Text()
		if len(text) != 3 {
			fmt.Println("Choose a valid move")
			continue
		}
		rowVal, err := strconv.Atoi(text[:1])
		if err != nil || !row(rowVal).isValid() {
			fmt.Println("Choose a valid row")
			continue
		}
		columnVal, err := strconv.Atoi(text[1:2])
		if err != nil || !column(columnVal).isValid() {
			fmt.Println("Choose a valid column")
			continue
		}
		if !slices.Contains(unlocked, [2]int{rowVal, columnVal}) {
			fmt.Println("Choose an opponent's unlocked tile")
			continue
		}
		var newRow row
		var newColumn column
		switch text[2] {
		case 'U':
			newRow = row(rowVal - 1)
			newColumn = column(columnVal)
		case 'D':
			newRow = row(rowVal + 1)
			newColumn = column(columnVal)
		case 'L':
			newRow = row(rowVal)
			newColumn = column(columnVal - 1)
		case 'R':
			newRow = row(rowVal)
			newColumn = column(columnVal + 1)
		default:
			fmt.Println("Choose a valid direction")
			continue
		}
		if !(newRow.isValid() && newColumn.isValid()) {
			fmt.Println("Choose a valid direction")
			continue
		}
		if !(b[newRow][newColumn] == nil) {
			fmt.Println("Choose a valid direction")
		}

		var newOrientation orientation
		tileToFlip := b[rowVal][columnVal]
		switch tileToFlip.Orientation {
		case orientationUp:
			newOrientation = orientationDown
		case orientationDown:
			newOrientation = orientationUp
		default:
			panic("Invalid orientation")
		}

		b[rowVal][columnVal] = nil
		b[newRow][newColumn] = &tile{Player: tileToFlip.Player, Orientation: newOrientation}
		break
	}
	return true
}

func (p player) placeTile(b *board) {
	scanner := bufio.NewScanner(os.Stdin)
	for {
		fmt.Printf("Place a tile %s: ", p)
		scanner.Scan()
		text := scanner.Text()
		if len(text) != 3 {
			fmt.Println("Choose a valid move")
			continue
		}
		rowVal, err := strconv.Atoi(text[:1])
		if err != nil || !row(rowVal).isValid() {
			fmt.Println("Choose a valid row")
			continue
		}
		columnVal, err := strconv.Atoi(text[1:2])
		if err != nil || !column(columnVal).isValid() {
			fmt.Println("Choose a valid column")
			continue
		}
		if b[rowVal][columnVal] != nil {
			fmt.Println("Choose an unoccupied space")
			continue
		}
		var orientation orientation
		switch text[2] {
		case 'U':
			orientation = orientationUp
		case 'D':
			orientation = orientationDown
		default:
			fmt.Println("Choose a valid orientation")
			continue
		}
		b[rowVal][columnVal] = &tile{Player: p, Orientation: orientation}
		break
	}
}

func (p *player) endTurn() {
	if *p == playerOne {
		*p = playerTwo
	} else {
		*p = playerOne
	}
}

func (b board) show() {
	fmt.Println(b)
}

func (b board) isTileLocked(r row, c column) bool {
	if !(r.isValid() && c.isValid()) {
		panic("Invalid row/column")
	}
	if b[r][c] == nil {
		return false
	}
	toCheck := [4][2]int{
		{int(r + 1), int(c)},
		{int(r - 1), int(c)},
		{int(r), int(c + 1)},
		{int(r), int(c - 1)},
	}
	for _, loc := range toCheck {
		row := row(loc[0])
		col := column(loc[1])
		if !(row.isValid() && col.isValid()) {
			continue
		}
		if b[row][col] == nil {
			return false
		}
	}
	return true
}

func Start() {
	var b board
	var p player = playerOne
	for {
		b.show()
		flipped := p.flipTile(&b)
		if flipped {
			b.show()
		}
		p.placeTile(&b)
		p.endTurn()
	}
}
