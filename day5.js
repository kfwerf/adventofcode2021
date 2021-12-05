{

    const input = `
    0,9 -> 5,9
    8,0 -> 0,8
    9,4 -> 3,4
    2,2 -> 2,1
    7,0 -> 7,4
    6,4 -> 2,0
    0,9 -> 2,9
    3,4 -> 1,4
    0,0 -> 8,8
    5,5 -> 8,2
    `;
  
    const toReadableCoordinates = (coordinates) => {
      const [x,y] =  coordinates.toString().split(',');
      return [parseInt(x), parseInt(y)];
    }
    const toAxisObject = (x,y) => {
      return { x: x, y: y };
    }
    const toArray = (size = 0, input = '') => Array.from(input.repeat(size));
    const getPoint = (point) => point === '.' ? 0 : point;
    const getAscii = (point) => point === '.' ? '░' : point > 1 ? '█' : '▓';
    const incrementPoint = (point) => {
        const num = getPoint(point);
        return num + 1;
    }

    const normalized = input
        .split('\n')
        .map(row => row.trim())
        .filter(row => row.includes('->'))
        .map(row => {
          const [a, b] = row.split(' -> ');
          const [xA, yA] = toReadableCoordinates(a);
          const [xB, yB] = toReadableCoordinates(b);
          const yCoords = [yA, yB].sort((a,b) => a-b);
          const xCoords = [xA, xB].sort((a,b) => a-b);
          return {
            start: toAxisObject(xCoords[0], yCoords[0]),
            stop: toAxisObject(xCoords[1], yCoords[1]),
          }
        });
    const highestX = normalized
      .reduce((arr, next) => arr.concat(next.start.x, next.stop.x), [])
      .sort((a,b) => b-a)[0] + 1;
    const highestY = normalized
      .reduce((arr, next) => arr.concat(next.start.y, next.stop.y), [])
      .sort((a,b) => b-a)[0] + 1;
    const emptyLine = '.';
    const gridSize = { x: highestX, y: highestY };
    const emptyMatrix = toArray(gridSize.y, emptyLine)
        .map(() => toArray(gridSize.x, emptyLine));
    
    const getNewMatrix = (line, matrix) => {
        const { start, stop } = line;
        const isStraightLine = start.x === stop.x || start.y === stop.y;
        if (isStraightLine) {
            return matrix.map((row, y) => {
                if (y >= start.y && y <= stop.y) {
                    return row.map((point, x) => {
                        if (x >= start.x && x <= stop.x) {
                            return incrementPoint(point);
                        }
                        return point;
                    })
                }
                return row;
            });
        }
        return matrix;
    };

    const newMatrix = normalized.reduce((matrix, nextLine) => {
        const newMatrix = getNewMatrix(nextLine, matrix);
        return newMatrix;
    }, emptyMatrix);

    const count = newMatrix
        .reduce((rowA, rowB) => rowA.concat(rowB))
        .map(getPoint)
        .filter((point) => point > 1)
        .length

    const newMatrixReadable = newMatrix.map(row => row.map(getAscii).join(' ')).join('\n')

    //console.log(newMatrixReadable, count);
    console.log("%c" + newMatrixReadable, "font-size: 1px;line-height:1px");
    //document.querySelector('pre').innerHTML = newMatrixReadable
}