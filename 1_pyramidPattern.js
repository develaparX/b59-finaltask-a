function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function generatePrimes(n) {
  const primes = [];
  let number = 2;
  while (primes.length < n) {
    if (isPrime(number)) {
      primes.push(number);
    }
    number++;
  }
  return primes;
}

function drawSikuSiku(size) {
  if (size <= 0 || size >= 10) {
    console.log("Alas/Tinggi harus antara 1 dan 9");
    return;
  }

  let totalPrimes = (size * (size + 1)) / 2;
  let primes = generatePrimes(totalPrimes);
  let index = 0;

  for (let i = 1; i <= size; i++) {
    let row = [];
    for (let j = 0; j < i; j++) {
      row.push(primes[index]);
      index++;
    }
    console.log(row.join(" "));
  }
}

drawSikuSiku(7);
