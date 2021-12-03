{

  const input = `
    forward 5
    down 5
    forward 8
    up 3
    down 8
    forward 2
  `;


  const normalized = input
  .split('\n')
  .map(str => str.trim().split(' '))
  .filter(arr => arr.length === 2)
  .map(([direction, amount]) => [
    direction === 'forward' ? 'x' : 'y',
    (direction === 'up' ? -1 : 1) * parseInt(amount),
  ])
  .map(([axis, amount]) => ({ [axis]: amount }))
  .reduce(({x: aX = 0, y: aY = 0 } = a, { x: bX = 0, y: bY = 0 } = b) =>
      ({ x: aX + bX, y: aY + bY, }));

  const { x, y } = normalized;

  console.log(x * y);
}