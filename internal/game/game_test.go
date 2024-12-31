package game

import (
	"testing"
)

func TestIsLocked(t *testing.T) {
	var b board

	b[0][0] = &tile{Player: playerOne}
	b[0][1] = &tile{Player: playerOne}
	b[1][0] = &tile{Player: playerOne}
	if !b.isTileLocked(0, 0) {
		t.Error("Expected tile to be locked")
	}
	if b.isTileLocked(0, 1) {
		t.Error("Expected tile to be unlocked")
	}
}

func TestSegFault(t *testing.T) {
	var b board
	p := playerOne

	b[0][3] = &tile{Player: playerOne, Orientation: orientationUp}
	b[1][2] = &tile{Player: playerOne, Orientation: orientationDown}
	b[2][1] = &tile{Player: playerTwo, Orientation: orientationUp}
	b[2][2] = &tile{Player: playerTwo, Orientation: orientationUp}
	b[2][3] = &tile{Player: playerOne, Orientation: orientationDown}
	b[3][2] = &tile{Player: playerTwo, Orientation: orientationUp}
	b[3][3] = &tile{Player: playerOne, Orientation: orientationUp}

	p.endTurn(&b)
}

func TestDrawBothWinners(t *testing.T) {
	var b board
	p := playerOne

	// X A A A
	// Y X X X
	// X A A A
	// Y X X X

	xayb := [4]*tile{
		{Player: playerTwo, Orientation: orientationUp},
		{Player: playerOne, Orientation: orientationUp},
		{Player: playerOne, Orientation: orientationUp},
		{Player: playerOne, Orientation: orientationUp},
	}
	ybxa := [4]*tile{
		{Player: playerTwo, Orientation: orientationDown},
		{Player: playerTwo, Orientation: orientationUp},
		{Player: playerTwo, Orientation: orientationUp},
		{Player: playerTwo, Orientation: orientationUp},
	}

	b[0], b[2] = xayb, xayb
	b[1], b[3] = ybxa, ybxa

	gameover, winner := p.endTurn(&b)
	if gameover != true {
		t.Error("expected game to be over")
	}
	if winner != -1 {
		t.Error("expected a draw")
	}
}

func TestDrawNoWinner(t *testing.T) {
	var b board
	p := playerOne

	// X A Y B
	// Y B X A
	// X A Y B
	// Y B X A

	xayb := [4]*tile{
		{Player: playerTwo, Orientation: orientationUp},
		{Player: playerOne, Orientation: orientationUp},
		{Player: playerTwo, Orientation: orientationDown},
		{Player: playerOne, Orientation: orientationDown},
	}
	ybxa := [4]*tile{
		{Player: playerTwo, Orientation: orientationDown},
		{Player: playerOne, Orientation: orientationDown},
		{Player: playerTwo, Orientation: orientationUp},
		{Player: playerOne, Orientation: orientationUp},
	}

	b[0], b[2] = xayb, xayb
	b[1], b[3] = ybxa, ybxa

	gameover, winner := p.endTurn(&b)
	if gameover != true {
		t.Error("expected game to be over")
	}
	if winner != -1 {
		t.Error("expected a draw")
	}
}
