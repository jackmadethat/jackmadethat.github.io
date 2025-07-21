const container1 = document.getElementById("container1");
const container2 = document.getElementById("container2");

const numberSet = [];

const generateNumbers = () => {
  num = document.getElementById("enter_num").value;

  for (let i = num; i > 0; i--) {
    numberSet.push(Math.floor(Math.random() * 100) + 1);
  }
  container1.innerHTML = "";
  container2.innerHTML = "";
  container1.innerHTML = `${numberSet}`;
}

const sortNumbers = () => {
  if (numberSet.length === 0) {
    container1.innerHTML = "Generate some numbers first!";
  } else {
    container2.innerHTML = `${mergeSort(numberSet)}`;
  }
}

// Call this to sort array
const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

// Merge helper func
const merge = (left, right) => {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}