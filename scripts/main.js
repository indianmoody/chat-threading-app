// handling sign-in and sign-out
function loggingin() {
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider);
}

function loggingout() {
	firebase.auth().signOut();
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
	document.getElementById("sign-out").removeAttribute("hidden");
		document.getElementById("sign-in").setAttribute("hidden", "true");
		console.log("logged-in!");
  } else {
    // No user is signed in.
	document.getElementById("sign-in").removeAttribute("hidden");
		document.getElementById("sign-out").setAttribute("hidden", "true");
		console.log("logged-out!");
  }
});

function loadMessages() {
	
	console.log("loadMessages!");
	
	firebase.database().ref('temps').off();
	
	var setMessage = function(data) {
		console.log("setMessage!");
		var val = data.val();
		displayMessage(data.key, val.name);
    }
	
	firebase.database().ref('temps').limitToLast(12).on('child_added', setMessage);
	firebase.database().ref('temps').limitToLast(12).on('child_changed', setMessage);
}

function displayMessage(key, name) {
	console.log("diaplayMessage!");
	console.log(name);
	
}

function testing() {
	var customer = firebase.auth().currentUser;
	document.getElementById("chat-screen").innerHTML = customer.displayName;
	//var t = document.createTextNode(customer.displayName);
	//elements.appendChild(t);
}







/*

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

*/