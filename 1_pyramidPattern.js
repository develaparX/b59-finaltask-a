const isPrime = (n) => {
  if (n < 2) return false;
  for (let i = 2; i <= n / 2; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
};

const drawSikuSiku = (size) => {
  if (size <= 0 || size >= 10) {
    console.log("Input harus antara 1 dan 9");
    return;
  }

  let num = 2;

  for (let row = 1; row <= size; row++) {
    const line = [];
    while (line.length < row) {
      if (isPrime(num)) line.push(num);
      num++;
    }

    console.log(line.join(" "));
  }
};

drawSikuSiku(7);
