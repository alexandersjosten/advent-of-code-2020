const fs = require('fs');

const numbers = fs.readFileSync('./input', 'utf-8')
      .split('\n')
      .filter(Boolean)
      .map(s => Number(s));


// An function that, given a sum, will return the first two found numbers that
// together sums to the given sum.  It will do so by keeping track of the
// complement, so given `sum` is 2020 and number is the value X, it will create
// an entry [2020 - X => X] for quick lookup later.  If we then see the value
// 2020 - X, we have a solution.
// Should be O(n) in total.
function findTwoAddingUpTo(sum) {
    let mapping = {};
    for (let number of numbers) {
        if (mapping[number] !== undefined) {
            // We have found two values adding up to `sum`
            return { term1: number,
                     term2: mapping[number],
                     product: number * mapping[number]
                   };
        }

        mapping[sum - number] = number;
    }
}

function part1() {
    console.log(findTwoAddingUpTo(2020));
}

function part2() {
    // We first make a one-level mapping, where each number is mapped to what
    // remains to 2020. This can then be used similarly to as in part1.
    let mapping = {};
    for (let number of numbers) {
        mapping[2020 - number] = number;
    }

    for (let complement in mapping) {
        const twoMatching = findTwoAddingUpTo(complement);
        if (twoMatching !== undefined) {
            console.log(`found a match for ${twoMatching.term1}, ${twoMatching.term2}, and ${mapping[complement]}`);
            console.log(`product is: ${twoMatching.term1 * twoMatching.term2 * mapping[complement]}`);
            return;
        }
    }
}


part1();
part2();
