var previousDigit = 0;
var nextDigit = 1;
while (nextDigit <= 30) {
 sum = previousDigit + nextDigit;
  console.log(sum);
  previousDigit = nextDigit;
  nextDigit = sum;
}
