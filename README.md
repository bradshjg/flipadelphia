# Flipadelpha

## Play

https://bradshjg.github.io/flipadelphia/

## Rules

* Each player has 8 double-sided tiles.
* The game board is a 4x4 grid.
* During a turn, a player must first flip an opponent's tile to an adjacent square (if possible) and then must place one other their own tiles anywhere on the board.
* The game is won when a player achieves three locked tiles with the same side up in a row (vertical, horizontal, or diagonal). A tile is considered locked if there is no adjacent square open in which to flip it. A tie possible if either no locked rows exist, or both players have locked rows.

Consider A/B to be the two sides of player one's tiles and X/Y to be player two's tiles.

```
X A _ _ 
X _ A _
X _ _ A
_ _ _ _
```

No player has won the game yet, since though each player has three tiles in a row, only the top-left tile is locked.

```
A X _ _ 
A X _ _
A X _ _
X _ _ _
```

In this improbable board state, player one has won the game (regardless of the turn on which this board state arises) since they have a row of locked A tiles.
