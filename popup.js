var passwordProperty;
console.log("popup.js loaded");

function toggleFilter(event){
	var toggleFilterchecked = document.getElementById('notification').checked;
	chrome.storage.sync.get(['password'],function(pass){
		chrome.storage.sync.get(['filterToggle'],function(toggle){
			passwordProperty = pass.password;
			if(passwordProperty ===  "null"){
				disable(document.getElementById('notification'));
				document.getElementById('notification').checked = false;
				var html = '<h4> Please Enter New Password </h4>';
				html+= '<input type="password" id="newPass" placeholder="New Password"/>';
				html+= '<input type="password" id="confirmPass" placeholder="Confirm Password"/>';
				html+= '<div id="loginStatus"></div>';
				html+= '<br>';
				html+= '<button id="storageNewPass">Set Password</button>';
				document.getElementById('inputPassword').innerHTML = html;
				document.getElementById('storageNewPass').addEventListener('click',setPassword);
			}

			else if(toggleFilterchecked === false){
				// chrome.storage.sync.set({filterToggle: toggleFilterchecked},function(){
					var html = '<h4> Please Enter Password </h4>';
					html+= '<input type="password" id="exPass"/>';
					html+= '<div id="loginStatus"></div>';
					html+= '<br>';
					html+= '<button id="offPass">Enter Password</button>';
					document.getElementById('inputPassword').innerHTML = html;
					document.getElementById('offPass').addEventListener('click',checkPassword);
					document.getElementById('notification').checked = true;
				// });
			}

			else if(passwordProperty != "null"){
				disable(document.getElementById('notification'));
				var html = '<h4> Please Enter Password </h4>';
				html+= '<input type="password" id="exPass"/>';
				html+= '<div id="loginStatus"></div>';
				html+= '<br>';
				html+= '<button id="storageExPass">Enter Password</button>';
				document.getElementById('inputPassword').innerHTML = html;
				document.getElementById('storageExPass').addEventListener('click',checkPassword);
				document.getElementById('notification').checked = false;
			}
		});
	});
}
	
function runTimer() {
	var switchState = document.getElementById("notification").checked;
    chrome.storage.sync.set({
        'value' : switchState
    }, function () {
        console.log("Switch Saved as " + switchState);
    });
	
}

function restoreOptions() {
    chrome.storage.sync.get({
        filterToggle: false
    }, function (items) {
        document.getElementById('notification').checked = items.filterToggle;
        console.log(items.filterToggle);
    });
}

function disable(element){
	element.disabled = true;
  	element.classList.add('disabled');
}

function enable(element){
	element.disabled = false;
	element.classList.remove('disabled');
}

function setPassword(){
	var newPass = document.getElementById('newPass').value;
	var confirmPass = document.getElementById('confirmPass').value;
	var toggle = document.getElementById('notification').checked;
	if(newPass === confirmPass){
		chrome.storage.sync.set({password:newPass},function(){
			chrome.storage.sync.set({toggleFilter: toggle},function(){
				enable(document.getElementById('notification'));
				console.log(toggle);
				document.getElementById('notification').checked = true;
				chrome.tabs.reload();
				var blankHTML = "";
				document.getElementById('inputPassword').innerHTML = blankHTML;
				console.log("New Password:"+newPass);
			});
		});
	}
	else{
		document.getElementById('loginStatus').innerHTML = '<p> Passwords do not match</p>';
	}
}

function checkPassword(){
	var enterPassword = document.getElementById('exPass').value;
	var checkToggle = document.getElementById('notification').checked;
	console.log(enterPassword);
	console.log(passwordProperty);
	if(enterPassword === passwordProperty){
		enable(document.getElementById('notification'));
		document.getElementById('inputPassword').innerHTML = '<div id="inputPassword"></div>';
		
		if(checkToggle === true){
			chrome.storage.sync.set({filterToggle: false},function(){
					console.log("Toggle state is true")		;
					chrome.tabs.reload();
					document.getElementById('notification').checked = false;
			});
		}

		else if(checkToggle === false){
			chrome.storage.sync.set({filterToggle: true}, function(){
				console.log("Toggle state is true");
				chrome.tabs.reload();
				document.getElementById('notification').checked = true;
			});
		}

	}
	else{
		var html = '<p> Incorrect Password <p>';
		document.getElementById('loginStatus').innerHTML = html;
	}
}

function optionPassword(event){
	var optionPass = document.getElementById('passOption').value;
	chrome.storage.sync.get(['password'],function(pass){
		if(optionPass === pass.password){
			chrome.runtime.openOptionsPage(); 
		}

		else{
			var html = "Incorrect Password";
			document.getElementById('optionNotif').innerHTML = html;
		}
	});
}

document.addEventListener('DOMContentLoaded', function () {
	restoreOptions();
    document.getElementById("notification").addEventListener('click', toggleFilter);
    console.log("DOM Loaded");
});

document.getElementById('options').addEventListener('click', function() {
	var html;
	chrome.storage.sync.get(['password'],function(pass){
		if(pass.password === "null"){
			html = '<h4> Click the toggle to set password</h4>';
			document.getElementById('optionsPassword').innerHTML = html;
		}

		else{
			html = '<h4> Please Enter Password </h4>';
			html+= '<input type="password" id="passOption"/>';
			html+= '<div id="loginStatus"></div>';
			html+= '<br>';
			html+= '<button id="optionPass">Enter Password</button>';
			html+= '<div id="optionNotif"></div>';
			document.getElementById('optionsPassword').innerHTML = html;
			document.getElementById('optionPass').addEventListener('click',optionPassword);
		}
	});
});