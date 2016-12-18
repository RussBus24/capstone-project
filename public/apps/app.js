$(document).ready(function(){
	$('#addWeapon').submit(function(event) {
		event.preventDefault();
		var addName = $('#name').val();
		var addCost = $('#cost').val();
		var addStrength = $('#strength').val();
		console.log(addName);
		sendQuery(addName, addCost, addStrength);
	});
});

function sendQuery(addName, addCost, addStrength) {
	
	var queryData = {
		name: addName,
		cost: addCost,
		strength: addStrength
	};
	
	$.ajax({
		url: "https://vast-depths-38075.herokuapp.com/weapon",
		data: JSON.stringify(queryData),
		type: "POST",
		contentType: 'application/json'
	})	
	
	.done(function(data) {
		console.log(data);
	})
	
	.fail(function(jqXHR, error) {
		console.log(error);
	});
}