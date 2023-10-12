const regexV1 = /^(?<indent>\s*)(?<name>\S+)(: (?<value>.*))?$/;

export interface IParsedLineV1 {
  isMatch: boolean;
  isCapital: boolean;
  indentSize: number;
  name: string;
  value: string;
}

export function parseLineV1(line: string): IParsedLineV1 {
  const match = line.match(regexV1);
  const isMatch = !!match;

  const { indent, name, value } = match?.groups || {};

  let isCapital = false;
  if (isMatch) {
    const firstLetter = name.charAt(0);
    isCapital = firstLetter === firstLetter.toUpperCase();
  }

  return {
    isMatch,
    isCapital,
    indentSize: indent?.length || 0,
    name,
    value: value?.trim(),
  };
}

// const str = `
// E-List

//   Employee
//     id: 45287
//     name: Kamron
//     surname: Cummerata

//     Department
//       id: 53694
//       name: Kids

//     Salary

//       Statement
//         id: 26519
//         amount: 5350.00
//         date: Thu Jan 28 2021

//       Statement
//         id: 67616
//         amount: 5564.00
//         date: Sun Feb 28 2021

//       Statement
//         id: 99989
//         amount: 5564.00
//         date: Sun Mar 28 2021
// `;

// str.split(/\r?\n/).forEach((line) => {
//   console.log(line);
//   console.log(line.match(regexV1)?.groups);
//   console.log('---');
// });
