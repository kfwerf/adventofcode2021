{

  const input = `
    00100
    11110
    10110
    10111
    10101
    01111
    00111
    11100
    10000
    11001
    00010
    01010
  `;


  const normalized = input
    .split('\n')
    .map(str => str.trim().split('').map(num => parseInt(num)))
    .filter(arr => arr.length);

  const res = normalized[0].map((num, x) => normalized.map((row) => row[x]))
    .map((arr) => arr
      .map((num) => ({ [num]: 1 }))
      .reduce(({ 0: a0 = 0, 1: a1 = 0 } = a, { 0: b0 = 0, 1: b1 = 0 } = b) =>
          ({ [0]: a0 + b0, [1]: a1 + b1 })));

  const gamma = parseInt(a.map((obj) => obj[0] < obj[1] ? 1 : 0).join(''), 2)
  const epsilon = parseInt(a.map((obj) => obj[0] < obj[1] ? 0 : 1).join(''), 2)


  console.log(gamma * epsilon)
}

{

  const input = `
    00100
    11110
    10110
    10111
    10101
    01111
    00111
    11100
    10000
    11001
    00010
    01010
  `;


  const normalized = input
    .split('\n')
    .map(str => str.trim().split('').map(num => parseInt(num)))
    .filter(arr => arr.length);

  const res = normalized[0].map((num, x) => normalized.map((row) => row[x]));

  function counter (selection) {
    return selection
      .map((arr) => arr
        .map((num) => ({ [num]: 1 }))
        .reduce(({ 0: a0 = 0, 1: a1 = 0 } = a, { 0: b0 = 0, 1: b1 = 0 } = b) => ({ [0]: a0 + b0, [1]: a1 + b1 })));
  }

  function exhaustiveSearch (matrix, pos, isWinningFn) {
    if (pos >= matrix.length || matrix[0].length === 1) {
      return matrix;
    }
    const count = matrix[pos]
      .map((num) => ({ [num]: 1 }))
      .reduce(({ 0: a0 = 0, 1: a1 = 0 } = a, { 0: b0 = 0, 1: b1 = 0 } = b) => {
        return ({ [0]: a0 + b0, [1]: a1 + b1 })
      });
    const winningValue = isWinningFn(count)
    const newRow = matrix[pos].map(row => row === winningValue ? row : null);
    const newMatrix = matrix.map((col) => col.filter((row, i) => newRow[i] !== null));    
    return exhaustiveSearch(newMatrix, pos+1, isWinningFn);
  }


  const gamma = parseInt(res.map((obj) => obj[0] < obj[1] ? 1 : 0).join(''), 2)
  const epsilon = parseInt(res.map((obj) => obj[0] < obj[1] ? 0 : 1).join(''), 2)

  const oxygenGeneratorRating = exhaustiveSearch([...res], 0, (counter) => counter[1] >= counter[0] ? 1 : 0);
  console.log(oxygenGeneratorRating.join(''), parseInt(oxygenGeneratorRating.join(''), 2))
  
  const coSrubberRating = exhaustiveSearch(res, 0, (count) => count[0] <= count[1] ? 0 : 1);
  console.log(coSrubberRating.join(''), parseInt(coSrubberRating.join(''), 2))
  
  console.log(parseInt(oxygenGeneratorRating.join(''), 2) * parseInt(coSrubberRating.join(''), 2))

}