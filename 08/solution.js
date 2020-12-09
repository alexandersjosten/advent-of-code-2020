const fs = require('fs');

const input = fs.readFileSync('./input', 'utf-8')
      .split('\n')
      .filter(Boolean);

function parseInstructions() {
    let res = [];
    for (let line of input) {
        const [inst, nbr] = line.split(' ');
        res.push({ inst: inst, nbr: parseInt(nbr) });
    }

    return res;
}

function executeInstruction(instruction) {
    switch (instruction.inst) {
        case 'acc':
            return [ 1, instruction.nbr ];
        case 'jmp':
            return [ instruction.nbr, 0 ];
        case 'nop':
            return [ 1, 0 ];
        default:
            throw 'Unknown instruction...'
    }
}

const instructions = parseInstructions();

function part1() {
    let res = executeAll(instructions);
    console.log(`acc before loop: ${res.acc}`);
}

function executeAll(instructions) {
    let acc = 0;
    let visited = new Set();
    let pc = 0;

    while (pc < instructions.length) {
        if (visited.has(pc)) {
            return { result: false, acc: acc };
        }

        const instruction = instructions[pc];
        const [ pcAdd, accAdd ] = executeInstruction(instruction);
        visited.add(pc);

        pc += pcAdd;
        acc += accAdd;
    }

    return { result: true, acc: acc };
}

function tryInstructions(index, instructions) {
    const old = instructions[index];
    const newInsts = [
        { inst: 'jmp', nbr: old.nbr },
        { inst: 'nop', nbr: old.nbr }
    ];

    for (let inst of newInsts) {
        instructions[index] = inst;
        let res = executeAll(instructions);
        if (res.result) {
            return [ true, res.acc ];
        }
    }

    instructions[index] = old;
    return [ false, -1 ];
}

function part2() {
    for (let i = 0; i < instructions.length; i++) {
        let instruction = instructions[i];
        if (instruction.inst === 'acc') {
            continue;
        }

        let [ success, acc ] = tryInstructions(i, instructions);
        if (success) {
            console.log(`acc when terminated: ${acc}`);
            break;
        }
    }
}

part1();
part2();
