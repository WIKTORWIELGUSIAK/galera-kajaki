/** @format */
export function replaceElement<T extends { id: number }>(
  array: T[],
  newElement: T
): T[] {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === newElement.id) {
      array[i] = newElement;
      break;
    }
  }
  return array;
}
