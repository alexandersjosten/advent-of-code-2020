const fs = require('fs');

const input = fs.readFileSync('./input', 'utf-8')
      .split('\n')
      .filter(Boolean)
      .map(s => Number(s));

function isSumOfPrevious(prevVals, value) {
    let complements = new Set();
    for (let prevVal of prevVals) {
        if (complements.has(prevVal)) {
            return true;
        }

        complements.add(value - prevVal);
    }

    return false;
}


function getIndexOfError(previousAmount) {
    for (let i = previousAmount; i < input.length; i++) {
        const prevArr = input.slice(i - previousAmount, i);
        if (!isSumOfPrevious(prevArr, input[i])) {
            return i;
        }
    }
}

function part1() {
    const previousAmount = 25;

    const errorIndex = getIndexOfError(previousAmount);
    console.log(`the value ${input[errorIndex]} is not a sum of the previous ${previousAmount} values`);
}

function getValuesSummingTo(sum, values) {
    let front = 0;
    let end = 1;

    let currentSum = values[front] + values[end];
    while (front !== end && end < values.length) {
        if (currentSum === sum) {
            return values.slice(front, end + 1);
        } else if (currentSum < sum) {
            // We increase end with one as long as the sum is smaller...
            end++;
            currentSum += values[end];
        } else {
            // We increase front with one and subtract the corresponding value
            // from the sum as long as the sum is too large...
            currentSum -= values[front];
            front++;
        }
    }

    return undefined
}

function getEncryptionWeakness(values) {
    values.sort((a, b) => a - b);
    return values[0] + values[values.length - 1];
}

function part2() {
    const previousAmount = 25;

    const errorIndex = getIndexOfError(previousAmount);
    const errorValue = input[errorIndex];

    // May not be needed, but just in case we will remove the value that is not
    // a sum of previous numbers
    const filteredInput = input.filter((elem, index) => index !== errorIndex);

    const errorSumValues = getValuesSummingTo(errorValue, filteredInput);
    if (errorSumValues !== undefined) {
        const encryptionWeakness = getEncryptionWeakness(errorSumValues);
        console.log(`the encryption weakness is: ${encryptionWeakness}`);
    }
}

part1();
part2();
