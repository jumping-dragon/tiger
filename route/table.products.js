/*
* Controller for DB table products
* Created by http://editor.datatables.net/generator
*/
let db = require('./knex');
let router = require('express').Router();
let {
	Editor,
	Field,
	Validate,
	Format,
	Options
} = require("datatables.net-editor-server");

router.all('/api/products', async function(req, res) {
	// The following statement can be removed after the first run (i.e. the database
	// table has been created). It is a good idea to do this to help improve
	// performance.
	await db.raw( "CREATE TABLE IF NOT EXISTS `products` (\
	`product_id` int(10) NOT NULL auto_increment,\
	`name` varchar(255),\
	`restaurant_id` varchar(255),\
	`price` numeric(9,2),\
	`description` varchar(255),\
	`status` varchar(255),\
	`tags` varchar(255),\
	PRIMARY KEY( `product_id` )\
);" );

	let editor = new Editor(db, 'products','product_id').fields(
		new Field("name"),
		new Field("restaurant_id"),
		new Field("price"),
		new Field("description"),
		new Field("status"),
		new Field("tags"),
	);

	await editor.process(req.body);
	res.json(editor.data());
});

module.exports = router;
