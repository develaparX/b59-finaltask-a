function sortArray(arr) {
  function bubbleSortRecursive(array, n) {
    if (n === 1) return array;

    // Lakukan satu iterasi bubble sort
    for (let i = 0; i < n - 1; i++) {
      if (array[i] > array[i + 1]) {
        let temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
      }
    }

    return bubbleSortRecursive(array, n - 1);
  }

  let sortedArray = [...arr];
  sortedArray = bubbleSortRecursive(sortedArray, sortedArray.length);

  let oddNumbers = sortedArray.filter((num) => num % 2 !== 0);
  let evenNumbers = sortedArray.filter((num) => num % 2 === 0);

  console.log("Array:", sortedArray);
  console.log("Ganjil:", oddNumbers);
  console.log("Genap:", evenNumbers);

  return {
    array: sortedArray,
    ganjil: oddNumbers,
    genap: evenNumbers,
  };
}

sortArray([2, 24, 32, 22, 31, 100, 56, 21, 99, 7, 5, 37, 97, 25, 13, 11]);
