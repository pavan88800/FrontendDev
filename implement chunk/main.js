// Solution 1
function chunk(items, size) {
  // your code here
  if (size < 1) {
    return [];
  }
  const result = [];
  let i = 0;

  while (i < items.length) {
    result.push(items.slice(i, i + size));
    i = i + size;
  }
  return result;
}

//Solution 2
function chunk(items, size) {
  // your code here
  if (size < 1) {
    return [];
  }
  const result = [];

  for (let i = 0; i < items.length; i += size) {
    result.push(items.slice(i, i + size));
  }
  return result;
}
