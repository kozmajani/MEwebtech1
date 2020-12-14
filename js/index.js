$(document).ready(function(){ 
	$("#mainDiv").show();
	$("#addCar").hide();
	$("#addManufacturer").hide();
	$("#modCar").hide();
	$("#modManufacturer").hide();
});

function homeMenu() {
	$("#mainDiv").fadeIn(800);
	$("#listManufacturers").fadeOut(700);
    $("#carList").fadeOut(700);
    $("#addCar").fadeOut(700);
    $("#addManufacturer").fadeOut(700);
    $("#modManufacturer").fadeOut(700);
    $("#modCar").fadeOut(700);
}

// Get the video
var video = document.getElementById("myVideo");

// Get the button
var btn = document.getElementById("myBtn");

// Pause and play the video, and change the button text
function startAndPause() {
  if (video.paused) {
    video.play();
    btn.innerHTML = "Pause";
  } else {
    video.pause();
    btn.innerHTML = "Play";
  }
}

function listCars() {
	$("#mainDiv").fadeOut(700);
	$("#listManufacturers").hide();
    $("#addCar").fadeOut(700);
    $("#addManufacturer").fadeOut(700);
    $("#modManufacturer").fadeOut(700);
    $("#modCar").fadeOut(700);
	$("#carList").fadeIn(800);
	
	$.getJSON(`https://webtechcars.herokuapp.com/api/cars`, function (data) {
        let table = $('<table id="listTableCar" border="2" style="background-color:white;" align="left"></table>');
        table.append('<tr><th>ID</th><th>Name</th><th>Consumption</th><th>Color</th><th>Manufacturer</th><th>Available</th><th>Year</th><th>Horsepower</th></tr>');
        $.each(data, function (key, value) {
			/*Behelyettesíti a megfelelő adatokat */
            let row = $('<tr></tr>');
            let idCell = $('<td class="tableEntity">' +value._id+ '</td>');
            let nameCell = $('<td class="tableEntity">' + value.name + '</td>');
            let consumptionCell = $('<td class="tableEntity">' + value.consumption +'</td>');
            let colorCell = $('<td class="tableEntity">' + value.color + '</td>');
            let manufacturerCell = $('<td class="tableEntity">' + value.manufacturer +' </td>');
            let availableCell = $('<td class="tableEntity">' + value.avaiable + '</td>');
            let yearCell = $('<td class="tableEntity">' + value.year + '</td>');
            let horsepowerCell = $('<td class="tableEntity">' + value.horsepower + '</td>');
            row.append(idCell);
            row.append(nameCell);
            row.append(consumptionCell);
            row.append(colorCell);
            row.append(manufacturerCell);
            row.append(availableCell);
            row.append(yearCell);
            row.append(horsepowerCell);
            table.append(row)
        });
        $('#carList').html(table);
    });
}

function listManufacturers() {
	$("#mainDiv").fadeOut(700);
    $("#carList").fadeOut(700);
    $("#addCar").fadeOut(700);
    $("#addManufacturer").fadeOut(700);
    $("#modManufacturer").fadeOut(700);
    $("#modCar").fadeOut(700);
    $("#listManufacturers").fadeIn(800);

    $.getJSON("https://webtechcars.herokuapp.com/api/manufacturers", function (data) {
        let table = $('<table id="listTableManufacturers" border="2" style="background-color:white;" align="left"></table>');
        table.append('<tr><th>ID</th><th>Name</th><th>Country</th><th>Founded</th></tr>');
        $.each(data, function (key, value) {
            let row = $('<tr></tr>');
            let idCell = $('<td>' + value._id + '</td>');
            let nameCell = $('<td>' + value.name + '</td>');
            let countryCell = $('<td>' + value.country + ' </td> ');
            let foundedCell = $('<td>' + value.founded + ' </td>');
            row.append(idCell);
            row.append(nameCell);
            row.append(countryCell);
            row.append(foundedCell);
            table.append(row)
        });
        $('#listManufacturers').html(table);
    });
}

function addCar() {
	$("#mainDiv").fadeOut(700);
    $("#listManufacturers").hide();
    $("#addManufacturer").hide();
    $("#modManufacturer").hide();
    $("#modCar").hide();
    $("#carList").fadeIn(800);
    $("#addCar").fadeIn(800);

    let dropdown = $('#dropdown');

    dropdown.empty();
    dropdown.append('<option  disabled>Select a manufacturer!</option>');
    dropdown.prop('selectedIndex', 0);
    const url = 'https://webtechcars.herokuapp.com/api/manufacturers';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            dropdown.append($('<option></option>').attr('value', entry.id).text(entry.name));
        })
    });
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

function deleteCar (id) {
    $.ajax({
        url: `https://webtechcars.herokuapp.com/api/cars/`+id,
        type: 'DELETE',
        contentType: "application/json",
        success: function () {
            listCars();
        },
        error: function () {
            alert("Error!");
        }
    });
}

/*A "Car" listából való törléshez betölti a teljes listát, egy "Delete" gombbal kiegészítve */
function deleCar() { 
	$("#mainDiv").fadeOut(700);
    $("#listManufacturers").hide();
    $("#addCar").hide();
    $("#addManufacturer").hide();
    $("#modManufacturer").hide();
    $("#modCar").hide();
	$("#carList").fadeIn(800);


    $.getJSON(`https://webtechcars.herokuapp.com/api/cars`, function (data) {
        let table = $('<table id="listTableCar" border="2" class="table2" style="background-color:white;"></table>');
        table.append('<tr><th class="tableEntity">Delete</th><th class="tableEntity">ID</th><th class="tableEntity">Name</th><th class="tableEntity">Consumption</th><th class="tableEntity">Color</th><th class="tableEntity">Manufacturer</th><th class="tableEntity">Available</th><th class="tableEntity">Year</th><th class="tableEntity">Horsepower</th></tr>');
        $.each(data, function (key, value) {
            let row = $('<tr></tr>');
            let delButton = $('<td class="tableEntity"><button onclick="deleteCar(\''+value._id+'\')">Delete</button></td>');
            let idCell = $('<td class="tableEntity">' +value._id+ '</td>');
            let nameCell = $('<td class="tableEntity">' + value.name + '</td>');
            let consumptionCell = $('<td class="tableEntity">' + value.consumption +'</td>');
            let colorCell = $('<td class="tableEntity">' + value.color + '</td>');
            let manufacturerCell = $('<td class="tableEntity">' + value.manufacturer +' </td>');
            let availableCell = $('<td class="tableEntity">' + value.avaiable + '</td>');
            let yearCell = $('<td class="tableEntity">' + value.year + '</td>');
            let horsepowerCell = $('<td class="tableEntity">' + value.horsepower + '</td>');
            row.append(delButton);
            row.append(idCell);
            row.append(nameCell);
            row.append(consumptionCell);
            row.append(colorCell);
            row.append(manufacturerCell);
            row.append(availableCell);
            row.append(yearCell);
            row.append(horsepowerCell);
            table.append(row)
        });
        $('#carList').html(table);
    });
}

function modCar() {
	$("#mainDiv").fadeOut(700);
    $("#listManufacturers").hide();
    $("#addCar").hide();
    $("#modManufacturer").hide();
    $("#addManufacturer").hide();
    $("#carList").fadeIn(800);
    $("#modCar").fadeIn(800);

}

function modifyCar(car){
    modCar()
    $('#modCarForm #modCarID').val(car._id)
    $('#modCarForm #modCarName').val(car.name)
    $('#modCarForm #modConsumption').val(car.consumption)
    $('#modCarForm #modColor').val(car.color)
    $('#modCarForm #modManufacturer').val(car.manufacturer)
    $('#modCarForm #modAvailable').val(car.avaiable)
    $('#modCarForm #modYear').val(car.year)
    $('#modCarForm #modHorsepower').val(car.horsepower)

    let dropdown = $('#moddropdown');
    let manuf = [];

    $('#moddropdown option').remove();
    dropdown.append('<option value="0" disabled>Choose Manufacturer</option>');

    const url = 'https://webtechcars.herokuapp.com/api/manufacturers';
    $.getJSON(url, function (data) {
        $.each(data, function (key, entry) {
            dropdown.append($('<option></option>').attr('value', entry.name).text(entry.name));
        })
        manuf = data;
    }).then(function (){
        dropdown.val(0);
        for (let i in manuf) {
            if (manuf[i].name === car.manufacturer) {
                dropdown.val(manuf[i].name);
            }
        }
    });
}

function szerkCar() {
	$("#mainDiv").fadeOut(700);
    $("#listManufacturers").hide();
    $("#addCar").hide();
    $("#addManufacturer").hide();
    $("#modManufacturer").hide();
    $("#modCar").hide();
	$("#carList").fadeIn(800);


    $.getJSON(`https://webtechcars.herokuapp.com/api/cars`, function (data) {
        let table = $('<table id="listTableCar" border="2" class="table2" style="background-color:white;"></table>');
        table.append('<tr><th class="tableEntity">Modify</th><th class="tableEntity">ID</th><th class="tableEntity">Name</th><th class="tableEntity">Consumption</th><th class="tableEntity">Color</th><th class="tableEntity">Manufacturer</th><th class="tableEntity">Available</th><th class="tableEntity">Year</th><th class="tableEntity">Horsepower</th></tr>');
        $.each(data, function (key, value) {
            let row = $('<tr></tr>');
            let modButton = $("<td class='tableEntity'><button onclick='modifyCar("+JSON.stringify(value)+")'>Modify</button></td>");
            let idCell = $('<td class="tableEntity">' +value._id+ '</td>');
            let nameCell = $('<td class="tableEntity">' + value.name + '</td>');
            let consumptionCell = $('<td class="tableEntity">' + value.consumption +'</td>');
            let colorCell = $('<td class="tableEntity">' + value.color + '</td>');
            let manufacturerCell = $('<td class="tableEntity">' + value.manufacturer +' </td>');
            let availableCell = $('<td class="tableEntity">' + value.avaiable + '</td>');
            let yearCell = $('<td class="tableEntity">' + value.year + '</td>');
            let horsepowerCell = $('<td class="tableEntity">' + value.horsepower + '</td>');
            row.append(modButton);
            row.append(idCell);
            row.append(nameCell);
            row.append(consumptionCell);
            row.append(colorCell);
            row.append(manufacturerCell);
            row.append(availableCell);
            row.append(yearCell);
            row.append(horsepowerCell);
            table.append(row)
        });
        $('#carList').html(table);
    });
}


function szerkManufacturer() {
	$("#mainDiv").fadeOut(700);
    $("#carList").hide();
    $("#addCar").hide();
    $("#addManufacturer").hide();
    $("#modManufacturer").hide();
    $("#modCar").hide();
	$("#listManufacturers").fadeIn(800);

    $.getJSON("https://webtechcars.herokuapp.com/api/manufacturers", function (data) {
        let table = $('<table id="listTableManufacturers" border="2" class="table2" style="background-color:white;"></table>');
        table.append('<tr><th class="tableEntity">Modify</th><th class="tableEntity">ID</th><th class="tableEntity">Name</th><th class="tableEntity">Country</th><th class="tableEntity">Founded</th></tr>');
        $.each(data, function (key, value) {
            let row = $('<tr></tr>');
            let modButton = $("<td class='tableEntity'><button onclick='modifyManufacturer("+JSON.stringify(value)+")'>Modify</button></td>");
            let idCell = $('<td class="tableEntity">' + value._id + '</td>');
            let nameCell = $('<td class="tableEntity">' + value.name + '</td>');
            let countryCell = $('<td class="tableEntity">' + value.country + ' </td> ');
            let foundedCell = $('<td class="tableEntity">' + value.founded + ' </td>');
            row.append(modButton);
            row.append(idCell);
            row.append(nameCell);
            row.append(countryCell);
            row.append(foundedCell);
            table.append(row)
        });
        $('#listManufacturers').html(table);
    });
}

/*A "Manufacturers" listából törléshez betölti az egész listát egy "Delete" gombbal kiegésztítve */
function deleManufacturer() {
	$("#mainDiv").fadeOut(700);
    $("#carList").hide();
    $("#addCar").hide();
    $("#addManufacturer").hide();
    $("#modManufacturer").hide();
    $("#modCar").hide();
	$("#listManufacturers").fadeIn(800);

    $.getJSON("https://webtechcars.herokuapp.com/api/manufacturers", function (data) {
        let table = $('<table id="listTableManufacturers" border="2" class="table2" style="background-color:white;"></table>');
        table.append('<tr><th class="tableEntity">Delete</th><th class="tableEntity">ID</th><th class="tableEntity">Name</th><th class="tableEntity">Country</th><th class="tableEntity">Founded</th></tr>');
        $.each(data, function (key, value) {
            let row = $('<tr></tr>');
            let delButton = $('<td class="tableEntity"><button onclick="deleteManufacturer(\''+value._id+'\')">Delete</button></td>');
            let idCell = $('<td class="tableEntity">' + value._id + '</td>');
            let nameCell = $('<td class="tableEntity">' + value.name + '</td>');
            let countryCell = $('<td class="tableEntity">' + value.country + ' </td> ');
            let foundedCell = $('<td class="tableEntity">' + value.founded + ' </td>');
            row.append(delButton);
            row.append(idCell);
            row.append(nameCell);
            row.append(countryCell);
            row.append(foundedCell);
            table.append(row)
        });
        $('#listManufacturers').html(table);
    });	
}

/*A "Manufacturers" listából egy elem törlése */
function deleteManufacturer (id) {
    $.ajax({
        url: `https://webtechcars.herokuapp.com/api/manufacturers/`+id,
        type: 'DELETE',
        contentType: "application/json",
        success: function () {
            listManufacturers();
        },
        error: function () {
            alert("Error!");
        }
    });

}

/*A "Manufacturers" lista elemének szerkesztéséhez betöltött felület és adatok*/
function modifyManufacturer(manuf){
    modManufacturer()
    $('#modManufacturerForm #modId').val(manuf._id)
    $('#modManufacturerForm #modName').val(manuf.name)
    $('#modManufacturerForm #modCountry').val(manuf.country)
    $('#modManufacturerForm #modFounded').val(manuf.founded)
}

/*A "Manufacturers" listához elem hozzáadásához szükséges felület betöltése */
function addManufacturer() {
	$("#mainDiv").fadeOut(700);
    $("#carList").hide();
    $("#addCar").hide();
    $("#modManufacturer").hide();
    $("#modCar").hide();
	$("#listManufacturers").fadeIn(800);
	$("#addManufacturer").fadeIn(800);
}

/*A "Manufacturers" lista egy elemének módosításához szükséges felület betöltése */
function modManufacturer() {
	$("#mainDiv").fadeOut(700);
    $("#carList").hide();
    $("#addCar").hide();
    $("#addManufacturer").hide();
    $("#modCar").hide();
	$("#listManufacturers").fadeIn(800);
	$("#modManufacturer").fadeIn(800);
}

$(function() {

	/*Elem hozzáadása a "Car" listához*/
    $('#addCarForm').on("submit", function (e) {
        e.preventDefault();
		
		/*Ellenőrzi, hogy minden adatok megadtak-e */
		if((($("#addCarName").val()) == "") || (($("#addConsumption").val()) == "") || (($("#addColor").val()) == "") || (($("#dropdown").val()) == "") || (($("#addAvailable").val()) == "")
		|| (($("#addYear").val()) == "") || (($("#addHorsepower").val()) == "")) {
			alert("Error! You forgot to give atleast one data!");
		} else {
			$.ajax({
				type: 'post',
				url: 'https://webtechcars.herokuapp.com/api/cars',
				data: JSON.stringify({
					name: $("#addCarName").val(),
					consumption: $("#addConsumption").val(),
					color: $("#addColor").val(),
					manufacturer: $("#dropdown").val(),
					avaiable: $("#addAvailable").val(),
					year: $("#addYear").val(),
					horsepower: $("#addHorsepower").val()

				}),
				contentType: "application/json",
				success: function () {
					listCars()
				},
				error: function () {
					alert("Error! Check the entered data!");
				}
			})
		}
    });

	/*Elem módosítása a "Car" listában */
    $('#modCarForm').on("submit", function (e) {
        e.preventDefault();
		
		/*Ellenőrzi, hogy minden adat meg lett-e adva */
		if((($("#modCarId").val()) == "") || (($("#modCarName").val()) == "") || (($("#modConsumption").val()) == "") || (($("#modColor").val()) == "") || (($("#moddropdown").val()) == "") || (($("#modAvailable").val()) == "")
		|| (($("#modYear").val()) == "") || (($("#modHorsepower").val()) == "")) {
			alert("Error! You forgot to give atleast one data!");
		} else {
			$.ajax({
				type: 'post',
				url: 'https://webtechcars.herokuapp.com/api/cars',
				data: JSON.stringify({
					id: $("#modCarID").val(),
					name: $("#modCarName").val(),
					consumption: $("#modConsumption").val(),
					color: $("#modColor").val(),
					manufacturer: $("#moddropdown").val(),
					avaiable: $("#modAvailable").val(),
					year: $("#modYear").val(),
					horsepower: $("#modHorsepower").val()

				}),
				contentType: "application/json",
				success: function () {
					/*Ha sikeres, akkor törli az előző verziót */
					deleteCar($("#modCarID").val())
					listCars()
				},
				error: function () {
					alert("Error! Check the entered data!");
				}
			})
		}
    });

	/*Elem hozzáadása a "Manufacturers" listához */
    $('#addManufacturerForm').on("submit", function (e) {
        e.preventDefault();
		
		/*Ellenőrzi, hogy minden adatot megadott-e a felhasználó */
		if((($("#addName").val()) == "") || (($("#addCountry").val()) == "") || (($("#addFounded").val()) == "")) {
			alert("Error! You forgot to give atleast one data!");
		} else {
			$.ajax({
				type: 'post',
				url: 'https://webtechcars.herokuapp.com/api/manufacturers',
				data: JSON.stringify({
					name: $("#addName").val(),
					country: $("#addCountry").val(),
					founded: $("#addFounded").val()
				}),
				contentType: "application/json",
				success: function () {
					listManufacturers()
				},
				error: function () {
					alert("Error! Check the entered data!");
				}
			})
		}
    });

	/*Egy elem módosítása a "Manufacturers" listában */
    $('#modManufacturerForm').on("submit", function (e) {
        e.preventDefault();
		
		/*Ellenőrzi, hogy minden adat meg lett-e adva */
		if((($("#modId").val()) == "") || (($("#modName").val()) == "") || (($("#modCountry").val()) == "") || (($("#modFounded").val()) == "")) {
			alert("Error! You forgot to give atleast one data!");
		} else {
			$.ajax({
				type: 'post',
				url: 'https://webtechcars.herokuapp.com/api/manufacturers',
				data: JSON.stringify({
					id: $("#modId").val(),
					name: $("#modName").val(),
					country: $("#modCountry").val(),
					founded: $("#modFounded").val()
				}),
				contentType: "application/json",
				success: function () {
					/*Ha sikeres, akkor törli a régebbi verziót */
					deleteManufacturer($("#modId").val())
					listManufacturers()
				},
				error: function () {
					alert("Error! Check the entered data!");
				}
			})
		}
    });
});