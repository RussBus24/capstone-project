$(document).ready(function(){
	$('#addWeapon').submit(function(event) {
		event.preventDefault();
		var addName = $('#name').val();
		var addCost = $('#cost').val();
		var addStrength = $('#strength').val();
		console.log(addName);
		sendQuery(addName);
	});
});

function sendQuery(addName, addCost, addStrength) {
	
	var queryData = {
		name: addName,
		cost: addCost,
		strength: addStrength
	};
	
	$.ajax({
		url: "https://russbus-workspace-russbus24.c9users.io/weapon",
		data: queryData,
		dataType: "jsonp",
		processData: false,
		type: "POST"
	});	
	
	.fail(function(jqXHR, error) {
		console.log(error);
	});
}