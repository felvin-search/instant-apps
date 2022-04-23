const baseMine = {
    bomb: false,
    revealed: false,
    flagged: false
  };
  
  export const generateMineField = (mines = 64) => {
    let mineField = Array(mines).fill(baseMine);
    mineField = generateCoordinates(mineField);
    mineField = generateBombs(mineField);
    mineField = getCountOfNeighborsWithBombs(mineField);
    return mineField;
  };
  
  export const revealNeighbors = (minefield, mine) => {
    const neighbors = getNeighbors(minefield, mine);
    const map = neighbors.map(neighbor => {
      if (
        !neighbor.flagged &&
        !neighbor.revealed &&
        (neighbor.neighbors === 0 || !neighbor.bomb)
      ) {
        neighbor.revealed = true;
        if (neighbor.neighbors === 0) {
          revealNeighbors(minefield, neighbor);
        }
      }
      return neighbor;
    });
  
    return map;
  };
  
  export const revealAll = minefield => {
    const map = minefield.map(mine => {
      mine.revealed = true;
      return mine;
    });
    return map;
  };
  
  export const updateMinefield = (minefield, updatedMines) => {
    const map = minefield.map(mine => {
      updatedMines.forEach(update => {
        if (update.x === mine.x && update.y === mine.y) {
          mine = { ...mine, ...update };
        }
      });
      return mine;
    });
    return map;
  };
  
  export const allBombsFlagged = minefield => {
    const bombs = minefield.filter(mine => mine.bomb);
    return bombs.every(bomb => bomb.flagged);
  };
  
  export const unrevealedCountEqualsBombCount = minefield => {
    const unrevealed = minefield.filter(mine => !mine.revealed);
    const bombs = minefield.filter(mine => mine.bomb);
    return unrevealed.length === bombs.length;
  };
  
  const generateBombs = mineField => {
    let totalBombs = 0;
    const bombsAllowed = getRandomNumber(12, 16);
  
    while (totalBombs < bombsAllowed) {
      const x = getRandomNumber(0, 7);
      const y = getRandomNumber(0, 7);
      let mine = mineField.find(m => m.y === y && m.x === x);
  
      if (!mine.bomb) {
        mine.bomb = true;
        totalBombs++;
      }
    }
    return mineField;
  };
  
  const getRandomNumber = (start, end) => {
    return Math.floor(Math.random() * (+start - +end) + +end);
  };
  
  const generateCoordinates = mineField => {
    const map = mineField.map((mine, index) => {
      if (index <= 7) {
        return { ...mine, x: index, y: 0 };
      } else {
        const coordinate = Math.floor(index / 8);
        return { ...mine, x: index % (coordinate * 8), y: coordinate };
      }
    });
  
    return map;
  };
  
  const getNeighbors = (minefield, mine) => {
    const level = mine.y;
    const levelUp = level - 1;
    const levelDown = level + 1;
    const xLeft = mine.x - 1;
    const xRight = mine.x + 1;
  
    const sameLevel = minefield.filter(
      m => (m.x === xLeft || m.x === xRight) && m.y === level
    );
  
    const upLevel = minefield.filter(
      m => (m.x === xLeft || m.x === xRight || m.x === mine.x) && m.y === levelUp
    );
  
    const downLevel = minefield.filter(
      m =>
        (m.x === xLeft || m.x === xRight || m.x === mine.x) && m.y === levelDown
    );
  
    return [...sameLevel, ...upLevel, ...downLevel];
  };
  
  const getCountOfNeighborsWithBombs = minefield => {
    const map = minefield.map(mine => {
      const neighborArray = getNeighbors(minefield, mine);
      const neighbors = neighborArray.filter(neighbor => neighbor.bomb).length;
  
      return { ...mine, neighbors };
    });
  
    return map;
  };
  