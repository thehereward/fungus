Cells = new Meteor.Collection('cells');

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
	return Cells.find({});
};

Template.cells.events = {
    'click input.delete': function () {
    Cells.remove(this._id);
  }
};

  Template.hello.greeting = function () {
    return "Welcome to fungus.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
