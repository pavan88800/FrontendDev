{
  /* <form id="parent">
  <input class="in" name="foo.bat" type="text" value="1" />
  <input class="in" name="pavan.bar.baz" type="text" value="2" />
  <input class="in" type="text" name="foo.bar.twenty" value="20" />
  <input class="in" name="fizz" type="text" value="100" />
</form>; */
}

function solution() {
  const inputs = document.querySelectorAll("input");
  let result = {};
  inputs.forEach((el) => {
    const { name, value } = el;
    let temp = result;
    const path = name.split(".");
    path.forEach((el, index) => {
      const key = el;
      if (!temp[key]) {
        temp[key] = {};
      }
      if (path.length - 1 === index) {
        temp[key] = value;
      }
      temp = temp[key];
    });
  });
  return result;
}

console.log(solution());
