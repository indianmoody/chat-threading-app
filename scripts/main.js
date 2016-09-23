function loggingin() {
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
		var user = result.user;
		
		var userPhoto = user.photoUrl;
		var userName = user.displayName;
		
		var elements = document.getElementById("div2");
		 var para = document.createElement("input");
		 para.setAttribute("id","guys");
        para.setAttribute("type","text");
        para.setAttribute("value",userName);
        elements.appendChild(para);
	});
}

function loggingout() {
	firebase.auth().signOut().then(function() {
		document.getElementById("guys").setAttribute("value","Bye!");
  // Sign-out successful.
}, function(error) {
  // An error happened.
});
}

function checking() {
	var customer = firebase.auth().currentUser;
	var elements = document.getElementById("div3");
	var t = document.createTextNode(customer.displayName);
	elements.appendChild(t);
	
	firebase.database().ref('tempss/temp1/temp3').set({
		name: customer.displayName,
		profile_pic: customer.photoURL
	});
	
	var idss = customer.uid;
	console.log("user id: " + idss);
	
	var disp;
	
	firebase.database().ref('tempss/temp1/temp2/name').on("value", function(snapshot){
		disp = snapshot.val();
		
		console.log(disp);
	});
	
	
	
	
	
}

function picking() {
	console.log("finally!!!");
	var tries = document.getElementById("profpic");
	var file = tries.files[0];
	
  firebase.storage().ref('extras').put(file).then(function(snapshot) {
  console.log('Uploaded a blob or file!');
});
	
}
/*
function angs() {
	document.getElementById("try-ang").value = "Its working!";
}
*/