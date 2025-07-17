const container1 = document.getElementById("container1");
const container2 = document.getElementById("container2");

const generateNumbers = () => {

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

// Test
const numbers = [64, 34, 25, 12, 22, 11, 90];
container1.innerText = `${mergeSort(numbers)}`;