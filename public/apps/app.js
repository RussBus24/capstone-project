$(document).ready(function(){
	$('#addWeapon').submit(function(event) {
		event.preventDefault();
		var addName = $('#addWeaponName').val();
		var addCost = $('#addWeaponCost').val();
		var addStrength = $('#addWeaponStrength').val();
		console.log(addName);
		sendWeaponQuery(addName, addCost, addStrength);
		$('#addWeaponName').val('');
		$('#addWeaponCost').val('');
		$('#addWeaponStrength').val('');
	});
	$('#addFranchise').submit(function(event) {
		event.preventDefault();
		var addName = $('#addFranchiseName').val();
		var addPublisher = $('#addPublisherName').val();
		console.log(addName);
		sendFranchiseQuery(addName, addPublisher);
		$('#addFranchiseName').val('');
		$('#addPublisherName').val('');
	});
	$('#addCategory').submit(function(event) {
		event.preventDefault();
		var addName = $('#addCategoryName').val();
		var addDescription = $('addDescriptionName').val();
		console.log(addName);
		sendCategoryQuery(addName, addDescription);
		$('#addCategoryName').val('');
		$('#addDescriptionName').val('');
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

function sendCategoryQuery(addName, addDescription) {
	var queryData = {
		name: addName,
		description: addDescription
	};
	
	$.ajax({
		url: "https://vast-depths-38075.herokuapp.com/category",
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