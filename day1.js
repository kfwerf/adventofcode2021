{
  const given = [
    199,
    200,
    208,
    210,
    200,
    207,
    240,
    269,
    260,
    263,
  ];

  const res = given
    .map((curr, idx, arr) => [arr[idx-1], curr])
    .filter(([prev, curr]) => prev && curr > prev);
}

{
  const given = [
    199,
    200,
    208,
    210,
    200,
    207,
    240,
    269,
    260,
    263,
  ];

  const res = given
    .map((curr, idx, arr) => [arr[idx-2], arr[idx-1], curr])
    .map(([first, second, third]) => first + second + third)
    .map((curr, idx, arr) => [arr[idx-1], curr])
    .filter(([prev, curr]) => prev && curr > prev);

  console.log(res, res.length);
}