const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts');

const port = 8089
const path =  __dirname +'/public/';

const bodyParser = require('body-parser');
const uuid = require('uuid/v4')
const session = require('express-session');


const {
    Editor,
    Field,
    Validate,
    Format,
    Options
} = require('datatables.net-editor-server');

console.log(Editor);
console.log(Field);
console.log(Validate);
console.log(Format);


app.listen(port, () => {
	console.log(`Server started on port : ${port}!`);
});
