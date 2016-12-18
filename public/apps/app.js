$(document).ready(function(){
	$('#addWeapon').submit(function(event) {
		event.preventDefault();
		var addName = $('#addWeaponName').val();
		var addCost = $('#addWeaponCost').val();
		var addStrength = $('#strength').val();
		console.log(addName);
		sendWeaponQuery(addName, addCost, addStrength);
	});
	$('#addFranchise').submit(function(event) {
		event.preventDefault();
		var addName = $('#addFranchiseName').val();
		var addPublisher = $('#addPublisherName').val();
		console.log(addName);
		sendFranchiseQuery(addName, addPublisher);
	});
});

function sendWeaponQuery(addName, addCost, addStrength) {
	
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

function sendFranchiseQuery(addName, addPublisher) {
	
	var queryData = {
		name: addName,
		publisher: addPublisher
	};
	
	$.ajax({
		url: "https://vast-depths-38075.herokuapp.com/franchise",
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