def parse_line(line, grouped = False):
    [ pwdrange, letter, password ] = line.split(' ')
    [ low, high ] = map(int, pwdrange.split('-'))
    letter = letter[:-1]
    if grouped:
        grouped_password = dict()
        for c in password:
            if c in grouped_password:
                grouped_password[c] += 1
            else:
                grouped_password[c] = 1

        return [ low, high, letter, grouped_password ]

    return [ low, high, letter, password ]

"""
Another potential solution in part1 and part2, instead of grouping on a
condition in parse_line, would be to always just have the password as is and use
a regular expression such as: ^([^letter]*letter[^letter]*){low, high}$
"""

def part1():
    with open('input') as input_file:
        ok_passwords = 0
        for line in input_file.readlines():
            line = line[:-1]
            [ low, high, letter, grouped_password ] = parse_line(line, True)
            if letter not in grouped_password:
                continue

            occurrences = grouped_password[letter]
            if occurrences >= low and occurrences <= high:
                ok_passwords += 1

        print(ok_passwords)


def part2():
    with open('input') as input_file:
        ok_passwords = 0
        for line in input_file.readlines():
            line = line[:-1]
            [ low, high, letter, password ] = parse_line(line)
            if letter not in password:
                continue

            # The indices are off-by-one, so we should subtract 1
            if (password[low - 1] == letter) ^ (password[high - 1] == letter):
                ok_passwords += 1                

        print(ok_passwords)

part1()
part2()
