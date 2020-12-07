const fs = require('fs');

const input = fs.readFileSync('./input', 'utf-8')
      .split('\n')
      .filter(Boolean);

const bags = parseBags();

function parseBags() {
    let bagMap = {};
    for (let line of input) {
        let lineInfo = line.match(/(.*) bags contain (.*)/);
        const name = lineInfo[1];
        const contains = lineInfo[2];

        let containElems = {};
        contains.split(',')
              .map(elem => {
                  const bag = elem.match(/(\d+) (.*) bag\.*/);
                  if (bag !== null) {
                      containElems[bag[2]] = parseInt(bag[1]);
                  }
              });

        bagMap[name] = containElems;
    }

    return bagMap;
}

function lookForBag(bag, startBag) {
    const bagsInStartBag = Object.keys(bags[startBag]);
    if (bagsInStartBag.includes(bag)) {
        return true;
    } else {
        for (let recBag of bagsInStartBag) {
            if (lookForBag(bag, recBag)) {
                return true;
            }
        }
    }

    return false;
}

function part1() {
    let shiny = 0;
    for (let key of Object.keys(bags)) {
        if (lookForBag('shiny gold', key)) {
            shiny++;
        }
    }

    console.log(`amount of shiny bags: ${shiny}`);
}

function countBagsInBag(bag) {
    const bagsInBag = Object.keys(bags[bag]);
    let sum = 0;
    bagsInBag.forEach(elem => {
        sum += bags[bag][elem];
        sum += bags[bag][elem] * countBagsInBag(elem);
    });

    return sum;
}

function part2() {
    const shiny = countBagsInBag('shiny gold');
    console.log(`sum is: ${shiny}`);
}

part1();
part2();
