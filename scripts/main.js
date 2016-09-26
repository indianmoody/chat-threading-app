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
		
		// check if current user id is in userList. if not, add one
		var customer = firebase.auth().currentUser;
		
		firebase.database().ref('userlist').once("value", function(snapshot) {
			if(!snapshot.child(customer.uid).exists()) {
				firebase.database().ref('userlist/' + customer.uid).set ({
				name: customer.displayName,
				id: customer.uid
				});
			}
		});
		
		// load userlist in "friend-list", assign each user a button
		loadUsers();
		
	} 
  
	else {
		// No user is signed in.
		document.getElementById("sign-in").removeAttribute("hidden");
		document.getElementById("sign-out").setAttribute("hidden", "true");
		console.log("logged-out!");
	}
});

function loadUsers() {
	var setUser = function(data) {
		console.log("setUser!");
		var val = data.val();
		displayUser(data.key, val.name);
    }
	
	firebase.database().ref('userlist').limitToLast(20).on('child_added', setUser);
	firebase.database().ref('userlist').limitToLast(20).on('child_changed', setUser);
	
}

function displayUser(key, name) {
	console.log('key: ' + key);
	console.log('name: ' + name);
	
	var listform = document.getElementById("friend-list");
	var para4 = document.createElement("input");
    para4.setAttribute("id",key);
    para4.setAttribute("type","button");
    para4.setAttribute("value",name);
	para4.addEventListener('click', function() { loadTopicButtons(this.id) });
	listform.appendChild(para4);
	 var br = document.createElement('br');
     listform.appendChild(br);
        
}

function loadTopicButtons(iden) {
	
	document.getElementById("chat-screen").innerHTML = "";
	
	//create 'add topic' and input box in 'add-topic' division
	var newtopicform = document.getElementById("add-topic");
	newtopicform.innerHTML = "";
	
	var inputbox = document.createElement("input");
    inputbox.setAttribute("id","topicbox");
    inputbox.setAttribute("type","text");
	newtopicform.appendChild(inputbox);
	
	var newtopicbutton = document.createElement("input");
    newtopicbutton.setAttribute("id","newtopicbutton");
    newtopicbutton.setAttribute("type","button");
	newtopicbutton.setAttribute("value","add new topic");
	newtopicbutton.addEventListener('click', function() { appendTopic(iden) });
	newtopicform.appendChild(newtopicbutton);
	
	
	// for topic buttons in chat-buttons
	var topicform = document.getElementById("chat-buttons");
	topicform.innerHTML = "";
	
	var customer = firebase.auth().currentUser;
	// if there is no prior conversation, create 'basic' section
	firebase.database().ref('messages/' + customer.uid + '/' + iden).once("value", function(snapshot) {
			if(!snapshot.child("basic").exists()) {
				//in current user database
				firebase.database().ref('messages/' + customer.uid + '/' + iden + '/' + 'basic/asdasd').set ({
					chat: "please start conversation!"
				});
				
				//in friend's database
				firebase.database().ref('messages/' + iden + '/' + customer.uid + '/' + 'basic/asdasd').set ({
					chat: "please start conversation!"
				});
				
			}
		});
	
	
	
	
	var getMessage = function(data) {
		console.log("getMessage!");
		var val = data.val();
		//displayMessage(data.key, val.chat);
		
		// creating button and allocating attributes
		var tempChatButton = document.createElement("input");
		tempChatButton.setAttribute("id",data.key);
		tempChatButton.setAttribute("type","button");
		tempChatButton.setAttribute("value",data.key);
		tempChatButton.addEventListener('click', function() { loadMessages(iden, this.id) }); //display messages under this topic
		topicform.appendChild(tempChatButton);
    }
	
	firebase.database().ref('messages/' + customer.uid + '/' + iden).limitToLast(10).on('child_added', getMessage);
	firebase.database().ref('messages/' + customer.uid + '/' + iden).limitToLast(10).on('child_changed', getMessage);
	
}

function loadMessages(friendId, topicId) {
	
	document.getElementById("chat-screen").innerHTML = "";
	console.log("loadMessages!");
	var customer = firebase.auth().currentUser;
	
	//firebase.database().ref('temps').off();
	
	var setMessage = function(data) {
		console.log("setMessage!");
		var val = data.val();
		displayMessage(data.key, val.chat);
    }
	
	firebase.database().ref('messages/' + customer.uid + '/' + friendId + '/' + topicId).limitToLast(2).on('child_added', setMessage);
	firebase.database().ref('messages/' + customer.uid + '/' + friendId + '/' + topicId).limitToLast(2).on('child_changed', setMessage);
}

function displayMessage(key, chat) {
	console.log("displayMessage!");
	console.log(chat);
	
	var msgbox = document.getElementById("chat-screen");
	var t = document.createTextNode(chat);
	msgbox.appendChild(t);
	var br = document.createElement('br');
    msgbox.appendChild(br);
	
}

function appendTopic(friendId) {
	
	var customer = firebase.auth().currentUser;
	var newTopic = document.getElementById("topicbox").value;
	firebase.database().ref('messages/' + customer.uid + '/' + friendId + '/' + newTopic + '/asdasd').set ({
					chat: "please start conversation!"
				});
	
	firebase.database().ref('messages/' + friendId + '/' + customer.uid + '/' + newTopic + '/asdasd').set ({
					chat: "please start conversation!"
				});
	
	document.getElementById("topicbox").value = "";
	
}

function testing() {
	var customer = firebase.auth().currentUser;
	
	firebase.database().ref('tempss/temp1').once("value", function(snapshot) {
		if(snapshot.child('temp4').exists()) {
			firebase.database().ref('tempss/temp1/temp4').set ({
				name: "Karen Moody"
			});
		}
	});
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