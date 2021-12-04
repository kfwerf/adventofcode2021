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