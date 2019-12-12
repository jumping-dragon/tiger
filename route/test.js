const fs = require('fs');

function ass(){
fs.readFile('./route/credentials.json', (err, content) => {console.log("ini content",content)});
}
ass();
module.exports.api = ass;
console.log(module.exports.api);
