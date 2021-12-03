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
  .map(([direction, amount]) => [direction, parseInt(amount)])
  .map(([direction, amount]) => [
    direction === 'forward' ? amount : 0,
    direction === 'up' || direction === 'down' ? (direction === 'up' ? -1 : 1) * amount : 0,
  ])
  .map(([x, y], idx, arr) => {
    const depth = arr.slice(0,idx)
      .filter(([x, y]) => y)
      .filter(() => x)
      .map(([_, amount]) => amount)
      .reduce((a, b) => a + b, 0)
    return [x, y, x * depth];
  });

  const [x, _, depth] = normalized
    .reduce(([aX, aY, aZ], [bX, bY, bZ]) => [aX + bX, aY + bY, aZ + bZ])

  console.log(x * depth);
}