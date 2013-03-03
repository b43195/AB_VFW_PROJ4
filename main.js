// Andisheh Bassiri
// VFW Project 3
// 1302


//Get ID
var fname = document.getElementById("fname"),
	lname = document.getElementById("lname"),
	company = document.getElementById("company"),
	pnum = document.getElementById("pnum"),
	email = document.getElementById("email"),
	addy = document.getElementById("addy"),
	bday = document.getElementById("bday"),
	soa = document.getElementById("soa"),
	soanum = document.getElementById("soanum"),
	quotes = document.getElementById("quotes"),
	cat = document.getElementById("cat"),
	notes = document.getElementById("notes"),
	clearData = document.getElementById("cleardata"),
	displayData = document.getElementById("displayData"),
	rock = document.getElementById("rock"),
	paper = document.getElementById("paper"),
	scissor = document.getElementById("scissor"),
	box1,
	box2,
	box3,
	errors = document.getElementById("errors"),
	mopeeps = document.getElementById("mopeeps"),

	addPeep = document.getElementById("addPeep");


//Functions
var gid = function(id){
	var element = document.getElementById(id);
	return element;
}

var say = function(input){
	console.log(input)
}

var hasBlurred = function(keyName,elmID){
	localStorage.setItem(keyName,elmID.value);
	elmID.removeAttribute("class", "focus");
}

var hasFocus = function(elmID){
	elmID.setAttribute("class", "focus");
}

var clearLocal = function(){
	localStorage.clear();
	document.location.reload(true);
	alert("All data cleared.")

}

var getCheckBoxVal = function(){
	var inputs = document.getElementsByTagName("input");
	var checkBoxes = [inputs[7], inputs[8], inputs[9]]
	if(checkBoxes[0].checked){
		box1 = checkBoxes[0].value;
	}else{
		box1  = "no";
	}
	if(checkBoxes[1].checked){
		box2 = checkBoxes[1].value;
	}else{
		box2  = "no";
	}
	if(checkBoxes[2].checked){
		box3 = checkBoxes[2].value;
	}else{
		box3  = "no";
	}
}

var getData = function(){
	var fnameVal = localStorage.getItem("First Name");
	var lnameVal = localStorage.getItem("Last Name");
	var companyVal = localStorage.getItem("Company");
	var pnumVal = localStorage.getItem("Phone Number");
	var emailVal = localStorage.getItem("E-Mail");
	var addyVal = localStorage.getItem("Address");
	fname.value = fnameVal;
	lname.value = lnameVal;
	company.value = companyVal;
	pnum.value = pnumVal;
	email.value = emailVal;
	addy.value = addyVal;
}

var getRadio = function(){
	var radio  = document.getElementsByTagName("input");
	var radio1 = radio[10];
	var radio2 = radio[11];
	if(radio1.checked){
		return radio1.value;
	}else{
		return radio2.value;
	}
}

var changeCats = function(){
	catOps = ["----","Friend", "Co-Worker","Family"];
	for(i=0; i<4; i++){
		var catName = catOps[i];
		var catChoices = document.createElement("option");
		catChoices.setAttribute("value", catOps[i]);
		cat.appendChild(catChoices);
		catChoices.innerHTML = catName;
		
	}
	
}

var saveData = function(key){
	if(!key){
		var keyID = Math.floor(Math.random()*19876);
	}else{
		keyID = key;
	}
	var donorVal = getRadio();
	getCheckBoxVal();

	var data = {};
		data.fname = ["First Name: ", fname.value];
		data.lname = ["Last Name: ", lname.value];
		data.company = ["Company: ", company.value];
		data.pnum = ["Phone Number: ", pnum.value];
		data.email = ["E-Mail: ", email.value];
		data.addy = ["Address: ", addy.value];
		data.bday = ["Birthday: ", bday.value];
		data.rock = ["Rock: ", box1];
		data.paper = ["Paper: ", box2];
		data.scissor = ["Scissor: ", box3];
		data.donor = ["Organ Donor: ", donorVal];
		data.soa = ["Awesomeness: ", soa.value];
		data.cat = ["Category: ", cat.value];
		data.quotes = ["Best Quotes: ", quotes.value];
		data.notes = ["Notes: ", notes.value]

	localStorage.setItem(keyID, JSON.stringify(data));
	fname.value = "";
	lname.value = "";
	company.value = "";
	pnum.value = "";
	email.value = "";
	addy.value = "";
	bday.value = "";
	quotes.value = "";
	notes.value = "";
	scroll(0,0);
	alert("Peep Saved!");
}


var showData = function(){
	if(localStorage.length === 0){
		var noPeepAddPeep = confirm("There are no Peeps in storage, add Default Peeps?");
		if(noPeepAddPeep){
			addDefaultPeeps();
		}else{
			window.location.reload(true);
		}
	}
	var div = document.getElementsByTagName("div");	
	div[0].setAttribute("class","remove");
	var addDiv = document.createElement("div");
	addDiv.setAttribute("id","items");
	var addList = document.createElement("ul");
	addDiv.appendChild(addList);
	document.body.appendChild(addDiv);
	
	
	for(i=0; i < localStorage.length; i++){
		var addLi = document.createElement("li");
		addList.appendChild(addLi);

		var editDeleteLks = document.createElement("li");

		var storeKey = localStorage.key(i);
		var value = localStorage.getItem(storeKey);
		var peepItem = JSON.parse(value);

		var addSubUl = document.createElement("ul");
		addLi.appendChild(addSubUl);

		getCatImage(peepItem.cat[1],addSubUl);

		for(var n in peepItem){
			var addSubLi = document.createElement("li");
			addSubUl.appendChild(addSubLi);
			var peepData = peepItem[n][0]+" "+peepItem[n][1];
			addSubLi.innerHTML = peepData;
			addSubUl.appendChild(editDeleteLks);
		}
		createEditDeleteLks(storeKey,addSubUl);
	}
}
//adds edit and delete links for each item in localstorage
var createEditDeleteLks = function(storeKey,editDeleteLks){
	var editLink = document.createElement("a");
	editLink.href = "#";
	editLink.key = storeKey;
	var editLinkText = "Edit Peep";
	editLink.addEventListener("click", editItem);
	editLink.innerHTML = editLinkText;
	editDeleteLks.appendChild(editLink);

	var breakTag = document.createElement("br");
	editDeleteLks.appendChild(breakTag);

	var deleteLink = document.createElement("a");
	deleteLink.href = "#";
	deleteLink.key = storeKey;
	var deleteLinkText = "Delete Peep";
	deleteLink.addEventListener("click", deleteItem);
	deleteLink.innerHTML = deleteLinkText;
	editDeleteLks.appendChild(deleteLink);
}

var editItem = function(){
	var itemValue = localStorage.getItem(this.key);
	var data = JSON.parse(itemValue);
	say(data);

	//Show form again
	var div = document.getElementsByTagName("div");	
	div[0].removeAttribute("class","remove");
	//repopulate form
	fname.value = data.fname[1];
	lname.value = data.lname[1];
	company.value = data.company[1];
	pnum.value = data.pnum[1];
	email.value = data.email[1];
	addy.value = data.addy[1];
	bday.value = data.bday[1];
	rock.value = data.rock[1];
	paper.value = data.paper[1];
	scissor.value = data.scissor[1];
	var radio  = document.getElementsByTagName("input");
	var radio1 = radio[10];
	var radio2 = radio[11];
		if(radio1.value == "Yes" && data.donor[1] == "Yes"){
			radio1.setAttribute("checked","checked")
		}else if(radio2 == "Yes" && data.donor[1] == "Yes"){
			radio1.setAttribute("checked","checked")
		}
	if(data.rock[1] == "Yes"){
		rock.setAttribute("Checked, Checked");
	}
	if(data.paper[1] == "Yes"){
		paper.setAttribute("Checked, Checked");
	}
	if(data.scissor[1] == "Yes"){
		scissor.setAttribute("Checked, Checked");
	}

	soa.value = data.soa[1];
	cat.value = data.cat[1];
	quotes.value = data.quotes[1];
	notes.value = data.notes[1];

	addPeep.removeEventListener("Click", saveData);
	addPeep.value = "Edit Contact";
	var editPeep = addPeep;
	editPeep.addEventListener("click", validator);
	editPeep.key = this.key;


}

var validator = function(eventData){
	var valFname = gid("fname"),
		valLname = gid("lname"),
		valPnum = gid("pnum"),
		valEmail = gid("email"),
		valCat = gid("cat");


	errors.innerHTML = "";
	/*valFname.style.border = 1px solid red;
	valLname.style.border = 1px solid red;
	valCat.style.border = 1px solid red;
	valEmail.style.border = 1ox solid red;*/

	var errorMsgs = [];

	if(valFname.value === ""){
		var fnameError = "Fill in first name";
		//valFname.style.border = 1px solid red;
		errorMsgs.push(fnameError);
	}
	if(valLname === ""){
		var lnameError = "Fill in last name";
		//valLname.style.border = 1px solid red;
		errorMsgs.push(lnameError);
		say("fname error")
	}
	if(valCat === "----"){
		var catError = "Pick a Category";
		//valCat.style.border = 1px solid red;
		errorMsgs.push(catError);
	}
	var emReEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(!emReEx.exec(valEmail.value)){
		var emailError = "Enter a valid E-mail";
		//valEmail.style.border = 1px solid red;
		errorMsgs.push(emailError);
	}
	if(errorMsgs.length >= 1){
		for(i = 0; i < errorMsgs.length; i++){
			var text = document.createElement("li");
			text.innerHTML = errorMsgs[i];
			errors.appendChild(text);
		}
		eventData.preventDefault();
		say(errorMsgs);
		return false;
	}else{
		saveData(this.key);
	}

}


var deleteItem = function(){
	var deleteComf = confirm("Are you sure you want to delete this Peep?")
		if(deleteComf){
			localStorage.removeItem(this.key);
			window.location.reload(true);
		}else{
			alert("Peep Not Deleted")
		}
}

var refresh = function(){
	window.location.reload(true);
}

var addDefaultPeeps = function(){
	for(var n in json){
		var keyID = Math.floor(Math.random()*19876);
		localStorage.setItem(keyID, JSON.stringify(json[n]));
	}
}

var getCatImage = function(peepCat,addSubUl){
	var catImageLi = document.createElement("li");
	addSubUl.appendChild(catImageLi);
	var catImage = document.createElement("img");
	var imageSrc = catImage.setAttribute("src","images/" + peepCat +".png");
	catImageLi.appendChild(catImage);
}



// Script
getData();

changeCats();

// NOT WORKING addPeep.addEventListener("click", validator);
addPeep.addEventListener("click", validator);

displayData.addEventListener("click", showData);

clearData.addEventListener("click", clearLocal);

mopeeps.addEventListener("click", refresh);



/*
fname.addEventListener("focus", function(){hasFocus(fname)});
fname.addEventListener("blur", function(){hasBlurred("First Name",fname)});

lname.addEventListener("focus", function(){hasFocus(lname)});
lname.addEventListener("blur", function(){hasBlurred("Last Name",lname)});

company.addEventListener("focus", function(){hasFocus(company)});
company.addEventListener("blur", function(){hasBlurred("Company",company)});

pnum.addEventListener("focus", function(){hasFocus(pnum)});
pnum.addEventListener("blur", function(){hasBlurred("Phone Number",pnum)});

email.addEventListener("focus", function(){hasFocus(email)});
email.addEventListener("blur", function(){hasBlurred("E-Mail",email)});

addy.addEventListener("focus", function(){hasFocus(addy)});
addy.addEventListener("blur", function(){hasBlurred("Address",addy)});

bday.addEventListener("focus", function(){hasFocus(bday)});
bday.addEventListener("blur", function(){hasBlurred("Birthday",bday)});
*/