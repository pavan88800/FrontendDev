// This is a JavaScript coding problem from BFE.dev

/**
 * @param {Array<any>} list
 * @returns {void}
 */
function moveZeros(list) {
  // your code here
  let pointer = 0;
  for (let i = 0; i < list.length; i++) {
    if (list[i] !== 0) {
      list[pointer] = list[i];
      pointer++;
    }
  }
  for (let i = pointer; i < list.length; i++) {
    list[i] = 0;
  }
  return list;
}
