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