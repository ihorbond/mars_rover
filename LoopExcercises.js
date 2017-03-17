var previousDigit = 0;
var nextDigit = 1;
console.log("Loop excercise #1:");
while (nextDigit <= 30) {
 sum = previousDigit + nextDigit;
  console.log(sum);
  previousDigit = nextDigit;
  nextDigit = sum;
}
console.log("Loop excercise #2:");

foodArray = ["Borsch", "Varenyky", "Pelmeni", "Banana", "Omelette", "Nalisniki"];

for (var i = 0; i < foodArray.length; i++) {
   if (foodArray[i] % 2 === 0) {
    console.log(foodArray[i]);
  }
}
