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
  const counted = res.map(countRow);

  function countRow(arr) {
    return arr
      .map((num) => ({ [num]: 1 }))
      .reduce(({ 0: a0 = 0, 1: a1 = 0 } = a, { 0: b0 = 0, 1: b1 = 0 } = b) => 
        ({ [0]: a0 + b0, [1]: a1 + b1 }))
  }

  function exhaustiveSearch (matrix, isWinningFn = getMoreAmount, pos = 0) {
    if (pos >= matrix.length || matrix[0].length === 1) {
      return matrix;
    }
    const count = countRow(matrix[pos]);
    const winningValue = isWinningFn(count)
    const newRow = matrix[pos].map(row => row === winningValue ? row : null);
    const newMatrix = matrix.map((col) => col.filter((_, i) => newRow[i] !== null));    
    return exhaustiveSearch(newMatrix, isWinningFn, pos+1);
  }

  function getMoreAmount(count) {
    return count[1] >= count[0] ? 1 : 0;
  }

  function getFewerAmount(count) {
    return count[0] <= count[1] ? 0 : 1;
  }

  const gamma = parseInt(counted.map(getMoreAmount).join(''), 2);
  const epsilon = parseInt(counted.map(getFewerAmount).join(''), 2);

  console.log(gamma, epsilon);

  const oxygenGeneratorRating = exhaustiveSearch(res);
  console.log(oxygenGeneratorRating.join(''), parseInt(oxygenGeneratorRating.join(''), 2))
  
  const coSrubberRating = exhaustiveSearch(res, getFewerAmount);
  console.log(coSrubberRating.join(''), parseInt(coSrubberRating.join(''), 2))
  
  console.log(parseInt(oxygenGeneratorRating.join(''), 2) * parseInt(coSrubberRating.join(''), 2))

}