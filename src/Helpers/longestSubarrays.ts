/** @format */

export function longestSubarrays(arrays: number[][]): number[][] {
  const points: { [key: string]: number[][] } = {};
  arrays.forEach((array) => {
    const [first, last] = [array[0], array[array.length - 1]];
    if (!points[first]) points[first] = [];
    if (!points[last]) points[last] = [];
    points[first].push(array);
    points[last].push(array);
  });
  const longest: number[][] = [];
  Object.keys(points).forEach((point) => {
    const longestArray = points[point].reduce((a, b) =>
      a.length > b.length ? a : b
    );
    if (!longest.some((arr) => arr === longestArray))
      longest.push(longestArray);
  });
  return longest;
}
