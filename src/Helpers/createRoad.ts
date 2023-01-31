/** @format */

export function createRoad(points: number[][]): number[][] {
  type Point = [number, number];
  const roads: number[][] = [];
  const visited = new Set<number>();

  for (let i = 0; i < points.length; i++) {
    const start = points[i][0];
    if (visited.has(start)) continue;

    let road: number[][] = [points[i]];
    visited.add(start);

    for (let j = i + 1; j < points.length; j++) {
      if (points[j][0] === start) {
        road.push(points[j]);
        visited.add(points[j][1]);
      }
    }

    roads.push(...road);
  }

  return roads;
}
