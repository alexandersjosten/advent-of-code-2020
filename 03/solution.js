const fs = require('fs');

const mapEnum = Object.freeze({ EMPTY: 0, TREE: 1 });

function parseLine(line) {
    let res = [];
    for (let i = 0; i < line.length; i++) {
        switch (line[i]) {
            case '.':
                res.push(mapEnum.EMPTY);
                break;

            case '#':
                res.push(mapEnum.TREE);
                break;

            default:
                throw `Got an unexpected character: ${line[i]}`;
        }
    }

    return res;
}

const mapMatrix = fs.readFileSync('./input', 'utf-8')
      .split('\n')
      .filter(Boolean)
      .map(line => parseLine(line));


function getTreesFromSlope(right, down) {
    let amountOfTrees = 0;
    let currentColumn = 0;

    for (let row = 0; row < mapMatrix.length; row += down) {
        if (mapMatrix[row][currentColumn] === mapEnum.TREE) {
            amountOfTrees++;
        }

        currentColumn = (currentColumn + right) % mapMatrix[row].length;
    }

    return amountOfTrees;
}

function part1(slope) {
    const allTrees = getTreesFromSlope(slope[0], slope[1]);
    console.log(`amount of trees are ${allTrees}`);
}

function part2(slopes) {
    // Kind-of like foldl in Haskell
    const reducer = (accumulator, [ right, down ]) => accumulator * getTreesFromSlope(right, down);
    const product = slopes.reduce(reducer, 1);
    console.log(`the product of all trees are ${product}`);
}


part1([3, 1]);
part2([[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]);
