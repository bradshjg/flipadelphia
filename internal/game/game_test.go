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
