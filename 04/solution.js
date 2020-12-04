const fs = require('fs');

const elems = fs.readFileSync('./input', 'utf-8')
      .split('\n');

function getPassportInformation(passportElems) {
    let information = [];
    let currentPassport = {};
    for (let i = 0; i < passportElems.length; i++) {
        if (passportElems[i] === '') {
            information.push(currentPassport);
            currentPassport = {};
        } else {
            for (let elem of passportElems[i].split(' ')) {
                const [ key, value ] = elem.split(':');
                currentPassport[key] = value;
            }
        }
    }

    // Push the last created object...
    information.push(currentPassport);
    return information;
}


function validatePassport(passport) {
    const requiredKeys = [ 'ecl', 'pid', 'eyr', 'hcl', 'byr', 'iyr', 'hgt' ];
    const optionalKeys = [ 'cid' ];

    // ------ Added for part 2
    const validateRange = (value, min, max) => value >= min && value <= max;

    const validateYear = (year, min, max) => {
        const yearNumber = parseInt(year);
        return !Number.isNaN(yearNumber) && validateRange(yearNumber, min, max);
    }

    const validationObject = {
        'ecl': ecl => {
            const valid = [ 'amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth' ];
            return valid.includes(ecl);
        },
        'pid': pid => {
            if (pid.length !== 9) {
                return false;
            }

            for (let i = 0; i < pid.length; i++) {
                if (Number.isNaN(parseInt(pid[i]))) {
                    return false;
                }
            }

            return true;
        },
        'eyr': eyr => validateYear(eyr, 2020, 2030),
        'hcl': hcl => {
            const validRegExp = new RegExp("\#([a-f0-9]{6}$)");
            return validRegExp.test(hcl);
        },
        'byr': byr => validateYear(byr, 1920, 2002),
        'iyr': iyr => validateYear(iyr, 2010, 2020),
        'hgt': hgt => {
            const value = parseInt(hgt.slice(0, -2));
            if (Number.isNaN(value)) {
                return false;
            }

            const unit = hgt.slice(-2);
            switch(unit) {
            case 'cm':
                return validateRange(value, 150, 193);
            case 'in':
                return validateRange(value, 59, 76); 
            default:
                return false;
            }
        },
    };

    // ------ End added for part 2

    for (const key of optionalKeys) {
        delete passport[key];
    }

    // just to make sure to handle potential duplicates...
    const keySet = new Set(Object.keys(passport));

    if (keySet.size !== requiredKeys.length) {
        return false;
    }

    for (let key of keySet) {
        if (!requiredKeys.includes(key)) {
            return false;
        }

        // ------ Added for part 2
        if (!validationObject[key](passport[key])) {
            return false;
        }
    }

    return true;
}


const passports = getPassportInformation(elems);
const validPassports = passports.filter(passport => validatePassport(passport));
console.log(validPassports.length);
