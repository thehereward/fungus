var GRIDSIZE = 5;

Cells = new Meteor.Collection('cells');
Rows = new Meteor.Collection('rows');

if (Meteor.isClient) {
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

Template.cell.events = {
  'click div.cell' : function () {
    var newType = (this.type == 'full') ? 'empty' : 'full';      	  
    Cells.update(this._id, {$set: {type: newType}});
  }
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
	Cells.insert({x: i, y: j, type: 'empty'});
	}
	}
  });
}
