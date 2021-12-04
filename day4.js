{
    const input = `
    7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

    22 13 17 11  0
     8  2 23  4 24
    21  9 14 16  7
     6 10  3 18  5
     1 12 20 15 19
    
     3 15  0  2 22
     9 18 13 17  5
    19  8  7 25 23
    20 11 10 24  4
    14 21 16 12  6
    
    14 21 17 24  4
    10 16 15  9 19
    18  8 23 26 20
    22 11 13  6  5
     2  0 12  3  7
    `;

    const inputRows = input.split('\n');

    const randomOrder = inputRows[1].split(',').map(num => parseInt(num));

    const puzzles = inputRows
    .slice(2)
    .map(row => row.trim())
    .reduce((prev = [], next = '', idx, arr) => {

        if (next === '' && idx < arr.length-1) {
            prev.push([]);
        }
        if (next !== '') {
            const newRow = next.split(" ").map(num => parseInt(num)).filter(num => !Number.isNaN(num));
            prev[prev.length-1].push(newRow);
        }

        return prev;
    }, []);


    //const drawnNumber = randomOrder[0];
    //const puzzle = puzzles[0];

    const drawnNumbers = randomOrder.map((_, idx, arr) => arr.slice(0, idx)).filter(arr => !!arr.length)

    const allResults = drawnNumbers.map((range) => {
        return range.reduce((prevPuzzles, nextDrawnNumber) => {

            const newPuzzles = [...prevPuzzles.puzzles]
                .map(({ puzzle: oldPuzzle } = obj) => {
                    const newPuzzle = oldPuzzle.map((row) => row.map(col => col === nextDrawnNumber ? NaN : col));
                    const puzzleFlipped = newPuzzle[0].map((num, x) => newPuzzle.map((row) => row[x]));
                    const hasNullsAcross = (input) => !!input.filter((row) => row.filter((col) => Number.isNaN(col)).length === row.length).length;
                    const hasWon = hasNullsAcross(newPuzzle) || hasNullsAcross(puzzleFlipped);
                    return {
                        puzzle: newPuzzle,
                        flipped: puzzleFlipped,
                        hasWon,
                        score: hasWon && newPuzzle.reduce((a,b) => a.concat(b)).filter((num) => !Number.isNaN(num)).reduce((a,b) => a + b, 0) * nextDrawnNumber
                    };
                });
           

            return {
                puzzles: newPuzzles,
                range: [...prevPuzzles.range, nextDrawnNumber],
            }
    
        }, ({ puzzles: puzzles.map((puzzle) => ({ puzzle, hasWon: false })), range: [] }))
    });

    const first = allResults
        .filter(({ puzzles, range } = obj) => !!puzzles.filter((puzzle) => puzzle.hasWon).length)
        .map(({ puzzles, range } = obj) => puzzles.filter(puzzle => puzzle.score !== false).map(puzzle => puzzle.score))


    console.log(first[0])
    //const randomOrder = input
}