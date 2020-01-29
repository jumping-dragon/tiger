
/*
 * Editor client script for DB table products
 * Created by http://editor.datatables.net/generator
 */

(function($){

$(document).ready(function() {
	var editor = new $.fn.dataTable.Editor( {
		ajax: '/admin/api/products',
		table: '#latest-menu',
		fields: [
			{
				"label": "name:",
				"name": "name"
			},
			{
				"label": "restaurant_id:",
				"name": "restaurant_id"
			},
			{
				"label": "price:",
				"name": "price"
			},
			{
				"label": "description:",
				"name": "description"
			},
			{
				"label": "status:",
				"name": "status",
				"type": "checkbox",
				"separator": ",",
				"options": [
					""
				]
			},
			{
				"label": "tags:",
				"name": "tags"
			}
		]
	} );

	var table = $('#latest-menu').DataTable( {
		dom: 'Bfrtip',
		ajax: '/admin/api/products',
		columns: [
			{
				"data": "name"
			},
			{
				"data": "restaurant_id"
			},
			{
				"data": "price"
			},
			{
				"data": "description"
			},
			{
				"data": "status"
			},
			{
				"data": "tags"
			}
		],
		select: true,
		lengthChange: false,
		buttons: [
			{ extend: 'create', editor: editor },
			{ extend: 'edit',   editor: editor },
			{ extend: 'remove', editor: editor }
		]
	} );
} );

}(jQuery));

