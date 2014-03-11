var GRIDSIZE = 5;

Cells = new Meteor.Collection('cells');
Rows = new Meteor.Collection('rows');

if (Meteor.isClient) {
Template.test_input.events = {
    'click input.add': function () {
	   var x = document.getElementById("x").value;
	   var y = document.getElementById("y").value;
	   var colour = 'red';
	   Cells.insert({x: x, y: y});
	},	
	'click input.clearAll': function () {
		Cells.remove({});
	}
};

Template.cells.activeCells = function () {
	return Cells.find({}, {sort: {x : 1, y: 1}, skip : GRIDSIZE});
};

Template.cells.rows = function () {
	var randomArray = [];
	for (i = 0; i < GRIDSIZE; i++) {
		randomArray.push(Cells.find({},
		{sort: {x : 1, y: 1},
		skip : GRIDSIZE * i,
		limit : GRIDSIZE}))
	}
	return randomArray;
};

Template.row.rowCells = function () {
	return this;
};

Template.cells.events = {
    'click input.delete': function () {
    Cells.remove(this._id);
  }
};

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
	Cells.remove({});
	for (i = 0; i <GRIDSIZE; i++){
	for (j = 0; j <GRIDSIZE; j++){
	Cells.insert({x: i, y: j});
	}
	}
  });
}
