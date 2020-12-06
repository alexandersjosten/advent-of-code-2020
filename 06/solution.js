const fs = require('fs');

const input = fs.readFileSync('./input', 'utf-8')
      .split('\n');

const data = parseInput(input);

function parseInput(input) {
    let dataArray = [];
    let currentGroup = {};
    let currentGroupIndex = 0;
    for (let line of input) {
        if (line === '') {
            dataArray.push(currentGroup);
            currentGroup = {};
            currentGroupIndex = 0;
        } else {
            currentGroup[currentGroupIndex] = line;
            currentGroupIndex++;
        }
    }

    dataArray.push(currentGroup);
    return dataArray;
}

function countUniqueYesForGroup(groupData) {
    let yesSet = new Set();
    for (let key of Object.keys(groupData)) {
        const answers = groupData[key];
        const eachQuestion = answers.split('');
        eachQuestion.forEach(elem => yesSet.add(elem));
    }

    return yesSet.size;
}

function part1() {
    const reducer = (accumulator, group) => accumulator + countUniqueYesForGroup(group);
    const sum = data.reduce(reducer, 0);

    console.log(`the sum of all counts are: ${sum}`);
}


function countAllYesForGroup(groupData) {
    let yes = {};
    const groupKeys = Object.keys(groupData);
    for (let key of groupKeys) {
        const answers = groupData[key];
        const eachQuestion = answers.split('');
        eachQuestion.forEach(elem => yes[elem] === undefined ? yes[elem] = 1 : yes[elem]++);
    }

    const totalMembers = groupKeys.length;
    const allYesKeys = Object.keys(yes)
          .filter(key => yes[key] === totalMembers);

    return allYesKeys.length;
}


function part2() {
    const reducer = (accumulator, group) => accumulator + countAllYesForGroup(group);
    const sum = data.reduce(reducer, 0);

    console.log(`the sum of all counts for answers where the entire group said yes are: ${sum}`);
}

part1();
part2();
