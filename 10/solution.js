const fs = require('fs');

const input = fs.readFileSync('./input', 'utf-8')
      .split('\n')
      .filter(Boolean)
      .map(s => Number(s));


function mkPowerArray(arr) {
    // Push the starting 0 (the charging outlet near the seat)...
    arr.push(0);
    // Sort...
    arr.sort((a, b) => a - b);

    // Calculate and push the built-in adapter
    const builtInDiff = 3;
    const builtIn = arr[arr.length - 1] + builtInDiff;
    arr.push(builtIn);

    return arr;
}

function part1(input) {
    const countObj = {};
    for (let i = 1; i < input.length; i++) {
        const diff = input[i] - input[i - 1];
        if (countObj[diff] === undefined) {
            countObj[diff] = 0;
        }

        countObj[diff]++;
    }

    console.log(`The number of 1-jolt differences multiplied by the number of 3-jolt differences: ${countObj[1] * countObj[3]}`);
}


function mkDiffArray(arr) {
    let diffArr = [];

    for (let i = 0; i < arr.length - 1; i++) {
        diffArr.push(arr[i + 1] - arr[i]);
    }

    return diffArr;
}

function part2(input) {
    // We will use a diffArray, where diffArr[i] = input[i + 1] - input[i]
    const diffArr = mkDiffArray(input);
    let amountOfSolutions = 1;

    /*
     * In the diffArray, we have the following:
     *   If we have 2 ones in a row, there are two potential solutions (the last
     *   one must be in the solution, as there is a three-diff after).
     *
     *   If we have 3 ones in a row, there are 4 potential solutions (the last
     *   one must be in).
     *
     *   If we have 4 ones in a row, there are 7 potential solutions.
     *
     * There are no two-diffs in the input, and never more than 4 ones in a row.
     */
    let currentOnes = 0;
    for (let i = 0; i < diffArr.length; i++) {
        if (diffArr[i] === 1) {
            currentOnes++;
        } else if (diffArr[i] === 3) {
            if (currentOnes === 2) {
                amountOfSolutions *= 2;
            } else if (currentOnes === 3) {
                amountOfSolutions *= 4;
            } else if (currentOnes === 4) {
                amountOfSolutions *= 7;
            }

            currentOnes = 0;
        }
    }

    console.log(`amount of solutions: ${amountOfSolutions}`);
}

const powerArray = mkPowerArray([...input]);
part1(powerArray);
part2(powerArray);
