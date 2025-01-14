function sortArray(arr) {
  function bubbleSort(array, n) {
    if (n === 1) return array;

    for (let i = 0; i < n - 1; i++) {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
      }
    }

    return bubbleSort(array, n - 1);
  }

  const sortedArray = bubbleSort([...arr], arr.length);

  const oddNumbers = sortedArray.filter((num) => num % 2 !== 0).join(" ");

  const evenNumbers = sortedArray.filter((num) => num % 2 === 0).join(" ");

  const sortedArrayString = sortedArray.join(" ");

  return {
    Array: sortedArrayString,
    Ganjil: oddNumbers,
    Genap: evenNumbers,
  };
}

const inputArray = [2, 7, 1, 9, 4];

const result = sortArray(inputArray);

console.log("Array:", result.Array);
console.log("Ganjil:", result.Ganjil);
console.log("Genap:", result.Genap);
