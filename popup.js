var passwordProperty;
console.log("popup.js loaded");


function toggleFilter(){
	var toggleFilterchecked = document.getElementById('toggleFilter').checked;
	
	chrome.storage.sync.get(['password'],function(pass){
		chrome.storage.sync.get(['filterToggle'],function(toggle){
			passwordProperty = pass.password;
			if(passwordProperty ===  "null"){
				disable(document.getElementById('toggleFilter'));
				document.getElementById('toggleFilter').checked = false;
				var html = '<h4> Please Enter New Password </h4>';
				html+= '<input type="password" id="newPass" placeholder="New Password"/>';
				html+= '<input type="password" id="confirmPass" placeholder="Confirm Password"/>';
				html+= '<div id="loginStatus"></div>';
				html+= '<br>';
				html+= '<button id="storageNewPass">Set Password</button>';
				document.getElementById('inputPassword').innerHTML = html;
				document.getElementById('storageNewPass').addEventListener('click',setPassword);
			}


			else if(toggleFilterchecked){
				chrome.storage.sync.set({filterToggle: toggleFilterchecked},function(){
					document.getElementById('toggle');
					console.log("Toggle state is "+toggleFilterchecked);
					chrome.tabs.reload();
				});
			}

			else if(passwordProperty != "null"){
				disable(document.getElementById('toggleFilter'));
				var html = '<h4> Please Enter Password </h4>';
				html+= '<input type="password" id="exPass"/>';
				html+= '<div id="loginStatus"></div>';
				html+= '<br>';
				html+= '<button id="storageExPass">Enter Password</button>'
				document.getElementById('inputPassword').innerHTML = html;
				document.getElementById('storageExPass').addEventListener('click',checkPassword);
				document.getElementById('toggleFilter').checked = false;
			}

			else{
				chrome.storage.sync.set({filterToggle: toggleFilterchecked},function(){
					// document.getElementById('toggleFilter');
					console.log("Toggle state is "+toggleFilterchecked);
					chrome.tabs.reload();
				});
			}
	    });
	});
}
	
function checkToggle(){
	console.log("Function executed");
	chrome.storage.sync.get(['toggleFilter'],function(toggle){
		if(toggle.toggleFilter === true){
			console.log("Toggle state is "+toggle.toggleFilter);
			document.getElementById('toggleFilter').checked;
		}

		else{
			console.log("Toggle state is "+toggle.toggleFilter);
			document.getElementById('toggleFilter').checked = false;
		}
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

function checkToggle(){
	chrome.storage.sync.get(['filterToggle'],function(result){
		var toggle = result.filterToggle;
		if(toggle === true){
			 document.getElementById('toggleFilter').checked;
		}
		else{
			document.getElementById('toggleFilter');
		}
	});
}

function setPassword(){
	var newPass = document.getElementById('newPass').value;
	var confirmPass = document.getElementById('confirmPass').value;
	document.getElementById('toggleFilter').checked;
	if(newPass === confirmPass){
		chrome.storage.sync.set({password:newPass},function(){
			enable(document.getElementById('toggleFilter'));
			document.getElementById('inputPassword').innerHTML = '<div id="inputPassword"></div>';
			document.getElementById('toggleFilter').checked;
			toggleFilter();
			console.log("New Password:"+newPass);
		});
	}
	else{
		document.getElementById('loginStatus').innerHTML = '<p> Passwords do not match</p>';
	}
}

function checkPassword(){
	var enterPassword = document.getElementById('exPass').value;
	console.log(enterPassword);
	console.log(passwordProperty);
	if(enterPassword === passwordProperty){
		enable(document.getElementById('toggleFilter'));
		document.getElementById('inputPassword').innerHTML = '<div id="inputPassword"></div>';
		document.getElementById('toggleFilter').checked;
		chrome.storage.sync.set({filterToggle: true},function(){
				// document.getElementById('toggleFilter').checked;
				console.log("Toggle state is true")		;
				chrome.tabs.reload();
				document.getElementById('toggleFilter').checked;
		});
	}
	else{
		var html = '<h2> Incorrect Password </h2>';
		document.getElementById('loginStatus').innerHTML = html;
	}
}
checkToggle();
// document.getElementById('storageNewPass').addEventListener('click',setPassword);
document.getElementById('toggleFilter').addEventListener('change',toggleFilter);
document.getElementById('options').addEventListener('click', function() {chrome.runtime.openOptionsPage(); });