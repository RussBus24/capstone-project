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
		var addDescription = $('#addDescriptionName').val();
		console.log(addName);
		sendCategoryQuery(addName, addDescription);
		$('#addCategoryName').val('');
		$('#addDescriptionName').val('');
	});
	$('#addTotalWeapon').submit(function(event) {
		event.preventDefault();
		var addWeapon = $('#addTotalWeaponName').val();
		var addFranchise = $('#addTotalWeaponFranchise').val();
		var addCategory = $('#addTotalWeaponCategory').val();
		console.log(addWeapon, addFranchise, addCategory);
		sendTotalWeaponQuery(addWeapon, addFranchise, addCategory);
	});
	$('#test').submit(function(event) {
		event.preventDefault();
		testQuery();
	});
	loadData();
});

function loadData() {
	$.ajax({
		url: "https://vast-depths-38075.herokuapp.com/weapon",
		type: "GET",
		contentType: 'application/json'
	})
	.done(function(data) {
		data.forEach(function(weapon) {
			var option = $('<option>', {value:weapon._id, text:weapon.name});
			$('#addTotalWeaponName').append(option);
		});
	})
	
	.fail(function(jqXHR, error) {
		console.log(error);
	});
}


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
		describe: addDescription
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

function sendTotalWeaponQuery(addWeapon, addFranchise, addCategory) {
	var queryData = {
		weapon: addWeapon,
		franchise: addFranchise,
		category: addCategory
	};
	
	$.ajax({
		url: "https://vast-depths-38075.herokuapp.com/totalweapon",
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

function testQuery() {
	var url="https://russbus-workspace-russbus24.c9users.io/totalweapon";
	
	$.getJSON(url, function(data) {
		console.log(data);
	});
}