## Checking move legality

### Naive

Walk the grid to discover opponent tiles, check if unlocked, and note open adjacent squares as legal flip locations.

### Less naive

After each move (both flips and placement), update the locked-ness and flip possibilities for all adjacent tiles. For flips, consider the adjacency of both the initial and updated position.

## Checking end state

8 vertical rows, 8 horizontal rows, and 8 diagonal rows possible.

If we "number" them

```
0 1 2 3
4 5 6 7
8 9 A B
C D E F
```

Examples:

* Vertial - 2 6 A
* Horizontal - 9 A B
* Diagonal - 8 5 2

### Naive

Walk the board in the 14 different pseudo-rows (4 vertical, 4 horizontal, and 6 diagonal) in which wins can occur, checking if there are three consecutive locked tiles.

### Less naive

I'm not yet convinced there's a _good_ shortcut here, but I'm mostly convinced that we could cut down the search space.

* If a location is unlocked, all possible end game states that include it can be ignored.
* Any winning row must necessarily either involve a location adjacent to where a tile was flipped, or the location or an adjacent location to where a tile was placed.

### Middle ground

* Consider the 24 rows as first class objects, check all of them after each turn?
* Consider the rows that are part of the subset described above, check all of them after each turn?
