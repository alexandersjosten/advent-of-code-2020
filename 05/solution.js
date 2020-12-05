const fs = require('fs');

// Some constants...
const dividerIndex = 7;
const start = 0;
const endRow = 127;
const endCol = 7;
const takeLowRow = "F";
const takeHighRow = "B";
const takeLowCol = "L";
const takeHighCol = "R";


const elems = fs.readFileSync('./input', 'utf-8')
      .split('\n')
      .filter(Boolean)
      .map(s => [ s.substring(0, dividerIndex), s.substring(dividerIndex) ]);


function performBinarySearch(array, low, high, takeLow, takeHigh) {
    const step = (character, low, high) => {
        let newLow = low;
        let newHigh = high;

        // This one keeps track of the midpoint.
        // If we keep the high side, we use (midpoint + 1) as the new low.
        let midpoint = Math.floor((low + high) / 2);

        if (character === takeLow) {
            newHigh = midpoint;
        } else if (character === takeHigh) {
            newLow = midpoint + 1;
        } else {
            throw `invalid character to step: ${character}`;
        }

        return [ newLow, newHigh ];
    }

    let currentLow = low;
    let currentHigh = high;
    for (let i = 0; i < array.length; i++) {
        const [ newLow, newHigh ] = step(array[i], currentLow, currentHigh);
        currentLow = newLow;
        currentHigh = newHigh;
    }

    // currentLow === currentHigh should hold...
    return currentHigh;
}

// Function to compute all seat ids sorted.
function getAllSeatIdsSorted() {
    const computeId = (row, column) => row * 8 + column;

    let ids = [];
    for (let [ rowInfo, colInfo ] of elems) {
        const row = performBinarySearch(rowInfo, start, endRow, takeLowRow, takeHighRow);
        const col = performBinarySearch(colInfo, start, endCol, takeLowCol, takeHighCol);
        ids.push(computeId(row, col));
    }

    // Sort so we have it in ascending order, and then return.
    return ids.sort((a, b) => a - b);
}

function part1() {
    const allIdsSorted = getAllSeatIdsSorted();
    // The last element is the highest seat id
    console.log(`highest seat id: ${allIdsSorted[allIdsSorted.length - 1]}`);
}


function part2() {
    const allSeatIds = getAllSeatIdsSorted();

    // As the seatIds are sorted, we know any valid match would be if the
    // difference between two adjacent seatIds are exactly 2 (if our seatId is
    // X, we have X-1 and X+1 in the list).
    // As the assignment says it's a full flight, we can finish as soon as we
    // found a match.
    let ourSeatId = -1;
    for (let i = 0; i < allSeatIds.length - 1; i++) {
        if (allSeatIds[i] === allSeatIds[i + 1] - 2) {
            ourSeatId = allSeatIds[i] + 1;
            break;
        }
    }

    console.log(`the found seat id is: ${ourSeatId}`);
}

part1();
part2();
