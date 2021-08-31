var { Extractor } = require('markdown-tables-to-json');
// const body= '## Mo Ta\r\n' +
//     'Ticket: abc.com\r\n' +
//     '\r\n' +
//     '## Metadata\r\n' +
//     '| Repo | Tag |\r\n' +
//     '| --- | ----------- |\r\n' +
//     '| Comon | 1.3.0 |\r\n' +
//     '| Polling | 1.5.0 |'

const body= '## Mo Ta\r\n' +
    'Ticket: abc.com\r\n' +
    '\r\n' +
    '## Metadata\r\n' +
    '| Repo | Tag |xxx |\r\n' +
    '| --- | ----------- |------- |\r\n' +
    '| Comon | 1.3.0 |x1 |\r\n' +
    '| Polling | 1.5.0 |x2 |'
// console.log(Extractor.extractObject(body, 'rows', false));
const extractObject = Extractor.extractObject(body, 'columns', true)
console.log(extractObject)
if (typeof extractObject === 'object') {
  for (const [key, value] of Object.entries(extractObject)) {
    for (const [key1, value1] of Object.entries(value)) {
      console.log(`${key}_${key1}`, value1);
    }
  }
}
