const container = document.getElementById("container");

let x = 1;
let y = 0;
let z = 0;

const getNumI = () => {
  let num = document.getElementById("enter_num").value;
  x = 1;
  y = 0;
  z = 0;
  container.innerHTML = "Iteratively Generated: ";
  generateFibsIterative(num);
}

const getNumR = () => {
  let num = document.getElementById("enter_num").value;
  num++;
  x = 1;
  y = 0;
  z = 0;
  container.innerHTML = "Recursively Generated: ";
  generateFibsRecursive(num);
}

const generateFibsIterative = (num) => {
  for (let i = num; i > 0; i--) {
    container.insertAdjacentHTML("beforeend", `${x + y} `);
    z = x + y;
    x = y;
    y = z;
  }
}

const generateFibsRecursive = (num) => {
  if (num == 1) {
    return 1;
  }

  container.insertAdjacentHTML("beforeend", `${x + y} `);
  z = x + y;
  x = y;
  y = z;

  return generateFibsRecursive(num - 1);
}