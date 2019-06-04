/* exported rockPaperScissors */

/*
 * Write a function that generates every sequence of throws a single
 * player could play over a three-round game of rock-paper-scissors.
 *
 * Your output should look something like:
 *   [["rock", "rock", "rock"],
 *    ["rock", "rock", "paper"],
 *    ["rock", "rock", "scissors"],
 *    ["rock", "paper", "rock"],
 *    ...etc...
 *   ]
 *
 * After you finish it, change your function so that it return answers for any number of rounds.
 * Example:
 *   rockPaperScissors(4); // => [['rock', 'rock', 'rock', 'rock'], etc...]
 */

const rockPaperScissors = (n = 3) => {
 const rounds = n;
 let hands = [];

 const weapons = ["rock", "paper", "scissors"]

 function recursion(roundsLeft, combinations) {
  //base case
  if(roundsLeft === 0) {
    hands.push(combinations);
    return
  }
  
  //recursion
  weapons.forEach(weapon => {
    recursion(roundsLeft-1, combinations.concat(weapon))
  }) 
 }

 recursion(rounds, []);
 return hands;
};
